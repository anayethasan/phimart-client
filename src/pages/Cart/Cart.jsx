/* eslint-disable react-hooks/set-state-in-effect */
import { Suspense, useEffect, useState } from "react";
import useCartContext from "../../hook/useCartContext";
import CartItemList from "../../components/Cart/CartItemList";
import CartSummary from "../../components/Cart/CartSummary";

const Cart = () => {
    const { cart, loading, createOrGetCart, updateCartItemQuantity, deleteCartItems, } = useCartContext();

    const [localCart, setLocalCart] = useState(cart);

    useEffect(() => {
        if(!cart && !loading)
            createOrGetCart();
    }, [createOrGetCart, cart, loading]);

    useEffect(() => {
        setLocalCart(cart);
    }, [cart]);
    
    if(loading)
        return <p>loading.....</p>;

    if(!localCart)
        return <p>No Cart Found</p>;

    const handleUpdateQuantity = async(itemId, newQuantity) => {
        const prevLocalCartCopy = localCart // store a copy of localCart
        setLocalCart((prevLocalCart) => {
            const updatedItems = prevLocalCart.items.map((item) => item.id === itemId ? {
                ...item, 
                quantity: newQuantity,
                total_price: item.product.price * newQuantity,
            } : item );

            return {
                ...prevLocalCart,
                items: updatedItems,
                total_price: updatedItems.reduce(
                    (sum, item) => sum + item.total_price, 0
                ),
            };
        });

        try {
            await updateCartItemQuantity(itemId, newQuantity);
        } catch (error) {
            console.log(error);
            setLocalCart(prevLocalCartCopy); //Rollback to previous state if Apis fails
        }
    };

    const handleRemoveItem = async(itemId) => {
        setLocalCart((prevLocalCart) => {
            const updatedItems = prevLocalCart.items.filter((item) => item.id != itemId);

            return {
                ...prevLocalCart,
                items: updatedItems,
                total_price: updatedItems.reduce(
                    (sum, item) => sum + item.total_price, 0
                ),
            };
        });

        try {
            await deleteCartItems(itemId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="gird grid-cols md:grid-cols-2 gap-8">

                <div>
                    <Suspense fallback={<p>loading....</p>}>
                        <CartItemList
                            items={localCart.items}
                            handleUpdateQuantity={handleUpdateQuantity}
                            handleRemoveItem={handleRemoveItem}
                        />
                    </Suspense>
                </div>
                <div>
                    <CartSummary
                        totalPrice={localCart.total_price}
                        itemCount={localCart.items.length}
                    />
                </div>

            </div>
        </div>
    );
};

export default Cart;