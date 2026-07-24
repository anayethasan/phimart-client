import { useState } from "react";
import Pagination from "../../components/Shop/Pagination";
import authApiClient from "../../services/auth-api-client";
import useFetchAdminProduct from "../../hook/useFetchAdminProduct";
import AdminProductRow from "../../components/AdminProducts/AdminProductRow";


const AdminProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, totalPages, refetch } = useFetchAdminProduct(currentPage);
    const [deletingId, setDeletingId] = useState(null);
 
    const handleDelete = async (productId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product? This cannot be undone."
        );
        if (!confirmed) return;
 
        setDeletingId(productId);
        try {
            await authApiClient.delete(`/products/${productId}/`);
            refetch();
        } catch (error) {
            console.log("Error deleting product", error);
            alert("Failed to delete product. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };
 
    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
 
            {loading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : products.length === 0 ? (
                <p className="text-center text-base-content/70 py-8">No products found.</p>
            ) : (
                <div className="space-y-3">
                    {products.map((product) => (
                        <AdminProductRow
                            key={product.id}
                            product={product}
                            onDelete={() => handleDelete(product.id)}
                            isDeleting={deletingId === product.id}
                        />
                    ))}
                </div>
            )}
 
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={setCurrentPage}
            />
        </div>
    );
};

export default AdminProductList;