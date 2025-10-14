import React from "react";
import { Helmet } from "react-helmet-async";
import {
  BarChart3,
  Home,
  Users,
  MessageSquare,
  Eye,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data - replace with actual data from your API
  const stats = {
    totalProperties: 42,
    pendingInquiries: 8,
    totalUsers: 156,
    newMessages: 12,
    monthlyViews: 2847,
    conversionRate: 4.2,
    activeListings: 38,
    revenue: 12500,
  };

  const recentActivities = [
    {
      id: 1,
      action: "New property listed",
      user: "John Doe",
      time: "2 min ago",
      type: "property",
    },
    {
      id: 2,
      action: "New user registered",
      user: "Sarah Wilson",
      time: "5 min ago",
      type: "user",
    },
    {
      id: 3,
      action: "Inquiry received",
      user: "Mike Johnson",
      time: "10 min ago",
      type: "inquiry",
    },
    {
      id: 4,
      action: "Property updated",
      user: "Admin",
      time: "15 min ago",
      type: "property",
    },
  ];

  const performanceMetrics = [
    { label: "Page Views", value: "2.8K", change: "+12%", positive: true },
    {
      label: "Conversion Rate",
      value: "4.2%",
      change: "+0.5%",
      positive: true,
    },
    { label: "Bounce Rate", value: "34%", change: "-2%", positive: true },
    { label: "Avg. Session", value: "4m 12s", change: "+30s", positive: true },
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    change,
    description,
    color = "blue",
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm flex items-center mt-1 ${
                change.positive ? "text-green-600" : "text-red-600"
              }`}>
              {change.positive ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              {change.value}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch (type) {
        case "property":
          return <Home size={16} className="text-blue-600" />;
        case "user":
          return <Users size={16} className="text-green-600" />;
        case "inquiry":
          return <MessageSquare size={16} className="text-purple-600" />;
        default:
          return <BarChart3 size={16} className="text-gray-600" />;
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0">{getIcon(activity.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {activity.action}
          </p>
          <p className="text-sm text-gray-500 truncate">by {activity.user}</p>
        </div>
        <div className="flex-shrink-0">
          <p className="text-xs text-gray-400">{activity.time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard | Admin Panel</title>
        <meta
          name="description"
          content="Admin dashboard overview with analytics and insights"
        />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your properties today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          icon={Home}
          change={{ value: "+3 this week", positive: true }}
          description="Active listings"
          color="blue"
        />
        <StatCard
          title="Pending Inquiries"
          value={stats.pendingInquiries}
          icon={MessageSquare}
          change={{ value: "+2 today", positive: false }}
          description="Require attention"
          color="orange"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          change={{ value: "+5 this month", positive: true }}
          description="Registered users"
          color="green"
        />
        <StatCard
          title="Monthly Views"
          value={stats.monthlyViews.toLocaleString()}
          icon={Eye}
          change={{ value: "+12%", positive: true }}
          description="Property views"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Performance Metrics
              </h2>
              <TrendingUp size={20} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
                  <p
                    className={`text-xs mt-1 flex items-center justify-center ${
                      metric.positive ? "text-green-600" : "text-red-600"
                    }`}>
                    {metric.positive ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {metric.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
            <Home className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-700">
              Add Property
            </span>
          </button>
          <button className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-100">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700">
              Manage Users
            </span>
          </button>
          <button className="p-4 text-center bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border border-orange-100">
            <MessageSquare className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-orange-700">
              View Inquiries
            </span>
          </button>
          <button className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-100">
            <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-700">
              Analytics
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
