import { useEffect, useState } from "react";
import apiClient from "../services/api_services";

const PAGE_SIZE = 10;
const useFetchAdminProduct = (currentPage) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
 
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get("/products/", {
                params: { page: currentPage },
            });
            setProducts(res.data.results);
            setTotalPages(Math.max(Math.ceil(res.data.count / PAGE_SIZE), 1));
        } catch (error) {
            console.log("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
 
    return { products, loading, totalPages, refetch: fetchProducts };
};

export default useFetchAdminProduct;