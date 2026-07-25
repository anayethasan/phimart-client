import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await authApiClient.get("/auth/users/");
                setUsers(res.data);
            } catch (err) {
                console.log("Error fetching users", err);
                if (err?.response?.status === 403) {
                    setError("You don't have permission to view this page.");
                } else {
                    setError("Failed to load users.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    return (
         <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
 
            {loading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : error ? (
                <p className="text-center text-error py-8">{error}</p>
            ) : users.length === 0 ? (
                <p className="text-center text-base-content/70 py-8">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;