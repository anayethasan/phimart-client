import OrderTable from "./OrderTable";
import useAuthContext from "./../../hook/useAuthContext";
import { useState } from "react";
import authApiClient from "../../services/auth-api-client";

const STATUS_OPTIONS = [
  "Not Paid",
  "Ready to Ship",
  "Shipped",
  "Delivered",
  "Canceled",
];

const statusStyles = {
  "Not Paid": "bg-red-500",
  "Ready to Ship": "bg-yellow-300",
  Shipped: "bg-blue-500",
  Delivered: "bg-green-600",
  Canceled: "bg-gray-500",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const OrderCard = ({ order, onCancel, onDelete }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
 
  const [loading, setLoading] = useState(false);
 
  const isStaff = !!user?.is_staff;
  const totalPrice = Number(order.total_price ?? 0);
 
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    const prevStatus = status;
    setUpdating(true);
    setError("");
    setStatus(newStatus); // optimistic update
 
    try {
      await authApiClient.patch(`/orders/${order.id}/update_status/`, {
        status: newStatus,
      });
    } catch (err) {
      console.log(err);
      setStatus(prevStatus); // rollback on failure
      setError("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };
 
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/payment/initiate/", {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items?.length,
      });
      if(response.data.payment_url){
        setLoading(false);
        window.location.href = response.data.payment_url;
      }
      else {
        alert("payment failed!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleCancel = async () => {
    setCancelling(true);
    try {
      await onCancel(order.id);
    } finally {
      setCancelling(false);
    }
  };
 
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Order #${order.id}? This cannot be undone.`
    );
    if (!confirmed) return;
 
    setDeleting(true);
    try {
      await onDelete(order.id);
    } finally {
      setDeleting(false);
    }
  };
 
  const canCancel = !isStaff && status !== "Delivered" && status !== "Canceled";
  const canDelete = isStaff || status === "Not Paid" || status === "Canceled";

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
      <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-gray-600 text-sm">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isStaff ? (
            <select
              value={status}
              onChange={handleStatusChange}
              disabled={updating}
              className={`px-3 py-1 rounded-full text-white text-sm font-medium disabled:opacity-60 ${statusStyles[status] || "bg-gray-400"}`}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusStyles[status] || "bg-gray-400"}`}
            >
              {status}
            </span>
          )}
 
          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="text-blue-700 hover:underline disabled:opacity-50"
            >
              {cancelling ? "Cancelling..." : "Cancel"}
            </button>
          )}
 
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:underline disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
 
      {error && <p className="text-red-600 text-sm px-6 pt-2">{error}</p>}
 
      <div className="p-6">
        <h3 className="font-medium text-lg mb-4">Order Items</h3>
        <OrderTable items={order.items} />
      </div>
 
      <div className="border-t p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-50">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
 
        {!isStaff && status === "Not Paid" && (
          <button 
          onClick={handlePayment}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          disabled={loading}
          >
            { loading ? "Processing" : "Pay Now" }
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;