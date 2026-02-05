import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStoreContext } from '../../api/ContextApi';
import { FaUserCircle, FaEnvelope, FaLink, FaMousePointer, FaCalendarAlt } from 'react-icons/fa';
import api from '../../api/api';
import dayjs from 'dayjs';

const ProfilePage = () => {
    const { user, token } = useStoreContext();
    const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!token) return;
            try {
                const { data: urls } = await api.get('/api/urls/myurls', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const linkCount = urls.length;
                let clickCount = 0;

                if (Array.isArray(urls)) {
                    clickCount = urls.reduce((acc, curr) => acc + (curr.clickCount || 0), 0);
                }

                setStats({ totalLinks: linkCount, totalClicks: clickCount });
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[0%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative"
                >
                    {/* Decorative subtle pattern on white bg */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

                    {/* Header / Banner */}
                    <div className="h-32 sm:h-48 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20"></div>
                    </div>

                    {/* Profile Info */}
                    <div className="px-5 sm:px-12 pb-12 relative">
                        {/* Avatar & Main Info */}
                        <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-6 sm:items-end -mt-8 sm:-mt-12 mb-6 sm:mb-8">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-white rounded-full opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
                                <div className="relative w-20 h-20 sm:w-40 sm:h-40 rounded-full border-[4px] sm:border-[6px] border-white bg-slate-100 flex items-center justify-center shadow-xl text-slate-400 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-200"></div>
                                    <span className="relative text-3xl sm:text-6xl font-bold bg-gradient-to-br from-slate-400 to-slate-600 text-transparent bg-clip-text">
                                        {user.username?.charAt(0).toUpperCase() || "U"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 pb-2 text-center sm:text-left z-10">
                                <h1 className="text-xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 drop-shadow-sm">
                                    {user.username}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-slate-500 text-xs sm:text-sm font-medium">
                                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm transition-colors hover:border-purple-200">
                                        <FaEnvelope className="text-purple-500" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                                        <span className={`w-2 h-2 rounded-full ${user.role === 'ADMIN' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}></span>
                                        {user.role || "User"} Account
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="mb-10 border-slate-100" />

                        {/* Stats Grid */}
                        <div>
                            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 px-1">Analytics Overview</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <StatCard
                                    title="Total Links Created"
                                    value={loading ? "..." : stats.totalLinks}
                                    icon={FaLink}
                                    color="text-white bg-gradient-to-br from-blue-500 to-blue-600"
                                    bgColor="bg-slate-50 border-slate-100"
                                    delay={0.1}
                                />
                                <StatCard
                                    title="Total Clicks Received"
                                    value={loading ? "..." : stats.totalClicks}
                                    icon={FaMousePointer}
                                    color="text-white bg-gradient-to-br from-purple-500 to-purple-600"
                                    bgColor="bg-slate-50 border-slate-100"
                                    delay={0.2}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, bgColor, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5 }}
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
        className={`p-4 sm:p-6 rounded-2xl border ${bgColor || 'bg-slate-50 border-slate-100'} flex items-center gap-4 sm:gap-5 transition-all duration-300 relative overflow-hidden group`}
    >
        <div className={`absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.03] rounded-full -mr-8 -mt-8 pointer-events-none transform group-hover:scale-150 transition-transform duration-500 ${color.split(' ')[0]}`}></div>

        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg relative z-10 ${color}`}>
            <Icon />
        </div>
        <div className="relative z-10">
            <p className="text-slate-500 text-[10px] sm:text-sm font-semibold mb-0.5 sm:mb-1 uppercase tracking-wider">{title}</p>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">{value}</p>
        </div>
    </motion.div>

);

export default ProfilePage;
