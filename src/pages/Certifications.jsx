import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";

const Certifications = () => {
  const certificationPaths = [
    {
      role: "Software Engineer",
      certs: ["AWS Developer Associate", "Microsoft AZ-204", "Oracle Java SE"],
      enrolled: 15,
      completed: 8,
      avgTime: "3-6 months",
      difficulty: "Medium",
    },
    {
      role: "Data Scientist",
      certs: ["IBM Data Science", "Google Data Analytics", "AWS ML Specialty"],
      enrolled: 10,
      completed: 5,
      avgTime: "4-8 months",
      difficulty: "High",
    },
    {
      role: "HR Manager",
      certs: ["SHRM-CP", "PHR", "CIPD Level 5"],
      enrolled: 6,
      completed: 4,
      avgTime: "2-4 months",
      difficulty: "Medium",
    },
    {
      role: "DevOps Engineer",
      certs: ["AWS DevOps Pro", "Kubernetes CKA", "Docker Certified"],
      enrolled: 8,
      completed: 4,
      avgTime: "4-7 months",
      difficulty: "High",
    },
  ];

  const recentCompletions = [
    {
      employee: "Karim Boujida",
      cert: "AWS Developer Associate",
      date: "Nov 20, 2025",
      score: "95%",
    },
    {
      employee: "Santiago Lopez",
      cert: "SHRM-CP",
      date: "Nov 18, 2025",
      score: "88%",
    },
    {
      employee: "Mohammed Benali",
      cert: "Oracle Java SE",
      date: "Nov 15, 2025",
      score: "92%",
    },
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
          <h1 className="text-4xl font-bold mb-2">Certification Roadmaps</h1>
          <p className="text-gray-400">
            Track employee learning paths and achievements
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Enrolled",
              value: "39",
              icon: <Users className="w-6 h-6" />,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Completed",
              value: "21",
              icon: <CheckCircle className="w-6 h-6" />,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "In Progress",
              value: "18",
              icon: <TrendingUp className="w-6 h-6" />,
              color: "from-primary to-orange-600",
            },
            {
              title: "Avg Duration",
              value: "4.2 mo",
              icon: <Clock className="w-6 h-6" />,
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
              <p className="text-sm text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Paths */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            Certification Paths by Role
          </h2>
          <div className="space-y-4">
            {certificationPaths.map((path, index) => (
              <motion.div
                key={index}
                className="bg-dark-secondary border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{path.role}</h3>
                    <div className="flex flex-wrap gap-2">
                      {path.certs.map((cert, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      path.difficulty === "High"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {path.difficulty}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg">
                    <span className="text-sm text-gray-400">Enrolled</span>
                    <span className="text-xl font-bold text-blue-500">
                      {path.enrolled}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg">
                    <span className="text-sm text-gray-400">Completed</span>
                    <span className="text-xl font-bold text-green-500">
                      {path.completed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg">
                    <span className="text-sm text-gray-400">Avg Time</span>
                    <span className="text-xl font-bold text-primary">
                      {path.avgTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Completions */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-primary" />
            Recent Completions
          </h2>
          <div className="space-y-3">
            {recentCompletions.map((completion, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 bg-dark-secondary border border-white/10 rounded-xl hover:border-green-500/50 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{completion.employee}</h3>
                    <p className="text-sm text-gray-400">{completion.cert}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{completion.date}</div>
                  <div className="text-lg font-bold text-green-500">
                    {completion.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;
