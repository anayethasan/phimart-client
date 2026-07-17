import { useEffect, useState } from "react";
import OrderCard from "../../components/Orders/OrderCard";
import authApiClient from "../../services/auth-api-client";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchOrders = async () => {
            setLoading(true);

            try {
                const res = await authApiClient.get("/orders/");
                setOrders(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            const res = await authApiClient.post(`/orders/${orderId}/cancel/`);
            if(res.status === 200)
            {
                setOrders(prevOrder => prevOrder.map(order => order.id === orderId ? {...order, status: "Canceled"} : order));
            }
        } catch (error) {
            console.log(error);
        }
    };

    if(loading)
        return ( <div className="flex justify-center items-center py-10 min-h-screen">
                    <span className="loading loading-spinner loading-xl text-secondary scale-200"></span>
                </div>)
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">this is order page</h1>
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onCancel={handleCancelOrder} ></OrderCard>
            ))}
        </div>
    );
};

export default Orders;