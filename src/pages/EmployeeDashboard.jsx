import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Menu,
  X,
  Home,
  Calendar,
  Award,
  TrendingUp,
  LogOut,
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  Activity,
  FileText,
  ExternalLink,
  AlertTriangle,
  Zap,
  BarChart3,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  employeeApi,
  certificationApi,
  performanceApi,
  schedulingApi,
} from "../utils/watsonApi";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [activeScheduling, setActiveScheduling] = useState(true);
  const [loading, setLoading] = useState(true);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [initialProject, setInitialProject] = useState(null);
  const [certificationData, setCertificationData] = useState(null);
  const [salaryInsight, setSalaryInsight] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [predictiveClock, setPredictiveClock] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadEmployeeData(parsedUser);
    } else {
      // Redirect to login if no user
      navigate("/login");
    }
  }, [navigate]);

  const loadEmployeeData = async (userData) => {
    try {
      setLoading(true);
      const employeeId = userData.id || "EMP001";

      // Load all data in parallel
      const [
        empInfo,
        project,
        certRoadmap,
        perfData,
        projectMonitoring,
        testStatus,
        tasks,
        meetings,
        clock,
      ] = await Promise.all([
        employeeApi.getEmployee(employeeId).catch(() => null),
        employeeApi.getInitialProject(employeeId).catch(() => null),
        certificationApi.getRoadmap(userData.role || "Software Engineer").catch(() => null),
        performanceApi.getPerformance(employeeId).catch(() => null),
        performanceApi.getProjectMonitoring(employeeId).catch(() => null),
        performanceApi.getTestStatus(employeeId).catch(() => null),
        schedulingApi.getTasks(employeeId).catch(() => null),
        schedulingApi.getMeetings(employeeId).catch(() => null),
        schedulingApi.getPredictiveClock(employeeId).catch(() => null),
      ]);

      // Set employee info
      if (empInfo) {
        setEmployeeInfo(empInfo.raw_response ? {
          _id: employeeId,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          level: userData.level || "Junior",
          ...empInfo,
        } : empInfo);
      } else {
        // Fallback to default
        setEmployeeInfo({
          _id: employeeId,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          level: userData.level || "Junior",
          contract_type: "Full-time",
          country_of_birth: "USA",
          gender: "Not Specified",
          hire_date: "2024-11-01",
          length_of_service_days: Math.floor(
            (new Date() - new Date("2024-11-01")) / (1000 * 60 * 60 * 24)
          ),
          salary: "$75,000",
        });
      }

      // Set initial project
      if (project) {
        setInitialProject(project.raw_response ? null : project);
      }

      // Set certification data
      if (certRoadmap) {
        setCertificationData(certRoadmap.raw_response ? null : certRoadmap);
      }

      // Get salary insight if certification data exists
      if (certRoadmap && !certRoadmap.raw_response && certRoadmap.certifications?.length > 0) {
        const firstCert = certRoadmap.certifications[0].name;
        const insight = await certificationApi.getSalaryInsight(employeeId, firstCert).catch(() => null);
        if (insight && !insight.raw_response) {
          setSalaryInsight(insight);
        }
      }

      // Set performance data
      if (perfData || projectMonitoring || testStatus) {
        setPerformance({
          score: perfData?.score || 85,
          initialProject: projectMonitoring || {
            status: "In Progress",
            tasksCompleted: 8,
            totalTasks: 25,
            retakes: 0,
          },
          testsPassed: testStatus?.tests_passed || 1,
          testsRequired: testStatus?.tests_required || 3,
        });
      }

      // Set scheduling data
      if (tasks && !tasks.raw_response && tasks.tasks) {
        setDailyTasks(tasks.tasks.map(t => ({
          task: t.description || t.name || t.task,
          completed: t.status === "completed" || t.completed,
        })));
      }

      if (meetings && !meetings.raw_response && meetings.meetings) {
        setScheduledMeetings(meetings.meetings);
      }

      if (clock && !clock.raw_response) {
        setPredictiveClock(clock);
      }

    } catch (error) {
      console.error("Error loading employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!employeeInfo) {
    return null;
  }

  // Fallback role-based initial projects (used if API doesn't return data)
  const roleProjects = {
    "Software Engineer": {
      title: "Customer Portal Development",
      description:
        "Build a responsive customer dashboard using React and Node.js with real-time updates.",
      skills: ["React", "Node.js", "MongoDB", "WebSocket"],
      timeline: "6 weeks",
      mentor: "Sarah Chen",
    },
    "Data Scientist": {
      title: "Predictive Analytics Model",
      description:
        "Develop machine learning models to predict customer churn and improve retention.",
      skills: ["Python", "TensorFlow", "Pandas", "SQL"],
      timeline: "8 weeks",
      mentor: "Dr. James Wilson",
    },
    "DevOps Engineer": {
      title: "CI/CD Pipeline Setup",
      description:
        "Implement automated deployment pipeline with Docker and Kubernetes.",
      skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
      timeline: "5 weeks",
      mentor: "Michael Roberts",
    },
    "QA Engineer": {
      title: "Test Automation Framework",
      description:
        "Create comprehensive automated testing suite for web applications.",
      skills: ["Selenium", "Jest", "Cypress", "API Testing"],
      timeline: "6 weeks",
      mentor: "Emily Watson",
    },
    "UX Designer": {
      title: "Design System Creation",
      description:
        "Develop a comprehensive design system for consistent user experience.",
      skills: ["Figma", "Design Tokens", "Component Library", "Accessibility"],
      timeline: "7 weeks",
      mentor: "Alex Thompson",
    },
    "Backend Developer": {
      title: "Microservices Architecture",
      description:
        "Design and implement scalable microservices for payment processing.",
      skills: ["Node.js", "PostgreSQL", "Redis", "RabbitMQ"],
      timeline: "8 weeks",
      mentor: "David Martinez",
    },
    "Blockchain Developer": {
      title: "Smart Contract Development",
      description:
        "Build secure smart contracts for decentralized finance applications.",
      skills: ["Solidity", "Web3.js", "Ethereum", "Security Audit"],
      timeline: "10 weeks",
      mentor: "Lisa Anderson",
    },
    "Cybersecurity Engineer": {
      title: "Security Assessment System",
      description:
        "Implement vulnerability scanning and penetration testing framework.",
      skills: [
        "Network Security",
        "Penetration Testing",
        "SIEM",
        "Threat Analysis",
      ],
      timeline: "6 weeks",
      mentor: "Robert Kim",
    },
  };

  const initialProjectData = initialProject || 
    roleProjects[user.role] || 
    roleProjects["Software Engineer"];

  // Fallback role-specific certifications (used if API doesn't return data)
  const fallbackCertificationData = {
    "Software Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/full-stack.pdf",
      certifications: [
        {
          name: "Full Stack Development Mastery",
          progress: 15,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "AWS Certified Developer",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "System Design Advanced",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "Data Scientist": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/ai-data-scientist.pdf",
      certifications: [
        {
          name: "Machine Learning Specialization",
          progress: 20,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "Deep Learning with TensorFlow",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "Data Engineering Fundamentals",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "DevOps Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/devops.pdf",
      certifications: [
        {
          name: "Docker & Kubernetes Mastery",
          progress: 25,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "AWS DevOps Engineer",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "Terraform Infrastructure",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "QA Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/qa.pdf",
      certifications: [
        {
          name: "Test Automation Expert",
          progress: 10,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "ISTQB Advanced Certification",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "Performance Testing",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "UX Designer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/ux-design.pdf",
      certifications: [
        {
          name: "UX Design Fundamentals",
          progress: 30,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "Advanced Prototyping",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "Accessibility Specialist",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "Backend Developer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/backend.pdf",
      certifications: [
        {
          name: "Backend Architecture Mastery",
          progress: 18,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "Database Design Expert",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "API Security Professional",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "Blockchain Developer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/blockchain.pdf",
      certifications: [
        {
          name: "Blockchain Fundamentals",
          progress: 12,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "Smart Contract Development",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "DeFi Architecture",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
    "Cybersecurity Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/roadmaps/cyber-security.pdf",
      certifications: [
        {
          name: "CompTIA Security+",
          progress: 22,
          status: "In Progress",
          enrolled: true,
        },
        {
          name: "Certified Ethical Hacker",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
        {
          name: "CISSP Preparation",
          progress: 0,
          status: "Not Started",
          enrolled: false,
        },
      ],
    },
  };

  const currentCertPath = certificationData || 
    fallbackCertificationData[user.role] || 
    fallbackCertificationData["Software Engineer"];

  // Salary insights with fallback
  const salaryInsightData = salaryInsight || {
    current: employeeInfo.salary || "$75,000",
    projection: "$95,000",
    nextCertificate: currentCertPath?.certifications?.[0]?.name || "Next Certification",
    increase: "+$20,000",
    percentage: "26.7%",
  };

  // Performance tracking with fallback
  const performanceData = performance || {
    initialProject: {
      status: "In Progress",
      tasksCompleted: 8,
      totalTasks: 25,
      retakes: 0,
    },
    testsPassed: 1,
    testsRequired: 3,
    score: 85,
  };

  // Scheduling with fallback
  const scheduledMeetingsData = scheduledMeetings.length > 0 ? scheduledMeetings : [
    {
      title: "Daily Standup",
      time: "9:00 AM - 9:30 AM",
      type: "Daily",
      status: "on-time",
    },
    {
      title: `1-on-1 with ${initialProjectData?.mentor || "Mentor"}`,
      time: "2:00 PM - 3:00 PM",
      type: "Weekly",
      status: "on-time",
    },
  ];

  const dailyTasksData = dailyTasks.length > 0 ? dailyTasks : [
    { task: "Review pull requests", completed: true },
    { task: "Complete feature implementation", completed: false },
  ];

  const navigationItems = [
    { icon: Home, label: "Overview", path: "/employee-dashboard" },
    { icon: BookOpen, label: "My Learning", path: "/my-learning" },
    { icon: Calendar, label: "Schedule", path: "/my-schedule" },
    { icon: TrendingUp, label: "Performance", path: "/my-performance" },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar - Darker with gradient */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-black via-gray-950 to-black border-r border-primary/20 shadow-2xl shadow-primary/10 z-50 transition-all duration-300 ${
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

          {/* Navigation with active states */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-900/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-orange-600/20 border border-transparent hover:border-primary/50 transition-all duration-300 text-gray-400 hover:text-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <item.icon className="w-5 h-5 flex-shrink-0 group-hover:text-primary transition-colors relative z-10" />
                {sidebarOpen && (
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Logout with enhanced styling */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 text-gray-400 hover:text-red-400 mt-auto group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div id="overview" className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome,{" "}
              <span className="gradient-text">{employeeInfo.name}</span>
            </h1>
            <p className="text-gray-400">
              {employeeInfo.role} - {employeeInfo.level}
            </p>
          </div>

          {/* Employee Info Card with enhanced styling */}
          <div
            id="performance"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              className="glass-card p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Employee Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white font-mono">
                    {employeeInfo._id}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white text-xs">
                    {employeeInfo.email}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Contract Type:</span>
                  <span className="text-white">
                    {employeeInfo.contract_type}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Country:</span>
                  <span className="text-white">
                    {employeeInfo.country_of_birth}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Gender:</span>
                  <span className="text-white">{employeeInfo.gender}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Hire Date:</span>
                  <span className="text-white">{employeeInfo.hire_date}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Service Days:</span>
                  <span className="text-primary font-semibold">
                    {employeeInfo.length_of_service_days} days
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-primary font-semibold">
                    {employeeInfo.level}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-gradient-to-r from-primary/20 to-orange-600/20 border border-primary/30">
                  <span className="text-gray-400">Salary:</span>
                  <span className="text-white font-bold">
                    {employeeInfo.salary}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 border border-green-900/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Initial Project
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-medium mb-1">
                    {initialProjectData.title || "Initial Project"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {initialProjectData.description || "Project description will be loaded from Watson Agent"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {(initialProjectData.skills || []).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white">{initialProjectData.timeline || "TBD"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mentor:</span>
                  <span className="text-white">{initialProjectData.mentor || "TBD"}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                Performance Score
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {performanceData.score}
                  </div>
                  <p className="text-sm text-gray-400">Overall Performance</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Initial Project</span>
                    <span className="text-white">
                      {performanceData.initialProject.tasksCompleted}/
                      {performanceData.initialProject.totalTasks}
                    </span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{
                        width: `${
                          (performanceData.initialProject.tasksCompleted /
                            performanceData.initialProject.totalTasks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Tests Passed</span>
                    <span className="text-white">
                      {performanceData.testsPassed}/{performanceData.testsRequired}
                    </span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div
                      className="bg-green-500 rounded-full h-2 transition-all"
                      style={{
                        width: `${
                          (performanceData.testsPassed /
                            performanceData.testsRequired) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Retakes Used:</span>
                    <span className="text-white">
                      {performanceData.initialProject.retakes || 0}/3
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications and Salary with enhanced styling */}
          <div
            id="learning"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <motion.div
              id="certifications"
              className="glass-card p-6 border border-yellow-900/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Certification Road Map
                </span>
                {currentCertPath?.roadmap_link && (
                  <a
                    href={currentCertPath.roadmap_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center space-x-1 text-primary hover:text-orange-400 transition"
                  >
                    <span>View PDF</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </h3>
              <div className="space-y-4">
                {(currentCertPath?.certifications || []).map((cert, i) => (
                  <div
                    key={i}
                    className="border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {cert.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 flex items-center space-x-2">
                          <span>{cert.status}</span>
                          {cert.enrolled && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                              Enrolled
                            </span>
                          )}
                        </p>
                      </div>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2 mb-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {cert.progress}% Complete
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 border border-emerald-900/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                Salary Insight
              </h3>
              <div className="space-y-4">
                <div className="bg-dark-lighter rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Current Salary</p>
                  <p className="text-2xl font-bold text-white">
                    {salaryInsightData.current}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-primary/20 to-orange-600/20 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-1">
                    Projected After Certification
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {salaryInsightData.projection}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Complete{" "}
                    <span className="text-white font-medium">
                      {salaryInsightData.nextCertificate}
                    </span>{" "}
                    to unlock
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/20">
                    <span className="text-sm text-gray-400">
                      Potential Increase:
                    </span>
                    <span className="text-green-400 font-semibold">
                      {salaryInsightData.increase} ({salaryInsightData.percentage})
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Schedule and Daily Tasks with enhanced styling */}
          <div id="schedule" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              className="glass-card p-6 border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                  Smart Calendar
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">
                    {activeScheduling ? "Active" : "Manual"}
                  </span>
                  <button
                    onClick={() => setActiveScheduling(!activeScheduling)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      activeScheduling ? "bg-primary" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        activeScheduling ? "translate-x-6" : ""
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {scheduledMeetingsData.map((meeting, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-3 bg-dark-lighter rounded-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <Clock className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          {meeting.title || meeting.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {meeting.time || `${meeting.date} ${meeting.start_time || ''}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                      {meeting.type || meeting.meeting_type || "Meeting"}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className={`flex items-center ${
                      predictiveClock?.risk_level === "high" ? "text-red-400" :
                      predictiveClock?.risk_level === "medium" ? "text-yellow-400" :
                      "text-green-400"
                    }`}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>
                        {predictiveClock?.status || "On track - No delays detected"}
                      </span>
                    </div>
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 border border-pink-900/30 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-pink-400" />
                Daily Tasks
              </h3>
              <div className="space-y-3">
                {dailyTasksData.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                      item.completed
                        ? "bg-green-500/10 border border-green-500/30 hover:border-green-500/50"
                        : "bg-gray-900/50 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                      )}
                      <span
                        className={`text-sm ${
                          item.completed
                            ? "text-gray-400 line-through"
                            : "text-white"
                        }`}
                      >
                        {item.task}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      Completed: {dailyTasksData.filter((t) => t.completed).length}/
                      {dailyTasksData.length}
                    </span>
                    <Activity className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions - Navigate to Detailed Pages */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/my-learning"
                className="glass-card p-6 border border-yellow-900/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                    <BookOpen className="w-6 h-6 text-yellow-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  My Learning
                </h3>
                <p className="text-gray-400 text-sm">
                  View your projects, certifications, and learning roadmap
                </p>
              </Link>

              <Link
                to="/my-schedule"
                className="glass-card p-6 border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                    <Calendar className="w-6 h-6 text-cyan-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  My Schedule
                </h3>
                <p className="text-gray-400 text-sm">
                  Manage your calendar, meetings, and daily tasks
                </p>
              </Link>

              <Link
                to="/my-performance"
                className="glass-card p-6 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  My Performance
                </h3>
                <p className="text-gray-400 text-sm">
                  Track your progress, achievements, and salary insights
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
