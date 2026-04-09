import React from 'react';
import { BarChart3, Users, Box, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Inventaris', value: '1,245', icon: Box, change: '+12%', color: 'blue' },
    { title: 'Active Users', value: '84', icon: Users, change: '+4.5%', color: 'green' },
    { title: 'Pending Maintenance', value: '12', icon: TrendingUp, change: '-2.1%', color: 'yellow' },
    { title: 'Monthly Reports', value: '45', icon: BarChart3, change: '+8%', color: 'purple' },
  ];

  const getColorClasses = (color) => {
    const classes = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your IT Inventory System</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center">
            <div className={`p-4 rounded-lg bg-opacity-50 ${getColorClasses(stat.color)} mr-4`}>
               <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <div className="flex items-baseline space-x-2 mt-1">
                 <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                 <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                   {stat.change}
                 </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <Box size={48} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-700">No recent activity</h3>
        <p className="text-slate-500 mt-1 max-w-sm">The dashboard content is ready to be populated with real data from Firebase.</p>
      </div>
    </div>
  );
}
