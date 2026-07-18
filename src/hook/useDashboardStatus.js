import { useEffect, useState } from "react";
import apiClient from "../services/api_services";
import authApiClient from "../services/auth-api-client";

const useDashboardStats = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const [productsRes, ordersRes, usersRes] = await Promise.allSettled([
                    apiClient.get("/products/"),
                    authApiClient.get("/orders/"),
                    authApiClient.get("/auth/users/"),
                ]);

                setStats({
                    totalProducts:
                        productsRes.status === "fulfilled"
                            ? productsRes.value.data.count ?? productsRes.value.data.length
                            : 0,
                    totalOrders:
                        ordersRes.status === "fulfilled"
                            ? ordersRes.value.data.count ?? ordersRes.value.data.length
                            : 0,
                    totalUsers:
                        usersRes.status === "fulfilled"
                            ? usersRes.value.data.count ?? usersRes.value.data.length
                            : 0,
                });
            } catch (error) {
                console.log("Error fetching dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading };
};

export default useDashboardStats;