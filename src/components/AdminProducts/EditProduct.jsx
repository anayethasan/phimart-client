import { useEffect, useState } from "react";
import apiClient from "../../services/api_services";
import authApiClient from "../../services/auth-api-client";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";


const EditProduct = () => {

    const { productId } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
 
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]); 
    const [newFiles, setNewFiles] = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);
 
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deletingImageId, setDeletingImageId] = useState(null);
 
    // Fetch Categories
    useEffect(() => {
        apiClient.get("/categories/").then((res) => setCategories(res.data));
    }, []);
 
    // Fetch the existing product and pre-fill the form
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get(`/products/${productId}/`);
                reset({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    stock: res.data.stock,
                    category: res.data.category,
                });
                setImages(res.data.images || []);
            } catch (error) {
                console.log("Error fetching product", error);
                alert("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId, reset]);
 
    // Save product detail changes
    const handleUpdateDetails = async (data) => {
        setSaving(true);
        try {
            await authApiClient.patch(`/products/${productId}/`, data);
            alert("Product updated successfully");
        } catch (error) {
            console.log("Error updating product", error);
            alert("Failed to update product. Please try again.");
        } finally {
            setSaving(false);
        }
    };
 
    // Select new image files to upload
    const handleNewFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewFiles(files);
        setNewPreviews(files.map((file) => URL.createObjectURL(file)));
    };
 
    // Upload the newly selected images
    const handleUploadNewImages = async () => {
        if (!newFiles.length) return alert("Please select images.");
 
        setUploading(true);
        try {
            for (const file of newFiles) {
                const formData = new FormData();
                formData.append("image", file);
                await authApiClient.post(`/products/${productId}/images/`, formData);
            }
            const res = await apiClient.get(`/products/${productId}/`);
            setImages(res.data.images || []);
            setNewFiles([]);
            setNewPreviews([]);
            alert("Images uploaded successfully");
        } catch (error) {
            console.log("Error uploading images", error);
            alert("Failed to upload images. Please try again.");
        } finally {
            setUploading(false);
        }
    };
 
    // Delete an existing image
    const handleDeleteImage = async (imageId) => {
        const confirmed = window.confirm("Delete this image?");
        if (!confirmed) return;
 
        setDeletingImageId(imageId);
        try {
            await authApiClient.delete(`/products/${productId}/images/${imageId}/`);
            setImages((prev) => prev.filter((img) => img.id !== imageId));
        } catch (error) {
            console.log("Error deleting image", error);
            alert("Failed to delete image. Please try again.");
        } finally {
            setDeletingImageId(null);
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
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit(handleUpdateDetails)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Product Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Product Name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">This field is required</p>
                        )}
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-xs">This field is required</p>
                        )}
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="text"
                            {...register("price", {
                                required: "This Field is required",
                                validate: (value) =>
                                    !isNaN(parseFloat(value)) || "Please enter a valid number!",
                            })}
                            className="input input-bordered w-full"
                            placeholder="Price"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs">{errors.price.message}</p>
                        )}
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium">Stock Quantity</label>
                        <input
                            type="number"
                            {...register("stock", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Stock"
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-xs">This field is required</p>
                        )}
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-xs">This field is required</p>
                        )}
                    </div>
 
                    <button type="submit" className="btn btn-primary w-full" disabled={saving}>
                        {saving ? "Saving changes..." : "Save Changes"}
                    </button>
                </form>
            </div>
 
            <div className="divider"></div>
 
            <div>
                <h3 className="text-lg font-medium mb-2">Product Images</h3>
 
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                        {images.map((img) => (
                            <div key={img.id} className="relative w-20 h-20">
                                <img
                                    src={img.image}
                                    alt="Product"
                                    className="w-full h-full rounded-md object-cover"
                                />
                                <button
                                    onClick={() => handleDeleteImage(img.id)}
                                    disabled={deletingImageId === img.id}
                                    className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error text-white"
                                    title="Delete image"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
 
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleNewFilesChange}
                    disabled={uploading}
                />
 
                {newPreviews.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {newPreviews.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt="Preview"
                                className="w-16 h-16 rounded-md object-cover"
                            />
                        ))}
                    </div>
                )}
 
                <button
                    onClick={handleUploadNewImages}
                    className="btn btn-primary w-full mt-2"
                    disabled={uploading}
                >
                    {uploading ? "Uploading images..." : "Upload New Images"}
                </button>
            </div>
        </div>
    );
};

export default EditProduct;