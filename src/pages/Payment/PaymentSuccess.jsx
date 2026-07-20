import { Link } from "react-router";


const PaymentSuccess = () => {
    return (
        <div>
            <h1>Success fully payment done now go to <Link to={"dashboard"}>Dashboard</Link></h1>
        </div>
    );
};

export default PaymentSuccess;