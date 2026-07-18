
import { useNavigate } from 'react-router';
import authApiClient from './../../services/auth-api-client';
import useCartContext from './../../hook/useCartContext';
import { useState } from 'react';

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
    const shipping = itemCount == 0 || parseFloat(totalPrice) > 100 ? 0 : 10;
    const tax = parseFloat(totalPrice) * 0.1;
    const orderTotal = parseFloat(totalPrice) + shipping + tax;
    
    const navigate = useNavigate();
    const { clearCart } = useCartContext();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // const deleteCart = async () => {
    //   try {
    //     const response = await authApiClient.delete(`/carts/${cartId}/`);
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   } // when need delete in frontend
    // };

    const createOrder = async () => {
      try {
        const order = await authApiClient.post("/orders/", { cart_id: cartId });
        if(order.status === 201)
        {
          clearCart();
          navigate("/dashboard/orders");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsPlacingOrder(false);
      }
    };

    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal {itemCount} items</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
            onClick={createOrder}
             className="btn btn-primary w-full"
             disabled={itemCount===0 || isPlacingOrder}
             >
              {isPlacingOrder ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Placing Order...
                </span>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    );
};

export default CartSummary;