import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../api/ContextApi.jsx";

const Navbar = () => {
  const path = useLocation().pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const context = useStoreContext();
  const { user, logout } = context || {};
  const dropdownRef = useRef(null);

  // Scroll-to-Hide Logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Click Outside Handler for Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-6xl transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}>
      {/* âœ… Advanced Glass Navbar Pill */}
      <div className={`backdrop-blur-2xl bg-gray-900/60 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-[2rem] px-8 py-3 transition-all duration-300 ${showDropdown || isMobileMenuOpen ? 'bg-gray-900/90' : ''}`}>
        <div className="flex items-center justify-between h-10">

          {/* Logo */}
          <div className="flex-shrink-0 group">
            <Link to="/">
              <h1 className="font-bold text-3xl italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300 transform group-hover:scale-105">
                KUT.to
              </h1>
            </Link>
          </div>

          {/* Navigation Links - Centered (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 items-center">
            <Link to="/" className={`relative text-[15px] font-medium tracking-wide transition-all duration-300 ${path === '/' ? "text-white after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-purple-500 after:rounded-full after:shadow-[0_0_10px_rgba(168,85,247,0.5)]" : 'text-gray-400 hover:text-white'}`}>Home</Link>
            <Link to="/about" className={`relative text-[15px] font-medium tracking-wide transition-all duration-300 ${path === '/about' ? "text-white after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-purple-500 after:rounded-full after:shadow-[0_0_10px_rgba(168,85,247,0.5)]" : 'text-gray-400 hover:text-white'}`}>About</Link>
            {user && (
              <Link to="/dashboard" className={`relative text-[15px] font-medium tracking-wide transition-all duration-300 ${path === '/dashboard' ? "text-white after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-purple-500 after:rounded-full after:shadow-[0_0_10px_rgba(168,85,247,0.5)]" : 'text-gray-400 hover:text-white'}`}>Dashboard</Link>
            )}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <RxCross2 className="text-2xl" /> : <IoIosMenu className="text-2xl" />}
            </button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300 text-sm border border-white/10 ring-2 ring-transparent hover:ring-white/20"
                >
                  {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-6 w-64 bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden transform transition-all duration-200 origin-top-right ring-1 ring-white/5">
                    <div className="p-5 border-b border-white/5 bg-white/5">
                      <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      Your Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-4 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 flex items-center gap-2 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" className={`hidden sm:block bg-white text-gray-950 px-6 py-2.5 rounded-full text-[14px] font-semibold hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 ${path === '/register' ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900' : ''}`}>
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav Links - Collapsible */}
        <div className={`lg:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-white/10 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0 hidden'}`}>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={`text-sm font-medium tracking-wide transition-colors px-2 py-1 ${path === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Home</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className={`text-sm font-medium tracking-wide transition-colors px-2 py-1 ${path === '/about' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>About</Link>
          {user && <Link onClick={() => setIsMobileMenuOpen(false)} to="/dashboard" className={`text-sm font-medium tracking-wide transition-colors px-2 py-1 ${path === '/dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Dashboard</Link>}
          {!user && (
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/register" className={`sm:hidden text-sm font-medium tracking-wide text-white bg-purple-600/20 px-4 py-2 rounded-full text-center border border-purple-500/50 hover:bg-purple-600/30 transition-all ${path === '/register' ? 'bg-purple-600/40' : ''}`}>Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
