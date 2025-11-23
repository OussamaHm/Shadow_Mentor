import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Users, Clock, Award } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", employees: 45, completed: 40, success: 88 },
    { month: "Feb", employees: 48, completed: 45, success: 93 },
    { month: "Mar", employees: 52, completed: 48, success: 92 },
    { month: "Apr", employees: 55, completed: 52, success: 94 },
    { month: "May", employees: 58, completed: 55, success: 94 },
    { month: "Jun", employees: 60, completed: 57, success: 95 },
  ];

  const rolePerformance = [
    { role: "Software Engineer", avgTime: 8, successRate: 96 },
    { role: "Data Scientist", avgTime: 12, successRate: 91 },
    { role: "HR Manager", avgTime: 6, successRate: 98 },
    { role: "DevOps", avgTime: 10, successRate: 93 },
  ];

  const weeklyActivity = [
    { day: "Mon", meetings: 12, tasks: 45, completions: 38 },
    { day: "Tue", meetings: 15, tasks: 52, completions: 46 },
    { day: "Wed", meetings: 18, tasks: 48, completions: 42 },
    { day: "Thu", meetings: 14, tasks: 55, completions: 51 },
    { day: "Fri", meetings: 10, tasks: 42, completions: 40 },
  ];

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-400">
            Deep dive into onboarding metrics and trends
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Avg Success Rate",
              value: "94.5%",
              change: "+2.3%",
              icon: <TrendingUp className="w-6 h-6" />,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Total Onboarded",
              value: "257",
              change: "+18",
              icon: <Users className="w-6 h-6" />,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Avg Integration",
              value: "9.2 Days",
              change: "-1.8d",
              icon: <Clock className="w-6 h-6" />,
              color: "from-primary to-orange-600",
            },
            {
              title: "Certifications",
              value: "342",
              change: "+45",
              icon: <Award className="w-6 h-6" />,
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}
              >
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
              <span className="text-xs text-green-500 font-semibold">
                {stat.change}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Growth Trend */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-6">6-Month Growth Trend</h2>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="colorEmployees"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorCompleted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="employees"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorEmployees)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Role Performance */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6">Performance by Role</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={rolePerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis
                    dataKey="role"
                    stroke="#666"
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
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
                    dataKey="avgTime"
                    fill="#F59E0B"
                    radius={[8, 8, 0, 0]}
                    name="Avg Days"
                  />
                  <Bar
                    dataKey="successRate"
                    fill="#10B981"
                    radius={[8, 8, 0, 0]}
                    name="Success %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-6">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="meetings"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#F59E0B"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
