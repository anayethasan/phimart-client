import { useCallback, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
    const [authToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens).access : null;
    });
    const [cart, setCart] = useState(null);
    const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
    //Create a nest cart
    const createOrGetCart = useCallback(async () => {
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
        } catch (error) {
            console.log(error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ authToken, cartId ]);

    //Add items to the cart
    const AddCartItems = useCallback( async (product_id, quantity) => {
        if(!cartId)
            await createOrGetCart();

        try {
            const response = await authApiClient.post(
                `carts/${cartId}/items/`, 
                { product_id, quantity }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }, [cartId, createOrGetCart]);

    return { cart, createOrGetCart, AddCartItems };
};

export default useCart;