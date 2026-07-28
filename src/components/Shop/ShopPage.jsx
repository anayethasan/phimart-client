import {  useEffect, useState } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import useFetchProduct from "../../hook/useFetchProduct";
import FilteringSection from "./FilteringSection";
import useFetchCategories from "../../hook/usefetchCategory";
import { useSearchParams } from "react-router";


const ShopPage = () => {
    
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        const categoryFromUrl = searchParams.get("category") || "";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedCategory(categoryFromUrl);
        setCurrentPage(1);
    }, [searchParams]);

    const {products, loading, totalPages} = useFetchProduct(
        currentPage,
        priceRange,
        selectedCategory,
        searchQuery,
        sortOrder
    );
    
    const categories = useFetchCategories();

    const handlePriceChange = (index, value) => {
        setPriceRange((prev) => {
            const newRange = [...prev];
            newRange[index] = value;
            return newRange;
        });
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl text-center font-bold mb-8">Shop Our Products</h1>
            <FilteringSection 
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                handleSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                handleSortOrder={setSortOrder}
            />
            <ProductList products={products} loading={loading} />
            <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                handlePageChange={setCurrentPage} 
            />
        </div>
    );
};

export default ShopPage;