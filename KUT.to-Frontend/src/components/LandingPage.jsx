import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Card from "./Card";
import landingLogo from "../assets/LandingPageLogo.png";
import { Link as RouterLink } from "react-router-dom";
import ContextApi from "../api/ContextApi.jsx";

// ... existing icons ...
import {
  Link as LinkIcon,
  BarChart3,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Users,
  Sparkles,
} from "lucide-react";

function LandingPage() {
  const featuresRef = useRef(null);
  const context = React.useContext(ContextApi);
  const { token } = context || {};

  // Mobile Showcase State
  const [currentShowcase, setCurrentShowcase] = useState(0);

  const showcaseData = [
    {
      title: "Instant Shortening",
      desc: "Paste, click, done. Turn clutter into clean links in seconds.",
      icon: Sparkles,
      color: "bg-gradient-to-br from-sky-400/70 to-blue-500/70" // Sky Blue
    },
    {
      title: "Detailed Analytics",
      desc: "Visualize your data. Know exactly when and where people click.",
      icon: BarChart3,
      color: "bg-gradient-to-br from-yellow-400/70 to-orange-500/70" // Yellow
    },
    {
      title: "Total Control",
      desc: "Manage your dashboard. Organize, edit, and share with ease.",
      icon: LayoutDashboard,
      color: "bg-gradient-to-br from-emerald-400/70 to-green-500/70" // Green
    }
  ];

  const CurrentIcon = showcaseData[currentShowcase].icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % showcaseData.length);
    }, 3000); // Swipe every 3 seconds
    return () => clearInterval(timer);
  }, []);

  console.log("Landing Page Token:", token);

  const handleExploreMore = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 rounded-full opacity-60"
        style={{ filter: "blur(120px)" }}
      ></div>
      <div
        className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 via-cyan-500 to-blue-600 rounded-full opacity-50"
        style={{ filter: "blur(100px)" }}
      ></div>
      <div
        className="absolute top-32 -right-24 w-[480px] h-[480px] bg-gradient-to-bl from-orange-400 via-red-500 to-pink-500 rounded-full opacity-65"
        style={{ filter: "blur(140px)" }}
      ></div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center px-4 sm:px-6 pt-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-left lg:text-left order-2 lg:order-1 lg:-translate-x-20"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-4 sm:mb-6"
              >
                <span className="block whitespace-nowrap">KUT.to Simplifies URL</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Shortening
                  </span>{" "}
                  For
                </span>
                <span className="block">
                  Efficient{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Sharing
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
              >
                Generate short, memorable links with ease using KUT.to&apos;s
                intuitive interface. Share URLs effortlessly across platforms and
                track your link performance with detailed analytics.
              </motion.p>

              {/* Hero Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-row items-center gap-3 justify-center lg:justify-start"
              >
                <RouterLink to={token ? "/dashboard" : "/register"} className="w-full sm:w-52">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 w-full whitespace-nowrap"
                  >
                    Manage Links
                  </motion.button>
                </RouterLink>

                <RouterLink to={token ? "/dashboard" : "/register"} className="w-full sm:w-52">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 backdrop-blur-lg bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 w-full whitespace-nowrap"
                  >
                    Create ShortLink
                  </motion.button>
                </RouterLink>
              </motion.div>

              {/* Mobile Auto-Swiping Showcase */}
              <div className="block sm:hidden mt-10 -mb-2 relative h-52 w-full max-w-xs mx-auto">
                {/* Background Card (Hint of next card) */}
                <div
                  className={`absolute inset-0 rounded-2xl shadow-lg transform translate-y-3 scale-95 opacity-60 z-0 transition-colors duration-500 ${showcaseData[(currentShowcase + 1) % showcaseData.length].color}`}
                ></div>

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentShowcase}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, x: -300, rotate: -15, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-2xl z-10 backdrop-blur-xl border border-white/20 ${showcaseData[currentShowcase].color}`}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CurrentIcon className="w-14 h-14 text-white mb-4 drop-shadow-lg" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white font-bold text-2xl mb-2 drop-shadow-md"
                    >
                      {showcaseData[currentShowcase].title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/95 text-sm font-medium leading-relaxed drop-shadow-sm"
                    >
                      {showcaseData[currentShowcase].desc}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>

                {/* Indicators */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                  {showcaseData.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentShowcase ? "bg-white w-5" : "bg-white/30"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Visual Element (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden sm:flex flex-1 justify-center lg:justify-end order-1 lg:order-2 w-full mt-[-20px]"
            >
              <div className="flex justify-center lg:justify-end items-start pt-0 w-full lg:pr-2">
                <img
                  src={landingLogo}
                  alt="KUT.to Logo"
                  className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-2xl lg:translate-x-6"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* See How It Works Button (End of Hero Section) */}
      <div className="relative z-10 flex justify-center pb-10 -mt-12">
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExploreMore}
          className="px-7 py-3 rounded-full font-semibold text-white/40
            backdrop-blur-2xl bg-white/4 border border-white/5
            shadow-lg hover:shadow-xl
            hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
        >
          See How It Works
        </motion.button>
      </div>

      {/* Feature Cards */}
      <div id="features" ref={featuresRef} className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-14">
        <motion.div
          className="grid gap-5 sm:gap-6 lg:gap-7 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {[
            { title: "Step 1: Paste Your URL", desc: "Copy any long link (YouTube, Google Drive, GitHub, Instagram, etc.) and paste it into KUT.to.", icon: LinkIcon, theme: "violet" },
            { title: "Step 2: Click Shorten", desc: "Hit the shorten button and KUT.to instantly generates a short, clean link for you.", icon: Zap, theme: "blue" },
            { title: "Step 3: Copy the Link", desc: "Copy your new short link with one click and use it anywhere without hassle.", icon: LayoutDashboard, theme: "orange" },
            { title: "Step 4: Share Anywhere", desc: "Share your short link on WhatsApp, Instagram, LinkedIn, emails, messages, and more.", icon: Users, theme: "blue" },
            { title: "Step 5: Track Performance", desc: "View click statistics and check how your link is performing using the analytics section.", icon: BarChart3, theme: "violet" },
            { title: "Step 6: Manage All Links", desc: "See all your created links in one dashboard and manage them easily anytime.", icon: ShieldCheck, theme: "orange" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
            >
              <Card
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                theme={feature.theme}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* CTA Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-8 sm:p-12 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to streamline your links?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust KUT.to for their URL shortening needs. Start for free today.
            </p>
            <RouterLink to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </motion.button>
            </RouterLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
