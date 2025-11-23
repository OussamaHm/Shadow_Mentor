import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Download, UserPlus } from "lucide-react";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const employees = [
    {
      id: 1,
      name: "Karim Boujida",
      role: "Software Engineer",
      level: "Senior",
      status: "On Track",
      progress: 85,
      email: "karim.boujida@shadowmentor.com",
    },
    {
      id: 2,
      name: "Emma Johnson",
      role: "Data Scientist",
      level: "Junior",
      status: "Needs Attention",
      progress: 45,
      email: "emma.johnson@shadowmentor.com",
    },
    {
      id: 3,
      name: "Santiago Lopez",
      role: "HR Manager",
      level: "Senior",
      status: "On Track",
      progress: 90,
      email: "santiago.lopez@shadowmentor.com",
    },
    {
      id: 4,
      name: "Ananya Gupta",
      role: "DevOps Engineer",
      level: "Junior",
      status: "On Track",
      progress: 70,
      email: "ananya.gupta@shadowmentor.com",
    },
    {
      id: 5,
      name: "Mohammed Benali",
      role: "Software Engineer",
      level: "Senior",
      status: "On Track",
      progress: 95,
      email: "mohammed.benali@shadowmentor.com",
    },
    {
      id: 6,
      name: "Priya Sharma",
      role: "Data Scientist",
      level: "Junior",
      status: "On Track",
      progress: 65,
      email: "priya.sharma@shadowmentor.com",
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRole === "all" || emp.role === filterRole;
    return matchesSearch && matchesFilter;
  });

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

        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Employees</h1>
              <p className="text-gray-400">
                Manage and view all employee profiles
              </p>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Add Employee</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-tertiary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-dark-tertiary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
            >
              <option value="all">All Roles</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="HR Manager">HR Manager</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>

          {/* Employee Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-secondary border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{employee.name}</h3>
                    <p className="text-sm text-gray-400">{employee.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Level</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.level === "Senior"
                          ? "bg-purple-500/20 text-purple-500"
                          : "bg-blue-500/20 text-blue-500"
                      }`}
                    >
                      {employee.level}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === "On Track"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-semibold">
                        {employee.progress}%
                      </span>
                    </div>
                    <div className="bg-dark-tertiary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${employee.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">{employee.email}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No employees found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
