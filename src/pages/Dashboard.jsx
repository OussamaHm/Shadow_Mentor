import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  BarChart3,
  UserPlus,
  Activity,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeEmployees, setActiveEmployees] = useState(60);
  const [integrationTime, setIntegrationTime] = useState(10);
  const [successRate, setSuccessRate] = useState(95);
  const [gapsDetected, setGapsDetected] = useState(12);
  const [liveActivity, setLiveActivity] = useState([]);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);

      // Random small fluctuations to simulate real-time changes
      if (Math.random() > 0.7) {
        setActiveEmployees((prev) => prev + (Math.random() > 0.5 ? 1 : 0));
      }
      if (Math.random() > 0.8) {
        setSuccessRate((prev) =>
          Math.min(100, prev + (Math.random() > 0.5 ? 0.1 : -0.1))
        );
      }
      if (Math.random() > 0.85) {
        setGapsDetected((prev) =>
          Math.max(0, prev + (Math.random() > 0.6 ? -1 : 1))
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate live activity feed
  useEffect(() => {
    const activities = [
      "Emma Johnson completed onboarding task",
      "New employee Liam O'Connor added to system",
      "Sofia Martins passed certification test",
      "Integration gap resolved for Adam Keller",
      "Noah Yamamoto scheduled 1:1 meeting",
      "Maya Benali accessed code repository",
      "Chloe Ivanova completed security training",
      "Ethan Delgado enrolled in blockchain course",
    ];

    const activityInterval = setInterval(() => {
      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];
      const timestamp = new Date().toLocaleTimeString();

      setLiveActivity((prev) => [
        { text: randomActivity, time: timestamp, id: Date.now() },
        ...prev.slice(0, 4), // Keep only last 5 activities
      ]);
    }, 8000);

    return () => clearInterval(activityInterval);
  }, []);

  const onboardingData = [
    { name: "Week 1", completed: 45, pending: 15 },
    { name: "Week 2", completed: 55, pending: 10 },
    { name: "Week 3", completed: 70, pending: 8 },
    { name: "Week 4", completed: 85, pending: 5 },
  ];

  const roleDistribution = [
    { name: "Software Engineer", value: 25, color: "#3B82F6" },
    { name: "Data Scientist", value: 15, color: "#8B5CF6" },
    { name: "HR Manager", value: 8, color: "#F59E0B" },
    { name: "DevOps", value: 12, color: "#10B981" },
  ];

  const recentEmployees = [
    {
      id: 1,
      name: "Karim Boujida",
      role: "Software Engineer",
      level: "Senior",
      status: "On Track",
      progress: 85,
      hireDate: "2024-11-01",
    },
    {
      id: 2,
      name: "Emma Johnson",
      role: "Data Scientist",
      level: "Junior",
      status: "Needs Attention",
      progress: 45,
      hireDate: "2024-11-05",
    },
    {
      id: 3,
      name: "Santiago Lopez",
      role: "HR Manager",
      level: "Senior",
      status: "On Track",
      progress: 90,
      hireDate: "2024-10-28",
    },
    {
      id: 4,
      name: "Ananya Gupta",
      role: "DevOps Engineer",
      level: "Junior",
      status: "On Track",
      progress: 70,
      hireDate: "2024-11-10",
    },
  ];

  const integrationGaps = [
    {
      employee: "Emma Johnson",
      issue: "No 1:1 with manager in 10 days",
      priority: "High",
      action: "Meeting scheduled",
    },
    {
      employee: "Rohan Singh",
      issue: "401k not configured",
      priority: "Medium",
      action: "Slack reminder sent",
    },
    {
      employee: "Diana Vargas",
      issue: "Code repository not accessed",
      priority: "High",
      action: "Setup guide sent",
    },
  ];

  const stats = [
    {
      title: "Active Employees",
      value: activeEmployees.toString(),
      change: "+8 this month",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      trend: "up",
    },
    {
      title: "Avg. Integration Time",
      value: `${integrationTime} Days`,
      change: "-2 days from last month",
      icon: <Clock className="w-8 h-8" />,
      color: "from-primary to-orange-600",
      trend: "down",
    },
    {
      title: "Success Rate",
      value: `${successRate.toFixed(1)}%`,
      change: "+5% improvement",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      trend: "up",
    },
    {
      title: "Gaps Detected",
      value: gapsDetected.toString(),
      change: "3 resolved today",
      icon: <AlertCircle className="w-8 h-8" />,
      color: "from-red-500 to-rose-500",
      trend: "neutral",
    },
  ];

  const sidebarItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      active: true,
      path: "/dashboard",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Employees",
      active: false,
      path: "/employees",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Analytics",
      active: false,
      path: "/analytics",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Schedule",
      active: false,
      path: "/schedule",
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "Certifications",
      active: false,
      path: "/certifications",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      active: false,
      path: "/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar - Enhanced Dark Styling */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-black via-gray-950 to-black border-r border-primary/20 shadow-2xl shadow-primary/10 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo with glow effect */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/20">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img
                  src="/Shadow Mentor Logo.png"
                  alt="Shadow Mentor Logo"
                  className="w-20 h-20 object-contain flex-shrink-0 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(251,146,60,0.8)] transition-all"
                />
              </div>
              {sidebarOpen && (
                <span className="text-lg font-bold whitespace-nowrap bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  ShadowMentor
                </span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-primary transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation with enhanced active states */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-300 group relative overflow-hidden ${
                  item.active
                    ? "bg-gradient-to-r from-primary to-orange-600 text-black font-semibold border-primary shadow-lg shadow-primary/50"
                    : "bg-gray-900/50 text-gray-400 hover:text-white border-transparent hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-orange-600/20"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${
                    item.active ? "hidden" : ""
                  }`}
                ></div>
                <span
                  className={`relative z-10 ${
                    item.active ? "" : "group-hover:text-primary"
                  } transition-colors`}
                >
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile with enhanced styling */}
          <div className="border-t border-primary/20 pt-4 mt-4">
            <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-950/50 to-pink-950/50 rounded-lg border border-purple-800/30">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-sm font-bold">HR</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <div className="text-sm font-semibold">HR Admin</div>
                  <div className="text-xs text-gray-400">admin@company.com</div>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 mt-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-900/30 hover:border-red-600/50 text-gray-400 hover:text-red-400 transition-all duration-300 group"
              >
                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Back to Home</span>
              </Link>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="glass-card border-b border-white/10 sticky top-0 z-40">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">
                  Monitor your team's onboarding progress in real-time
                </p>
              </div>
              <button className="btn-primary flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Live Activity Banner */}
          <AnimatePresence>
            {liveActivity.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-4 border border-primary/30 bg-primary/5"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">
                      {liveActivity[0]?.text}
                    </p>
                    <p className="text-xs text-gray-400">
                      {liveActivity[0]?.time}
                    </p>
                  </div>
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Grid with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`glass-card p-6 border transition-all duration-300 hover:shadow-xl ${
                  index === 0
                    ? "border-blue-900/30 hover:border-blue-500/50 hover:shadow-blue-500/20"
                    : index === 1
                    ? "border-green-900/30 hover:border-green-500/50 hover:shadow-green-500/20"
                    : index === 2
                    ? "border-purple-900/30 hover:border-purple-500/50 hover:shadow-purple-500/20"
                    : "border-orange-900/30 hover:border-orange-500/50 hover:shadow-orange-500/20"
                } ${
                  pulseAnimation && index === 0 ? "ring-2 ring-primary/50" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: pulseAnimation && index === 0 ? 1.02 : 1,
                }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center relative`}
                  >
                    {stat.icon}
                    {pulseAnimation && index === 0 && (
                      <span className="absolute inset-0 bg-primary/20 rounded-xl animate-ping"></span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      stat.trend === "up"
                        ? "bg-green-500/20 text-green-500"
                        : stat.trend === "down"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <motion.h3
                  className="text-3xl font-bold mb-2"
                  animate={{
                    scale: pulseAnimation && index === 0 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row with enhanced styling */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Onboarding Progress */}
            <motion.div
              className="glass-card p-6 border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-cyan-400" />
                Onboarding Progress
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={onboardingData}>
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    fill="#10B981"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Role Distribution */}
            <motion.div
              className="glass-card p-6 border border-pink-900/30 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-pink-400" />
                Role Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Integration Gaps Alert with enhanced styling */}
          <motion.div
            className="glass-card p-6 border border-red-900/50 hover:border-red-500/70 transition-all duration-300 bg-red-950/20 hover:shadow-lg hover:shadow-red-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center text-red-400">
              <AlertCircle className="w-6 h-6 mr-2" />
              Integration Gaps Detected
            </h2>
            <div className="space-y-3">
              {integrationGaps.map((gap, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-dark-tertiary rounded-xl"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{gap.employee}</div>
                    <div className="text-sm text-gray-400">{gap.issue}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        gap.priority === "High"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {gap.priority}
                    </span>
                    <span className="text-sm text-green-500 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {gap.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Employees */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Users className="w-6 h-6 mr-2 text-primary" />
                Recent New Hires
              </h2>
              <button className="text-primary hover:text-primary-dark transition flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Level
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Hire Date
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-white/5 hover:bg-dark-tertiary/50 transition"
                    >
                      <td className="py-4 px-4 font-semibold">
                        {employee.name}
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        {employee.role}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.level === "Senior"
                              ? "bg-purple-500/20 text-purple-500"
                              : "bg-blue-500/20 text-blue-500"
                          }`}
                        >
                          {employee.level}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        {employee.hireDate}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-dark-tertiary rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-gradient-to-r from-primary to-orange-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${employee.progress}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            ></motion.div>
                          </div>
                          <span className="text-sm font-semibold">
                            {employee.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.status === "On Track"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Activity className="w-6 h-6 mr-2 text-primary" />
                Live Activity Feed
              </h2>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-400">Real-time updates</span>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {liveActivity.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Waiting for activity updates...</p>
                  </motion.div>
                ) : (
                  liveActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="flex items-center space-x-3 p-3 bg-dark-lighter rounded-lg border border-gray-700/50 hover:border-primary/50 transition"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.text}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
