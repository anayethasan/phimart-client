import { useNavigate } from "react-router";


const CategoryRow = ({ category, isAdmin, onDelete, isDeleting }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-4 bg-base-200 rounded-lg px-4 py-3 shadow-sm">
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{category.name}</p>
                {category.description && (
                    <p className="text-sm text-base-content/70 truncate">
                        {category.description}
                    </p>
                )}
                <p className="text-xs text-base-content/50 mt-1">
                    {category.product_count} {category.product_count === 1 ? "product" : "products"}
                </p>
            </div>
 
            {isAdmin && (
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => navigate(`/dashboard/categories/edit/${category.id}`)}
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
            )}
        </div>
    );
};

export default CategoryRow;