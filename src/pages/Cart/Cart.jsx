import { useEffect } from "react";
import useCartContext from "../../hook/useCartContext";

const Cart = () => {
    const { cart ,createOrGetCart } = useCartContext();
    useEffect(() => {
        createOrGetCart();
    }, [createOrGetCart]);
    return (
        <div>
            this is cart page {JSON.stringify(cart)}
        </div>
    );
};

export default Cart;