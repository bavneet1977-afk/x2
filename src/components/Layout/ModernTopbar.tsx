import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

const ModernTopbar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentGradient, setCurrentGradient] = useState("from-blue-500 to-purple-500");

  useEffect(() => {
    // Example: rotate gradients every 5 seconds
    const gradients = [
      "from-blue-500 to-purple-500",
      "from-green-400 to-blue-600",
      "from-pink-500 to-yellow-500",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % gradients.length;
      setCurrentGradient(gradients[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center space-x-2">
          <HomeIcon className="h-6 w-6 text-gray-600" />
          <span
            className={`text-lg font-bold bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}
          >
            My App
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <UserIcon className="h-6 w-6 text-gray-600" />
              <span className="text-sm text-gray-700">{user.name}</span>
            </div>
          ) : (
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Login
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          id="mobile-sidebar"
          className="fixed inset-0 z-40 bg-white shadow-lg p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <span className="text-lg font-bold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <XIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-4 space-y-3">
            <a href="/" className="block text-gray-700 hover:text-gray-900">
              Home
            </a>
            <a href="/profile" className="block text-gray-700 hover:text-gray-900">
              Profile
            </a>
            <a href="/settings" className="block text-gray-700 hover:text-gray-900">
              Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default ModernTopbar;
