import { useNavigate } from "react-router";

const AdminProductRow = ({ product, onDelete, isDeleting }) => {
    const navigate = useNavigate();
    const thumbnail = product.images?.[0]?.image;
    return (
        <div className="flex items-center gap-4 bg-base-200 rounded-lg px-4 py-3 shadow-sm">
            <div className="w-14 h-14 shrink-0 rounded-md overflow-hidden bg-base-300">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-base-content/50 text-center px-1">
                        No image
                    </div>
                )}
            </div>
 
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{product.name}</p>
                <p className="text-sm text-base-content/70">
                    ৳{product.price} &middot; Stock: {product.stock}
                </p>
            </div>
 
            <div className="flex gap-2 shrink-0">
                <button
                    onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                    className="btn btn-sm btn-success text-white"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="btn btn-sm btn-error text-white"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};

export default AdminProductRow;