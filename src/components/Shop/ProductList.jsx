import ProductItem from './../../pages/Product/ProductItem';
const ProductList = ({products, loading}) => {
    if(loading)
        return(
            <div className="flex justify-center items-center py-10 min-h-screen">
                <span className="loading loading-spinner loading-xl text-secondary scale-200"></span>
            </div>
        );
    return (
        <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                products.map((product) => (
                    <ProductItem product={product} key={product.id} />
                ))
            }
        </div>
    );
};

export default ProductList;