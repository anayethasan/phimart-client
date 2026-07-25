import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hook/useAuthContext";
import { FaStar } from "react-icons/fa";
import apiClient from "../../services/api_services";


const ReviewList = () => {

    const { user } = useAuthContext();
    const isAdmin = !!user?.is_staff;
 
    const [reviews, setReviews] = useState([]);
    const [productNames, setProductNames] = useState({}); // { [productId]: name }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ ratings: 0, comment: "" });
    const [savingId, setSavingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
 
    const fetchAllProducts = async () => {
        const firstPage = await apiClient.get("/products/", { params: { page: 1 } });
        const results = [...firstPage.data.results];
        const pageSize = firstPage.data.results.length || 1;
        const totalPages = Math.ceil(firstPage.data.count / pageSize);
 
        if (totalPages > 1) {
            const remainingPageRequests = [];
            for (let page = 2; page <= totalPages; page++) {
                remainingPageRequests.push(
                    apiClient.get("/products/", { params: { page } })
                );
            }
            const remainingPages = await Promise.all(remainingPageRequests);
            remainingPages.forEach((res) => results.push(...res.data.results));
        }
 
        return results;
    };
 
    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const products = await fetchAllProducts();
 
            const nameMap = {};
            products.forEach((p) => {
                nameMap[p.id] = p.name;
            });
            setProductNames(nameMap);
 
            // fetch reviews for every product in parallel
            const reviewResponses = await Promise.all(
                products.map((p) =>
                    apiClient
                        .get(`/products/${p.id}/reviews/`)
                        .then((res) => res.data)
                        .catch(() => []) 
                )
            );
 
            let allReviews = reviewResponses.flat();
 
            if (!isAdmin) {
                allReviews = allReviews.filter((r) => r.user?.id === user?.id);
            }
 
            setReviews(allReviews);
        } catch (err) {
            console.log("Error fetching reviews", err);
            setError("Failed to load reviews.");
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    const startEdit = (review) => {
        setEditingId(review.id);
        setEditData({ ratings: review.ratings, comment: review.comment });
    };
 
    const cancelEdit = () => {
        setEditingId(null);
        setEditData({ ratings: 0, comment: "" });
    };
 
    const handleSaveEdit = async (review) => {
        setSavingId(review.id);
        try {
            await authApiClient.patch(
                `/products/${review.product}/reviews/${review.id}/`,
                editData
            );
            setReviews((prev) =>
                prev.map((r) => (r.id === review.id ? { ...r, ...editData } : r))
            );
            setEditingId(null);
        } catch (err) {
            console.log("Error updating review", err);
            alert("Failed to update review. Please try again.");
        } finally {
            setSavingId(null);
        }
    };
 
    const handleDelete = async (review) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;
 
        setDeletingId(review.id);
        try {
            await authApiClient.delete(`/products/${review.product}/reviews/${review.id}/`);
            setReviews((prev) => prev.filter((r) => r.id !== review.id));
        } catch (err) {
            console.log("Error deleting review", err);
            alert("Failed to delete review. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">
                {isAdmin ? "All Reviews" : "My Reviews"}
            </h1>
 
            {loading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : error ? (
                <p className="text-center text-error py-8">{error}</p>
            ) : reviews.length === 0 ? (
                <p className="text-center text-base-content/70 py-8">No reviews found.</p>
            ) : (
                <div className="space-y-3">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-base-200 rounded-lg px-4 py-3 shadow-sm"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-base-content/50 mb-1">
                                        {productNames[review.product] || `Product #${review.product}`}
                                    </p>
                                    <div className="flex text-yellow-400 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                size={14}
                                                className={
                                                    i < review.ratings
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />
                                        ))}
                                    </div>
 
                                    {editingId === review.id ? (
                                        <textarea
                                            value={editData.comment}
                                            onChange={(e) =>
                                                setEditData({ ...editData, comment: e.target.value })
                                            }
                                            className="textarea textarea-bordered w-full mt-1"
                                        />
                                    ) : (
                                        <p className="whitespace-pre-line">{review.comment}</p>
                                    )}
                                </div>
 
                                <div className="flex gap-2 shrink-0">
                                    {editingId === review.id ? (
                                        <>
                                            <button
                                                onClick={() => handleSaveEdit(review)}
                                                disabled={savingId === review.id}
                                                className="btn btn-sm btn-success text-white"
                                            >
                                                {savingId === review.id ? "Saving..." : "Save"}
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="btn btn-sm btn-ghost"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEdit(review)}
                                                className="btn btn-sm btn-success text-white"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review)}
                                                disabled={deletingId === review.id}
                                                className="btn btn-sm btn-error text-white"
                                            >
                                                {deletingId === review.id ? "Deleting..." : "Delete"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;