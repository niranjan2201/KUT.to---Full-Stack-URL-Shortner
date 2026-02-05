import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import api from '../api/api';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [emailSentTo, setEmailSentTo] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await api.post('/api/auth/public/forgot-password', { email: data.email });
            setSubmitted(true);
            setEmailSentTo(data.email);
            toast.success('Reset link sent!');
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to send reset link.';
            toast.error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex bg-[#eeeeee36]"
        >
            {/* LEFT PANEL */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-r from-[#2e1947] to-[#512a33]"
            >
                {/* Glows */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[180px]" />
                <div className="absolute -bottom-48 -right-48 w-[620px] h-[620px] bg-rose-600/25 rounded-full blur-[200px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />

                <div className="flex flex-col justify-center px-16 text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl font-bold mb-6 leading-tight"
                    >
                        Shorten links.<br />Track smarter.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                        className="text-lg text-gray-200 max-w-md leading-relaxed"
                    >
                        Recover access to your account and get back to managing your links effectively.
                    </motion.p>
                </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative w-full max-w-md"
                >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/40 to-indigo-500/40 blur-[60px] opacity-40 -z-10" />

                    {/* Glass Card */}
                    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl shadow-2xl p-8">
                        {!submitted ? (
                            <>
                                <h2 className="text-2xl text-gray-900 mb-1">Reset Password</h2>
                                <p className="text-sm text-gray-500 mb-4">Enter your email to receive a reset link</p>
                                <hr className="border-black/20 mb-6" />

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            {...register('email', { required: 'Email is required' })}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={loading}
                                        type="submit"
                                        className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </motion.button>
                                </form>

                                <div className="mt-6 text-center">
                                    <Link to="/login" className="text-sm text-purple-700 font-medium hover:underline">
                                        Back to Login
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Check your email</h3>
                                <p className="text-gray-600 mb-6">
                                    We've sent a password reset link to<br /><strong>{emailSentTo}</strong>
                                </p>
                                <Link to="/login" className="inline-block px-6 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors">
                                    Back to Login
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;
