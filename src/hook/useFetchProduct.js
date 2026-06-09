import { useEffect, useState } from "react"
import apiclient from "../services/api_services";

const useFetchProduct = (currentPage, priceRange, selectedCategory, searchQuery, sortOrder) => {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchProducts = async () => {
        setLoading(true);
        const url = `/products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`;
        try {
            const res = await apiclient.get(url);
            const data = await res.data;
            setProduct(data.results)
            setTotalPages(Math.ceil(data.count / data.results.length));
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
        }; 
        fetchProducts();
    }, [currentPage, priceRange, selectedCategory, searchQuery, sortOrder]);

    return {products, loading, totalPages};
};

export default useFetchProduct;