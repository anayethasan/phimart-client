// import React from 'react';

import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hook/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPasswordConfirm = () => {
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const { resetPasswordConfirm, errorMsg } = useAuth();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        fromSate: { errors },
    } = useForm();

    // eslint-disable-next-line react-hooks/incompatible-library
    const newPassword = watch("new_password");

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage("");
        const result = await resetPasswordConfirm(
            userId,
            token,
            data.new_password,
            data.re_new_password
        );

        setLoading(false);

        if(result.success) {
            setLoading(result.message);
            setTimeout(() => navigate("/login"), 2000);
        }
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>

        {message && <p className="text-green-500 mb-3">{message}</p>}
        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">New Password</label>
            <input
              type="password"
              className="input input-bordered bg-base-200 w-full"
              {...register("new_password", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.new_password && (
              <p className="text-red-500">{errors.new_password.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">Confirm New Password</label>
            <input
              type="password"
              className="input input-bordered bg-base-200 w-full"
              {...register("re_new_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {errors.re_new_password && (
              <p className="text-red-500">{errors.re_new_password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    );
};

export default ResetPasswordConfirm;