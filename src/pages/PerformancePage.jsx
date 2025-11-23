import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Activity,
  ArrowLeft,
  Star,
  Zap,
} from "lucide-react";

const PerformancePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  const performance = {
    score: 87,
    initialProject: {
      tasksCompleted: 8,
      totalTasks: 12,
      retakes: 1,
    },
    testsPassed: 15,
    testsRequired: 20,
  };

  const employeeInfo = {
    name: user.name,
    role: user.role,
    level: user.level,
    _id: user.id,
    email: user.email,
    contract_type: "Full-time",
    country_of_birth: "United States",
    gender: "Male",
    hire_date: "2024-11-01",
    length_of_service_days: 22,
    salary: "$85,000",
  };

  const salaryInsight = {
    current: employeeInfo.salary,
    projection: "$95,000",
    increase: "+$10,000",
    percentage: "+11.8%",
    nextCertificate: "Advanced Certification",
  };

  const performanceMetrics = [
    {
      label: "Code Quality",
      score: 92,
      color: "from-blue-500 to-cyan-500",
      icon: <Star className="w-5 h-5" />,
    },
    {
      label: "Task Completion",
      score: 85,
      color: "from-green-500 to-emerald-500",
      icon: <Target className="w-5 h-5" />,
    },
    {
      label: "Collaboration",
      score: 90,
      color: "from-purple-500 to-pink-500",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "Innovation",
      score: 78,
      color: "from-orange-500 to-red-500",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/employee-dashboard"
            className="inline-flex items-center text-primary hover:text-orange-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            Performance <span className="gradient-text">Tracking</span>
          </h1>
          <p className="text-gray-400">
            Monitor your progress and achievements
          </p>
        </div>

        {/* Overall Performance Score */}
        <motion.div
          className="glass-card p-8 mb-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                Overall Performance Score
              </h3>
              <p className="text-gray-400">
                Based on all metrics and activities
              </p>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-800"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 56 * (1 - performance.score / 100)
                    }`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {performance.score}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Excellent Performance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} text-white`}
                >
                  {metric.icon}
                </div>
                <span className="text-2xl font-bold text-white">
                  {metric.score}
                </span>
              </div>
              <h4 className="text-gray-400 text-sm mb-2">{metric.label}</h4>
              <div className="w-full bg-dark-lighter rounded-full h-2">
                <motion.div
                  className={`bg-gradient-to-r ${metric.color} rounded-full h-2`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Progress */}
          <motion.div
            className="glass-card p-8 border border-green-900/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-green-400" />
              Project Progress
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Initial Project Tasks</span>
                  <span className="text-white font-semibold">
                    {performance.initialProject.tasksCompleted}/
                    {performance.initialProject.totalTasks}
                  </span>
                </div>
                <div className="w-full bg-dark-lighter rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-orange-600 rounded-full h-3 transition-all"
                    style={{
                      width: `${
                        (performance.initialProject.tasksCompleted /
                          performance.initialProject.totalTasks) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Tests Passed</span>
                  <span className="text-white font-semibold">
                    {performance.testsPassed}/{performance.testsRequired}
                  </span>
                </div>
                <div className="w-full bg-dark-lighter rounded-full h-3">
                  <div
                    className="bg-green-500 rounded-full h-3 transition-all"
                    style={{
                      width: `${
                        (performance.testsPassed / performance.testsRequired) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between p-4 bg-gray-900/50 rounded-lg">
                  <span className="text-gray-400">Retakes Used:</span>
                  <span className="text-white font-semibold">
                    {performance.initialProject.retakes}/3
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Salary Insight */}
          <motion.div
            className="glass-card p-8 border border-emerald-900/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" />
              Salary Insight
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-2">Current Salary</p>
                <p className="text-3xl font-bold text-white">
                  {salaryInsight.current}
                </p>
              </div>
              <div className="bg-gradient-to-r from-primary/20 to-orange-600/20 border border-primary/30 rounded-lg p-6">
                <p className="text-sm text-gray-300 mb-2">
                  Projected After Certification
                </p>
                <p className="text-3xl font-bold text-primary">
                  {salaryInsight.projection}
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  Complete{" "}
                  <span className="text-white font-medium">
                    {salaryInsight.nextCertificate}
                  </span>{" "}
                  to unlock
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/20">
                  <span className="text-sm text-gray-400">
                    Potential Increase:
                  </span>
                  <span className="text-green-400 font-bold text-lg">
                    {salaryInsight.increase} ({salaryInsight.percentage})
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievement Badges */}
        <motion.div
          className="mt-8 glass-card p-8 border border-yellow-900/30 hover:border-yellow-500/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-yellow-400" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-6 rounded-lg border border-yellow-500/30 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white text-center mb-2">
                Quick Learner
              </h4>
              <p className="text-gray-400 text-sm text-center">
                Completed first week ahead of schedule
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-blue-500/30 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white text-center mb-2">
                Team Player
              </h4>
              <p className="text-gray-400 text-sm text-center">
                Excellent collaboration in first project
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-lg border border-green-500/30 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white text-center mb-2">
                Fast Starter
              </h4>
              <p className="text-gray-400 text-sm text-center">
                Environment setup in record time
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformancePage;
