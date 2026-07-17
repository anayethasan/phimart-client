import {  useEffect, useState } from "react";
import apiClient from "../services/api_services";
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };
    const [authTokens, setAuthTokens] = useState(getToken());

    useEffect(() => {
        if(authTokens)
            // eslint-disable-next-line react-hooks/immutability
            fetchUserProfile();
    }, [authTokens]);

    //API error handling
    const handleApiError = ( error, defaultMessage = "Something went wrong, try again!" ) => {
        if (error.response?.data) {
            const errorMessage = Object.values(error.response.data)
            .flat()
            .join("\n");

            setErrorMsg(errorMessage);

            return {
            success: false,
            message: errorMessage,
            };
        }

        setErrorMsg(defaultMessage);

        return {
            success: false,
            message: defaultMessage,
        };
    };

    //Fetch User Profile 
    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get("/auth/users/me", {
                headers: {Authorization: `JWT ${authTokens?.access}`},
            });
            setUser(response.data);
        } catch (error) {
            console.log("Error Fetching user", error);
        }
    };

    //Update user Profile
    const updateUserProfile = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.put("/auth/users/me/", data, {
                headers: {
                    Authorization: `JWT ${authTokens?.access}`,
                },
            })
        } catch (error) {
            return handleApiError(error);
        }
    };



    //Login user
    const loginUser = async (userData) => {
        setErrorMsg("");
        try {
            const response = await apiClient.post("auth/jwt/create/", userData);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            //After Login set user
            await fetchUserProfile();
        } catch (error) {
            setErrorMsg(error.response?.data?.detail);
            throw error;
        }
    };

    //Register User 
    const registerUser = async (userData) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/", userData);
            return {success: true, message: "Registration successfully done.Now Check your mail..."};
        } catch (error) {
            return handleApiError(error, "Registration Failed! Try again")
        }
    };

    // Password Change
    const changePassword = async (data) => {
        setErrorMsg("");
        try {
        await apiClient.post("/auth/users/set_password/", data, {
            headers: {
            Authorization: `JWT ${authTokens?.access}`,
            },
        });
        } catch (error) {
        return handleApiError(error);
        }
    };

    //Logout user
    const logOutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("cartId");
    };

    //Resend Activation Email
    const resendActivation = async (email) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/resend_activation/", { email });
            return{
                success: true,
                message: "Activation email send to your mail. Please check your mail.",
            }
        } catch (error) {
            return handleApiError(error, "Resend Activation Failed! Try again");
        }
    };

    //Reset password confirm 
    const resetPasswordConfirm = async (userId, token, new_password, re_new_password) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/reset_password_confirm/", {
                userId,
                token,
                new_password,
                re_new_password,
            });
            return {
                success: true,
                message: "Password Successfully reset done. now set your new password",
            };
        } catch (error) {
            return handleApiError(error, "Password Rest Failed! try again")
        }
    };
    
    return {user, errorMsg, loginUser, registerUser, logOutUser, updateUserProfile, changePassword, resendActivation, resetPasswordConfirm};
};

export default useAuth;