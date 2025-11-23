import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Users, Video } from "lucide-react";

const Schedule = () => {
  const upcomingMeetings = [
    {
      id: 1,
      title: "1:1 with Emma Johnson",
      time: "10:00 AM",
      duration: "30 min",
      type: "Check-in",
      employee: "Emma Johnson",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Team Onboarding Review",
      time: "2:00 PM",
      duration: "1 hour",
      type: "Team Meeting",
      employee: "Multiple",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Certification Workshop",
      time: "4:00 PM",
      duration: "2 hours",
      type: "Training",
      employee: "All Junior Devs",
      status: "scheduled",
    },
    {
      id: 4,
      title: "1:1 with Santiago Lopez",
      time: "Tomorrow 9:00 AM",
      duration: "30 min",
      type: "Check-in",
      employee: "Santiago Lopez",
      status: "pending",
    },
    {
      id: 5,
      title: "Q&A Session",
      time: "Tomorrow 3:00 PM",
      duration: "1 hour",
      type: "Group",
      employee: "New Hires",
      status: "pending",
    },
  ];

  const todayTasks = [
    {
      id: 1,
      task: "Send welcome email to new hire",
      priority: "High",
      due: "11:00 AM",
      completed: true,
    },
    {
      id: 2,
      task: "Review certification progress reports",
      priority: "Medium",
      due: "1:00 PM",
      completed: false,
    },
    {
      id: 3,
      task: "Ghost-book meeting for Emma",
      priority: "High",
      due: "3:00 PM",
      completed: false,
    },
    {
      id: 4,
      task: "Update onboarding checklist",
      priority: "Low",
      due: "5:00 PM",
      completed: false,
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
          <h1 className="text-4xl font-bold mb-2">Schedule & Tasks</h1>
          <p className="text-gray-400">Manage meetings and daily activities</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Meetings */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary" />
                Upcoming Meetings
              </h2>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <motion.div
                    key={meeting.id}
                    className="bg-dark-secondary border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold mb-2">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {meeting.time}
                          </span>
                          <span>{meeting.duration}</span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {meeting.employee}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            meeting.type === "Check-in"
                              ? "bg-blue-500/20 text-blue-500"
                              : meeting.type === "Training"
                              ? "bg-purple-500/20 text-purple-500"
                              : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {meeting.type}
                        </span>
                        {meeting.status === "scheduled" && (
                          <Video className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Today's Tasks */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Today's Tasks</h2>
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all ${
                      task.completed
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-dark-secondary border-white/10 hover:border-primary/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="w-5 h-5 rounded border-2 border-primary"
                        readOnly
                      />
                      <div className="flex-1">
                        <p
                          className={`font-semibold ${
                            task.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {task.task}
                        </p>
                        <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Due {task.due}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Panel - Quick Stats */}
          <div className="space-y-6">
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-bold mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Meetings</span>
                  <span className="text-2xl font-bold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Ghost-Booked</span>
                  <span className="text-2xl font-bold text-primary">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completed Tasks</span>
                  <span className="text-2xl font-bold text-green-500">45</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary text-sm py-2">
                  Schedule New Meeting
                </button>
                <button className="w-full btn-secondary text-sm py-2">
                  Add Task
                </button>
                <button className="w-full btn-secondary text-sm py-2">
                  View Calendar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
