import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";


const ResendActivation = () => {
    const {resendActivation, errorMsg} = useAuth();
    const [ message, setMessage ] = useState("");
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, formState:{ errors }} = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setLoading("");
        const result = await resendActivation(data.email);
        setLoading(false);
        if(result.success)
            setMessage(result.message);
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Resend Activation Email</h2>

      {message && <p className="text-green-500 mb-3">{message}</p>}
      {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">Email Address</label>
          <input
            type="email"
            placeholder="youmail@gmail.com"
            className="input input-bordered bg-base-200 w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Sending..." : "Resend Activation Email"}
        </button>
      </form>
            
        </div>
    );
};

export default ResendActivation;