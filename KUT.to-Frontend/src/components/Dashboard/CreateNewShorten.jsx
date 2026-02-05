import React, { useState } from 'react'
import { useStoreContext } from '../../api/ContextApi';
import { useForm } from 'react-hook-form';
import api from '../../api/api';
import toast from 'react-hot-toast';
import TextField from '../TextField';
import { RxCross2 } from 'react-icons/rx';
import { Tooltip } from '@mui/material';


export const CreateNewShorten = ({setOpen, refetch}) => {
    
    const { token } = useStoreContext();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { 
        originalUrl: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (data) => {
        setLoading(true);
        try {
            const { data: res } = await api.post("/api/urls/shorten", data, {
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
                },
            });

            const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/${res.shortUrl}`;
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short URL Copied to Clipboard", {
                    position: "top-center",
                    className: "mb-5",
                    duration: 3000,
                });
            });

            // await refetch();
            reset();
            setOpen(false);
        } catch (error) {
            toast.error("Create ShortURL Failed");
        } finally {
            setLoading(false);
        }
    };
  
    return (
    <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={() => setOpen(false)}
    >
        <div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 relative max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
        >
            <form
                onSubmit={handleSubmit(createShortUrlHandler)}
                className="p-8"
            >
                {/* Close Button */}
                {!loading && (
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <RxCross2 className="text-gray-500 hover:text-gray-700 text-xl" />
                    </button>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        Create Short URL
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Transform your long URL into a short, shareable link
                    </p>
                </div>

                {/* URL Input */}
                <div className="mb-6">
                    <TextField
                        label="Enter URL"
                        required
                        id="originalUrl"
                        placeholder="https://example.com"
                        type="url"
                        message="URL is required"
                        register={register}
                        errors={errors}
                    />
                </div>

                {/* Create Button */}
                <button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Creating...
                        </div>
                    ) : (
                        "Create Short URL"
                    )}
                </button>
            </form>
        </div>
    </div>
    )
}

export default CreateNewShorten