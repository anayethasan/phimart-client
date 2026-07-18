import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";


const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await authApiClient.get("/orders/");
            setOrders(res.data.results ?? res.data);
        } catch (error) {
            console.log("error to fetching data", error);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOrders();
    }, [fetchOrders]);

    const cancelOrder = async (id) => {
        try {
            await authApiClient.post(`/orders/${id}/cancel/`);
            fetchOrders();
        } catch (error) {
            console.log("Error cancelling order", error);
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await authApiClient.patch(`/orders/${id}/update_status/`, { status });
            fetchOrders();
        } catch (error) {
            console.log("Error updating orders status", error);
        }
    };

    return { orders, loading, error, fetchOrders, cancelOrder, updateOrderStatus };
};

export default useOrders;