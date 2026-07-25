
import { useEffect, useState } from 'react';
import authApiClient from './../../services/auth-api-client';
import apiClient from '../../services/api_services';
import useAuthContext from '../../hook/useAuthContext';
import CategoryRow from '../../components/Categories/CategoryRow';

const CategoryList = () => {

    const { user } = useAuthContext();
    const isAdmin = !!user?.is_staff;
 
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
 
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get("/categories/");
            setCategories(res.data);
        } catch (error) {
            console.log("Error fetching categories", error);
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCategories();
    }, []);
 
    const handleDelete = async (categoryId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category? This cannot be undone."
        );
        if (!confirmed) return;
 
        setDeletingId(categoryId);
        try {
            await authApiClient.delete(`/categories/${categoryId}/`);
            fetchCategories();
        } catch (error) {
            console.log("Error deleting category", error);
            alert("Failed to delete category. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
         <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>
 
            {loading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : categories.length === 0 ? (
                <p className="text-center text-base-content/70 py-8">No categories found.</p>
            ) : (
                <div className="space-y-3">
                    {categories.map((category) => (
                        <CategoryRow
                            key={category.id}
                            category={category}
                            isAdmin={isAdmin}
                            onDelete={() => handleDelete(category.id)}
                            isDeleting={deletingId === category.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;