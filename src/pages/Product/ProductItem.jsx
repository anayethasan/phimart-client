import { Link, useNavigate } from "react-router";
import defaultImage from "../../assets/default_product.jpg";
import useAuthContext from './../../hook/useAuthContext';
const ProductItem = ({product}) => {

  const { user } = useAuthContext();
  const navigate = useNavigate();
 
    const handleBuyNow = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
 
        if (!user) {
            alert("Please login first to buy this product.");
            navigate("/login");
            return;
        }
 
        navigate(`/shop/${product.id}`);
    };
    return (
      <Link to={`/shop/${product.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={
                product.images.length > 0 ? product.images[0].image : defaultImage
              }
              alt={product.name}
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{product.name}</h2>
            <h3 className="font-bold text-xl text-red-700">${product.price}</h3>
            <p>{product.description}</p>
            <div className="card-actions mt-1 gap-2">
              <button onClick={handleBuyNow} className="btn btn-secondary">
                Buy Now
              </button>
              
            </div>
          </div>
        </div>
      </Link>
    );
};

export default ProductItem;