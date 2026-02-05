import React from "react";
import { motion } from 'framer-motion'
import { FaLink, FaShare, FaChartLine, FaEdit, FaShieldAlt, FaBolt, FaFolderOpen, FaUsers, FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaCode, FaLock } from 'react-icons/fa'
import profileImage from '../assets/aboutPP.jpeg'

const AboutPage = () => {
  const features = [
    { icon: FaLink, title: 'Simple URL Shortening', desc: 'Create short, clean URLs in seconds. No confusion, no clutter — just quick and easy link creation for everyday use.' },
    { icon: FaShare, title: 'Smart Link Sharing', desc: 'Share your short links anywhere: WhatsApp, Instagram bio, emails, or campaigns. Your links stay readable and professional across platforms.' },
    { icon: FaChartLine, title: 'Powerful Analytics', desc: 'Track clicks, locations, and traffic sources to understand what works. Perfect for improving engagement and optimizing your digital reach.' },
    { icon: FaEdit, title: 'Custom Aliases', desc: 'Make your links meaningful with custom keywords. Example: kut.to/portfolio instead of random characters.' },
    { icon: FaShieldAlt, title: 'Secure & Trusted', desc: 'Your links are protected using strong security measures and safe redirection. We focus on reliability so you can share confidently.' },
    { icon: FaBolt, title: 'Fast Redirects', desc: 'Lightning-fast redirection gives users a smooth experience. No delay, no loading — just instant access.' },
    { icon: FaFolderOpen, title: 'Manage All Links in One Place', desc: 'Create, edit, and organize your links from one dashboard. Perfect for projects, marketing links, and personal sharing.' },
    { icon: FaUsers, title: 'Built for Everyone', desc: 'KUT.to works great for: Students sharing resources, Creators managing social links, Businesses running campaigns, Developers sharing project links.' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute -top-20 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 rounded-full opacity-60" style={{ filter: 'blur(120px)' }}></div>
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 via-cyan-500 to-blue-600 rounded-full opacity-50" style={{ filter: 'blur(100px)' }}></div>
      <div className="absolute top-32 -right-24 w-[480px] h-[480px] bg-gradient-to-bl from-orange-400 via-red-500 to-pink-500 rounded-full opacity-65" style={{ filter: 'blur(140px)' }}></div>
      <div className="absolute bottom-40 right-20 w-[320px] h-[320px] bg-gradient-to-tl from-pink-400 via-purple-400 to-violet-500 rounded-full opacity-45" style={{ filter: 'blur(110px)' }}></div>

      <div className="relative z-10 px-4 sm:px-6 pt-32 pb-16 sm:pb-20">
        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          {/* Creator Info Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="backdrop-blur-lg bg-white/12 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Meet the Creator</h2>
                <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-2">Niranjan Naik</h3>
                <p className="text-base sm:text-lg text-blue-300 mb-4">Full-Stack Java Developer | CSE Student</p>
                <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed">
                  I'm a Computer Science student passionate about building clean, fast, and scalable web applications.
                  I built KUT.to to turn long links into short, shareable, and trackable URLs with a premium user experience.
                </p>

                {/* Info Chips */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center bg-white/10 rounded-full px-3 sm:px-4 py-2 border border-white/20">
                    <FaMapMarkerAlt className="text-purple-400 mr-2 text-sm" />
                    <span className="text-gray-200 text-xs sm:text-sm">Maharashtra, India</span>
                  </div>
                </div>

                {/* CTA Buttons - Mobile Only */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-row gap-1 lg:hidden justify-center"
                >
                  <motion.a
                    href="https://github.com/niranjan2201"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs flex-1"
                  >
                    <FaGithub className="mr-1" /> GitHub
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/niranjan-naik-691347307"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs flex-1"
                  >
                    <FaLinkedin className="mr-1" /> LinkedIn
                  </motion.a>
                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=naikniranjan300305@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs flex-1"
                  >
                    <FaEnvelope className="mr-1" /> Email
                  </motion.a>
                </motion.div>
              </div>

              {/* Profile Image and CTA Buttons - Desktop */}
              <div className="flex-shrink-0 flex flex-col items-center order-1 lg:order-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4 sm:mb-6"
                >
                  <img
                    src={profileImage}
                    alt="Niranjan Naik"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-purple-400/50 shadow-2xl shadow-purple-500/30"
                  />
                </motion.div>

                {/* CTA Buttons - Desktop Only */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="hidden lg:flex flex-col gap-2 sm:gap-3 w-full max-w-xs"
                >
                  <motion.a
                    href="https://github.com/niranjan2201"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs sm:text-sm"
                  >
                    <FaGithub className="mr-2" /> View My GitHub
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/niranjan-naik-691347307"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs sm:text-sm"
                  >
                    <FaLinkedin className="mr-2" /> Connect on LinkedIn
                  </motion.a>
                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=naikniranjan300305@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs sm:text-sm"
                  >
                    <FaEnvelope className="mr-2" /> Email Me
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Main Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/12 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto mb-10 sm:mb-12 shadow-2xl"
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              About KUT.to
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed">
              KUT.to is a modern URL shortener built to make long links clean, memorable, and easy to share.
              Whether you're a student, creator, marketer, or developer — KUT.to helps you manage links smarter and track performance with confidence.
            </p>
            <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed">
              From quick shortening to real-time insights, KUT.to is designed to keep your links fast, secure, and professional.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('features')
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }
              }}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Explore Features
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div id="features" className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-16 sm:pt-20 px-4 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.03, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-lg bg-white/8 border border-white/15 rounded-2xl p-4 sm:p-6 hover:bg-white/12 transition-all duration-200 hover:border-white/25 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <motion.div className="text-3xl text-violet-400 mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 sm:mt-32 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-10 sm:mb-14">
            Built with Modern Tech
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <TechCard name="React 18" desc="Frontend UI" color="text-cyan-400" border="hover:border-cyan-500/50" />
            <TechCard name="Tailwind CSS" desc="Styling Engine" color="text-sky-400" border="hover:border-sky-500/50" />
            <TechCard name="Spring Boot" desc="Backend API" color="text-green-400" border="hover:border-green-500/50" />
            <TechCard name="Java 21" desc="Core Logic" color="text-orange-400" border="hover:border-orange-500/50" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TechCard = ({ name, desc, color, border }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-white/5 border border-white/10 p-5 rounded-2xl text-center backdrop-blur-sm transition-all duration-300 ${border} hover:bg-white/10`}
  >
    <div className={`text-xl font-bold mb-1 ${color}`}>{name}</div>
    <div className="text-gray-400 text-sm">{desc}</div>
  </motion.div>
);

export default AboutPage;