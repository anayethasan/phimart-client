import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
    const [authToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens)?.access : null;
    });
    const [cart, setCart] = useState(null);
    const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
    const [loading, setLoading] = useState(false);

    //Create a new cart
    const createOrGetCart = useCallback(async () => {
        setLoading(true);
        try {
            const response = await authApiClient.post(
                "carts/", 
            );
            // const response = await apiClient.post( // to manually authorizations
            //     "carts/", 
            //     {},
            //     {
            //         headers: {Authorization: `JWT ${authToken}`},
            //     }
            // );
            if(!cartId)
            {
                localStorage.setItem("cartId", response.data.id);
                setCartId(response.data.id);
            }
            setCart(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ authToken, cartId ]);

    //Add items to the cart
    const AddCartItems = useCallback( async (product_id, quantity) => {
        setLoading(true);
        let currentCartId = cartId;
        if(!currentCartId) {
            const newCart = await createOrGetCart();
            currentCartId = newCart?.id;
        }
        if(!cartId)
            await createOrGetCart();

        try {
            const response = await authApiClient.post(
                `carts/${cartId}/items/`, 
                { product_id, quantity }
            );

            const cartRes = await authApiClient.get(`carts/${currentCartId}/`);
            setCart(cartRes.data);

            return response.data;
        } catch (error) {
            console.log("Error adding Items",error);
        } finally {
            setLoading(false);
        }
    }, [cartId, createOrGetCart]);

    //Update Item quantity
    const updateCartItemQuantity = useCallback( async (itemId, quantity) => {
        try {
            await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {quantity,});
        } catch (error) {
            console.log("Error updating cart items", error);
        }
    }, [cartId]);

    //Delete Cart Items
    const deleteCartItems = useCallback(async (itemId) => {
        try {
            await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
        } catch (error) {
            console.log(error);
        }
    },[cartId]);

    // stop reloading page for using useEffect
    useEffect(() => {
        const initializeCart = async () => {
            setLoading(true);
            await createOrGetCart();
            setLoading(false);
        };
        initializeCart();
    }, [createOrGetCart]);

    //Clear cart state (when order place then local cart reset)
    const clearCart = useCallback(() => {
        localStorage.removeItem("cartId");
        setCartId(null);
        setCart(null);
    }, []);

    return { cart, loading, cartId, createOrGetCart, AddCartItems, updateCartItemQuantity, deleteCartItems, clearCart, };
};

export default useCart;