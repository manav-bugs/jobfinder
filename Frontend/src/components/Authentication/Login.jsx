import React, { useState, useContext } from "react";
import Input from "../utils/Input";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(AppContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/login`,
                { email, role, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setIsAuthorized(true);
            setUser(response.data.response);
        } catch (err) {
            setIsAuthorized(false);
            console.log("error in logging in : ", err);
        }
    };

    if (isAuthorized) {
        return <Navigate to={'/'} />;
    }

    return (
        <section className="flex items-center justify-center bg-neutral-200 p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-lg shadow-lg dark:bg-neutral-800 p-6 sm:p-8 md:p-10 space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <img width="128" height="128" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Job-Search-recruitment-nawicon-outline-color-nawicon.png" alt="Job Finder" />
                    <p className="font-bold text-center text-gray-800 dark:text-white">Please login to your account</p>
                </div>
                <form className="flex flex-col space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-700 dark:text-white font-medium">Login As:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded-md text-black"
                        >
                            <option value="">Select Role</option>
                            <option value="Employer">Employer</option>
                            <option value="Job Seeker">Job Seeker</option>
                        </select>
                    </div>
                    <Input
                        type="text"
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                    />
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                    />
                    <button
                        className="mt-4 w-full py-2 rounded-md text-white font-medium transition bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:opacity-90"
                        type="button"
                        onClick={handleLogin}
                    >
                        Log in
                    </button>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
                        <p className="text-sm text-gray-800 dark:text-white">Don't have an account?</p>
                        <Link to={'/register'}>
                            <button
                                type="button"
                                className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                            >
                                Register
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;