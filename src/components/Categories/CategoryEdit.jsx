import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../services/api_services";
import authApiClient from "../../services/auth-api-client";


const CategoryEdit = () => {

    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
 
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
 
    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get(`/categories/${categoryId}/`);
                reset({
                    name: res.data.name,
                    description: res.data.description,
                });
            } catch (error) {
                console.log("Error fetching category", error);
                alert("Failed to load category.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [categoryId, reset]);
 
    const handleUpdateCategory = async (data) => {
        setSaving(true);
        try {
            await authApiClient.patch(`/categories/${categoryId}/`, data);
            alert("Category updated successfully");
            navigate("/dashboard/categories");
        } catch (error) {
            console.log("Error updating category", error);
            alert("Failed to update category. Please try again.");
        } finally {
            setSaving(false);
        }
    };
 
    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
            <form onSubmit={handleSubmit(handleUpdateCategory)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Category Name</label>
                    <input
                        {...register("name", {
                            required: "This field is required",
                            maxLength: {
                                value: 200,
                                message: "Name can't be longer than 200 characters",
                            },
                        })}
                        className="input input-bordered w-full"
                        placeholder="Category Name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name.message}</p>
                    )}
                </div>
 
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        {...register("description")}
                        className="textarea textarea-bordered w-full"
                        placeholder="Description (optional)"
                    ></textarea>
                </div>
 
                <button type="submit" className="btn btn-primary w-full" disabled={saving}>
                    {saving ? "Saving changes..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default CategoryEdit;