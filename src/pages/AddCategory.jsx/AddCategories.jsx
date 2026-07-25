import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authApiClient from "../../services/auth-api-client";

const AddCategories = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
 
    const [submitting, setSubmitting] = useState(false);
 
    const handleCategoryAdd = async (data) => {
        setSubmitting(true);
        try {
            await authApiClient.post("/categories/", data);
            alert("Category added successfully");
            reset();
            navigate("/categories");
        } catch (error) {
            console.log("Error adding category", error);
            alert("Failed to add category. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit(handleCategoryAdd)} className="space-y-4">
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
                    {errors.description && (
                        <p className="text-red-500 text-xs">{errors.description.message}</p>
                    )}
                </div>
 
                <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
                    {submitting ? "Adding category..." : "Add Category"}
                </button>
            </form>
        </div>
    );
};

export default AddCategories;