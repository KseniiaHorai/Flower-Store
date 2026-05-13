import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";

const SignUpPage = () => {
    const loading = false;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const fields = [
        {
            id: "name",
            label: "Full name",
            type: "text",
            icon: User,
            placeholder: "John Doe",
            key: "name",
        },
        {
            id: "email",
            label: "Email address",
            type: "email",
            icon: Mail,
            placeholder: "you@example.com",
            key: "email",
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            icon: Lock,
            placeholder: "••••••••",
            key: "password",
        },
        {
            id: "confirmPassword",
            label: "Confirm password",
            type: "password",
            icon: Lock,
            placeholder: "••••••••",
            key: "confirmPassword",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <motion.div
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Icon mark */}
                <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-300 to-pink-300 flex items-center justify-center shadow-[0_4px_16px_rgba(134,239,172,0.4)] mb-4">
                    <UserPlus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-700">
                    Create your account
                </h2>
                <p className="mt-1 text-center text-sm text-gray-400">
                    Join us today — it's free
                </p>
            </motion.div>

            <motion.div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-[0_4px_32px_rgba(134,239,172,0.1),0_1px_4px_rgba(0,0,0,0.04)] px-8 py-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {fields.map(
                            ({
                                id,
                                label,
                                type,
                                icon: Icon,
                                placeholder,
                                key,
                            }) => (
                                <div key={id}>
                                    <label
                                        htmlFor={id}
                                        className="block text-sm font-medium text-gray-600 mb-1.5"
                                    >
                                        {label}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Icon
                                                className="h-4 w-4 text-gray-300"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            id={id}
                                            type={type}
                                            required
                                            value={formData[key]}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    [key]: e.target.value,
                                                })
                                            }
                                            placeholder={placeholder}
                                            className="block w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 hover:border-gray-300 transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            ),
                        )}

                        <div className="pt-1">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-400 to-pink-400 hover:from-emerald-500 hover:to-pink-500 hover:-translate-y-px shadow-[0_2px_12px_rgba(134,239,172,0.35)] hover:shadow-[0_4px_16px_rgba(134,239,172,0.45)] focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <Loader
                                            className="h-4 w-4 animate-spin"
                                            aria-hidden="true"
                                        />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Sign up
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        <span className="text-xs text-gray-300">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    <p className="mt-5 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-emerald-500 hover:text-pink-500 transition-colors duration-200 inline-flex items-center gap-0.5"
                        >
                            Login here <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;
