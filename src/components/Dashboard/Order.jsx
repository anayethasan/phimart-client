import useAuthContext from "../../hook/useAuthContext";
import useOrders from "../../hook/useOrders";

const statusBadgeClass = (status) => {
  switch (status) {
    case "Delivered":
      return "badge-success";
    case "Ready to Ship":
      return "badge-warning";
    case "Shipped":
      return "badge-info";
    case "Canceled":
      return "badge-error";
    case "Not Paid":
      return "badge-neutral";
    default:
      return "badge-ghost";
  }
};
const Order = () => {
  const { orders, loading, error } = useOrders();
  const { user } = useAuthContext();

  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">
          {user.is_staff ? "Recent Orders" : "My Orders"}
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-10 min-h-screen">
            <span className="loading loading-spinner loading-xl text-secondary scale-200"></span>
          </div>
        ) : error ? (
          <p className="text-error">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-sm opacity-70">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Order ID</th>
                  {user?.is_staff && <th>Customer</th>}
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#ORD-{order.id}</td>
                    {user?.is_staff && (
                      <td>
                        {order.user?.full_name ||
                          order.user?.username ||
                          order.user ||
                          "N/A"}
                      </td>
                    )}
                    <td>
                      <div className={`badge ${statusBadgeClass(order.status)}`}>
                        {order.status}
                      </div>
                    </td>
                    <td>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td>${Number(order.total_price ?? 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default Order;
