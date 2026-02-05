import React, { useState } from 'react'
import Graph from './Graph'
import { dummyData } from '../../DummyData/data'
import { useStoreContext } from '../../api/ContextApi'
import ShortenPopUp from './ShortenPopUp'
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery"
import { FaLink, FaSearch, FaCalendarAlt, FaChevronDown } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import ShortenUrlList from "./ShortenUrlList";

const DashboardLayout = () => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [shortenPopup, setShortenPopup] = useState(false);

    // State for Enhancements
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(5);
    const [dateRange, setDateRange] = useState(30); // Default to 30 days
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

    // Calculate dates for graph (Local Timezone Safe)
    const getDates = (days) => {
        const toLocalISODate = (date) => {
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - (offset * 60 * 1000));
            return localDate.toISOString().split('T')[0];
        };

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);

        return {
            start: toLocalISODate(start),
            end: toLocalISODate(end)
        };
    };

    const { start: startDate, end: endDate } = getDates(dateRange);

    const { isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError);
    const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(token, onError, startDate, endDate);

    function onError(error) {
        console.log("ERROR");
    }

    // Filter and Pagination Logic
    const filteredUrls = myShortenUrls?.filter(url =>
        (url.shortUrl && url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (url.originalUrl && url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (url.alias && url.alias.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

    const visibleUrls = filteredUrls.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    const dateOptions = [
        { label: "Last 7 Days", value: 7 },
        { label: "Last 30 Days", value: 30 },
        { label: "Last 90 Days", value: 90 },
        { label: "This Year", value: 365 },
    ];

    const currentLabel = dateOptions.find(o => o.value === dateRange)?.label || "Custom";

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {loader ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        <p className="text-gray-600">Loading analytics...</p>
                    </div>
                </div>
            ) : (
                <div className='max-w-7xl mx-auto sm:px-4 px-2 pt-32 pb-8'>

                    {/* Analytics Card */}
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-200 sm:p-6 p-4 sm:mb-8 mb-4 relative z-0'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 sm:mb-6 mb-4'>
                            <h2 className='sm:text-xl text-lg font-semibold text-gray-800 flex items-center gap-2'>
                                <FaCalendarAlt className="text-purple-500" /> Click Analytics
                            </h2>

                            {/* Date Range Picker */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                                >
                                    {currentLabel} <FaChevronDown className={`text-xs transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDateDropdownOpen && (
                                    <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                                        {dateOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setDateRange(option.value);
                                                    setIsDateDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-purple-50 transition-colors ${dateRange === option.value ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600'}`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='sm:h-96 h-72 relative'>
                            {totalClicks && totalClicks.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center -mt-8 z-10">
                                    <div className="text-center max-w-[260px] sm:max-w-sm">
                                        <div className="relative mb-8">
                                            <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 rounded-[2rem] transform rotate-3 opacity-30"></div>
                                                <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-50 rounded-[1.8rem] shadow-xl border border-gray-100/50"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="flex items-end space-x-1.5">
                                                        <div className="w-1.5 h-4 sm:h-6 bg-gradient-to-t from-gray-200 to-gray-300 rounded-full opacity-40"></div>
                                                        <div className="w-1.5 h-7 sm:h-10 bg-gradient-to-t from-indigo-300 to-indigo-400 rounded-full opacity-60"></div>
                                                        <div className="w-1.5 h-3 sm:h-4 bg-gradient-to-t from-gray-200 to-gray-300 rounded-full opacity-40"></div>
                                                        <div className="w-1.5 h-6 sm:h-8 bg-gradient-to-t from-purple-300 to-purple-400 rounded-full opacity-60"></div>
                                                        <div className="w-1.5 h-2 sm:h-3 bg-gradient-to-t from-gray-200 to-gray-300 rounded-full opacity-40"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div>
                                                <h3 className="text-lg sm:text-2xl font-light text-slate-800 mb-1 tracking-tight">Ready to Launch</h3>
                                                <div className="w-8 h-px bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mb-3"></div>
                                            </div>
                                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                                                Your analytics dashboard is waiting for its first data point. Create a short link to begin tracking engagement metrics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Graph graphData={totalClicks} />
                        </div>
                    </div>

                    {/* Links Section with Search and Action */}
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:mb-6 mb-4'>
                        <div className="relative w-full sm:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 text-sm" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-shadow shadow-sm"
                                placeholder="Search your links..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            className="inline-flex items-center justify-center gap-2 sm:px-6 px-4 sm:py-2.5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 sm:text-sm text-sm w-full sm:w-auto transform hover:-translate-y-0.5"
                            onClick={() => setShortenPopup(true)}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Create New Link</span>
                        </button>
                    </div>

                    <div>
                        {!isLoading && myShortenUrls?.length === 0 ? (
                            <div className="flex justify-center pt-8 sm:pt-16">
                                <div className="flex flex-col sm:flex-row gap-2 items-center justify-center py-3 sm:px-8 px-3 rounded-md shadow-lg bg-gray-50 text-center sm:text-left">
                                    <h1 className="text-slate-800 font-montserrat sm:text-[18px] text-[12px] font-semibold mb-0">
                                        You haven't created any short link yet
                                    </h1>
                                    <FaLink className="text-blue-500 sm:text-xl text-sm " />
                                </div>
                            </div>
                        ) : (
                            <>
                                {filteredUrls.length === 0 && searchTerm ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">No links found matching "{searchTerm}"</p>
                                    </div>
                                ) : (
                                    <ShortenUrlList data={visibleUrls} />
                                )}

                                {/* Load More Button */}
                                {visibleCount < filteredUrls.length && (
                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={handleLoadMore}
                                            className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                        >
                                            Show More Links ({filteredUrls.length - visibleCount} remaining)
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <ShortenPopUp
                open={shortenPopup}
                setOpen={setShortenPopup}
                refetch={refetch}
            />
        </div>
    )
}

export default DashboardLayout
