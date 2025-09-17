import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

interface ModernSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen
}) => {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, roles: ['student', 'faculty', 'admin'] },
    { id: 'attendance', label: 'Attendance', icon: ClipboardDocumentCheckIcon, roles: ['student', 'faculty', 'admin'] },
    { id: 'classes', label: 'Classes', icon: CalendarIcon, roles: ['faculty', 'admin'] },
    { id: 'students', label: 'Students', icon: UserGroupIcon, roles: ['faculty', 'admin'] },
    { id: 'faculty', label: 'Faculty', icon: AcademicCapIcon, roles: ['admin'] },
    { id: 'reports', label: 'Reports', icon: DocumentTextIcon, roles: ['faculty', 'admin'] },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon, roles: ['faculty', 'admin'] },
    { id: 'settings', label: 'Settings', icon: CogIcon, roles: ['student', 'faculty', 'admin'] }
  ];

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false); // Close mobile menu after navigation
  };

  // Handle keyboard navigation and body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, setIsOpen]);

  // Handle keyboard navigation and body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 opacity-100"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`
            <span className={\`text-lg font-bold bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
      `}
      role="dialog"
      aria-modal={isOpen ? "true" : "false"}
      id="mobile-sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Attendify" className="w-10 h-10 rounded-xl" />
            <div>
              <h2 className={`text-xl font-bold bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
                Attendify
              </h2>
              <p className="text-xs text-gray-500 capitalize">{user?.role} Portal</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-all duration-200"
            aria-label="Close navigation menu"
          >
            <XMarkIcon className="w-6 h-6 text-white lg:text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 bg-gradient-to-br ${currentGradient} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-semibold text-lg">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="font-semibold text-white lg:text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-300 lg:text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-r ${currentGradient} text-white shadow-lg`
                        : 'text-white lg:text-gray-600 hover:bg-white/20 lg:hover:bg-gray-100 hover:text-white lg:hover:text-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium text-red-400 lg:text-red-600 hover:bg-red-500/20 lg:hover:bg-red-50 transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ModernSidebar;