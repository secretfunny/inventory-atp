import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  FileText, 
  Wrench, 
  AlertTriangle, 
  ClipboardCheck,
  BarChart2, 
  Settings,
  Bell,
  Search,
  Menu,
  User,
  LogOut
} from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventaris', href: '/dashboard/inventaris', icon: Box },
    { name: 'Pengajuan', href: '/dashboard/pengajuan', icon: FileText },
    { name: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench },
    { name: 'Incident Report', href: '/dashboard/incident', icon: AlertTriangle },
    { name: 'Audit Stock Opname', href: '/dashboard/audit', icon: ClipboardCheck },
    { name: 'Laporan', href: '/dashboard/laporan', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-xl w-64 flex-shrink-0 z-20 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full fixed h-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 bg-brand-dark text-white border-b border-brand-dark/20">
            <Box size={24} className="mr-3 text-white" />
            <span className="font-bold text-lg tracking-wide hidden sm:block">PT. Arvian</span>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#013b82] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  window.location.pathname === item.href ? 'text-[#013b82]' : 'text-slate-400'
                }`} />
                {item.name}
              </NavLink>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-lg p-3 text-sm">
               <p className="font-semibold text-slate-700">Need Help?</p>
               <p className="text-slate-500 text-xs mt-1">Check our documentation</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <div className="ml-4 truncate lg:ml-6 flex items-center">
              <h2 className="text-xl font-bold text-slate-800">IT Inventory System</h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 bg-slate-100 border-none rounded-full py-1.5 focus:ring-2 focus:ring-brand-dark/50 text-sm w-48 transition-all focus:w-64"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-slate-500 rounded-full hover:bg-slate-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-[#013b82] text-white flex items-center justify-center font-semibold text-sm">
                  AR
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-700 leading-none">Admin User</p>
                  <p className="text-xs text-slate-500 mt-1">IT Admin</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-slate-100">
                  <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                     <p className="text-sm font-medium text-slate-900">Admin User</p>
                     <p className="text-xs text-slate-500 truncate">admin@arviantigaputra.com</p>
                  </div>
                  <a href="#" className="flex px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 items-center">
                    <User className="mr-2 h-4 w-4 text-slate-400" /> Profile
                  </a>
                  <a href="#" className="flex px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 items-center">
                    <Settings className="mr-2 h-4 w-4 text-slate-400" /> Settings
                  </a>
                  <button 
                    onClick={() => navigate('/')}
                    className="flex w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-400" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
