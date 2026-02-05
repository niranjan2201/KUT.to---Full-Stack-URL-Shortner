import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-40 bg-gray-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white tracking-wide mb-4">
              KUT.to
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Simplifying URL shortening for efficient sharing. Join thousands of users managing their links with ease.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com/niranjan2201" icon={<FaGithub />} />
              <SocialLink href="https://linkedin.com/in/niranjan-naik-691347307" icon={<FaLinkedin />} />
              <SocialLink href="mailto:naikniranjan300305@gmail.com" icon={<FaEnvelope />} />
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="/">Features</FooterLink>
              <FooterLink href="/dashboard">Analytics</FooterLink>
              <FooterLink href="/register">Get Started</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Community</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-left">
            &copy; {new Date().getFullYear()} KUT.to. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1"
  >
    {React.cloneElement(icon, { className: "w-5 h-5" })}
  </a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
      {children}
    </a>
  </li>
);

export default Footer;
