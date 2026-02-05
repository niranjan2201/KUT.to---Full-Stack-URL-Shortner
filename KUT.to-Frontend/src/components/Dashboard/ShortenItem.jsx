import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import api from "../../api/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../api/ContextApi.jsx";
import Graph from "./Graph";
import toast from 'react-hot-toast';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // ---- COPY HANDLER ----
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy link");
    }
  };

  // ---- ENV ----
  const baseUrl = import.meta.env.VITE_REACT_FRONT_END_URL || "";
  const subDomain = baseUrl.replace(/^https?:\/\//, "");

  // ---- ANALYTICS TOGGLE (no loops) ----
  const analyticsHandler = (shortCode) => {
    if (!analyticToggle && selectedUrl !== shortCode) {
      setSelectedUrl(shortCode);
      setAnalyticsData([]);
      setHasFetched(false);
    }

    setAnalyticToggle((prev) => !prev);

    // Reset when closing
    if (analyticToggle) {
      setAnalyticsData([]);
      setHasFetched(false);
      setLoader(false);
    }
  };

  // ---- FETCH ANALYTICS (SAFE VERSION) ----
  useEffect(() => {
    if (!analyticToggle || !selectedUrl) return;

    if (hasFetched) return; // <-- prevents re-fetch loop

    const fetchMyShortUrl = async () => {
      setLoader(true);
      setHasFetched(false);

      try {
        const startDate = dayjs().subtract(30, "day").format("YYYY-MM-DDT00:00:00");
        const endDate = dayjs().format("YYYY-MM-DDT23:59:59");

        const { data } = await api.get(
          `/api/urls/analytics/${selectedUrl}?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setAnalyticsData(data);
        setHasFetched(true);
      } catch (error) {
        console.error(error);
        navigate("/error");
      } finally {
        setLoader(false);
      }
    };

    fetchMyShortUrl();
  }, [analyticToggle, selectedUrl, hasFetched]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 sm:p-5 p-2.5">

      {/* TOP ROW */}
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-3">

        {/* Left: Short URL + Original URL */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              className="text-sm sm:text-lg font-semibold text-purple-700 hover:underline"
              to={`${baseUrl}/s/${shortUrl}`}
            >
              {subDomain}/{shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-purple-600" />
          </div>

          <p className="text-[11px] sm:text-sm text-gray-600 truncate max-w-full">
            {originalUrl}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto text-[11px] sm:text-sm">
          <div
            onClick={() => copyToClipboard(`${baseUrl}/s/${shortUrl}`)}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium cursor-pointer transition flex-1 sm:flex-none"
          >
            {isCopied ? <LiaCheckSolid /> : <IoCopy />}
            <span>{isCopied ? "Copied" : "Copy"}</span>
          </div>

          <div
            onClick={() => analyticsHandler(shortUrl)}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium cursor-pointer transition flex-1 sm:flex-none"
          >
            <MdAnalytics />
            <span>Analytics</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-2 sm:my-4"></div>

      {/* METRICS */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-sm">
        <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full font-medium">
          <MdOutlineAdsClick />
          {clickCount} {clickCount === 1 ? "Click" : "Clicks"}
        </div>

        <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
          <FaRegCalendarAlt />
          {createdDate ? dayjs(createdDate).format("MMM DD, YYYY") : "—"}
        </div>
      </div>

      {/* ANALYTICS PANEL */}
      <div
        className={`${analyticToggle ? "block" : "hidden"
          } mt-5 border-t pt-5 max-h-[500px] overflow-hidden`}
      >
        {loader ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-slate-700">Please Wait...</p>
            </div>
          </div>
        ) : (
          <>
            {!loader && hasFetched && analyticsData.length === 0 && (
              <div className="text-center text-gray-600 mb-4">
                No Data For This Time Period
              </div>
            )}

            {analyticsData.length > 0 && (
              <Graph graphData={analyticsData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShortenItem;
