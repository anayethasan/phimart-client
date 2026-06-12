import { useEffect, useState } from "react";
import apiClient from "../../services/api_services";
import CategorieItem from "./CategorieItem";
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        apiClient
            .get("/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            {/* Category Heading */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Browse Categories</h2>
                <a href="#" className="btn btn-secondary px-6 py-6 rounded-full text-lg">
                    View All
                </a>
            </div>
            {/* Category grid */}
            {loading ? (<div className="flex justify-center items-center py-10">
                            <span className="loading loading-spinner loading-xl text-secondary"></span>
                        </div>) :
        
            (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    categories.map((category, index) => (
                        <CategorieItem key={category.id} index={index} category={category} />
                    ))
                }
            </div>)}
        </section>
    );
};

export default Categories;