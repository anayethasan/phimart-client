import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import StartCard from "../../components/Dashboard/StartCard";
import Order from "../../components/Dashboard/Order";
import useDashboardStats from './../../hook/useDashboardStatus';
import useAuthContext from "../../hook/useAuthContext";
const Dashboard = () => {
  const { stats, loading } = useDashboardStats();
  const { user } = useAuthContext();
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StartCard icon={FiPackage} title="Total Products" value={loading ? "..." : stats.totalProducts} />
        <StartCard icon={FiShoppingCart} title="Total Orders" value={loading ? "..." : stats.totalOrders} />
        {user.is_staff ? (<StartCard icon={FiUsers} title="Total Users" value={loading ? "..." : stats.totalUsers} />) : (<h1>this is you</h1>)}
        <StartCard icon={FiStar} title="Average Rating" value={4.8} />
      </div>

      <Order />
    </div>
  );
};

export default Dashboard;
