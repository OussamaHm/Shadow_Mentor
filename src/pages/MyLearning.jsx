import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Award, Target, ArrowLeft } from "lucide-react";

const MyLearning = () => {
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

  const roleProjects = {
    "Software Engineer": {
      title: "Build a Task Management API",
      description:
        "Develop a RESTful API with authentication, CRUD operations, and database integration",
      skills: ["Node.js", "Express", "MongoDB", "JWT"],
      timeline: "2 weeks",
      mentor: "Sarah Chen",
    },
    "Data Scientist": {
      title: "Customer Segmentation Analysis",
      description:
        "Perform clustering analysis on customer data to identify key segments",
      skills: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      timeline: "3 weeks",
      mentor: "Dr. James Wilson",
    },
    "DevOps Engineer": {
      title: "CI/CD Pipeline Setup",
      description:
        "Configure automated deployment pipeline with testing and monitoring",
      skills: ["Docker", "Jenkins", "Kubernetes", "AWS"],
      timeline: "2 weeks",
      mentor: "Alex Kumar",
    },
    "QA Engineer": {
      title: "Automated Testing Framework",
      description:
        "Create comprehensive test suite with unit and integration tests",
      skills: ["Selenium", "Jest", "Cypress", "TestNG"],
      timeline: "2 weeks",
      mentor: "Lisa Zhang",
    },
    "UX Designer": {
      title: "Mobile App Redesign",
      description:
        "Redesign user interface with focus on accessibility and user flow",
      skills: ["Figma", "User Research", "Prototyping", "A/B Testing"],
      timeline: "3 weeks",
      mentor: "Michael Park",
    },
    "Backend Developer": {
      title: "Microservices Architecture",
      description:
        "Design and implement scalable microservices with API gateway",
      skills: ["Java", "Spring Boot", "Redis", "RabbitMQ"],
      timeline: "4 weeks",
      mentor: "David Martinez",
    },
    "Blockchain Developer": {
      title: "Smart Contract Development",
      description:
        "Create and deploy secure smart contracts for decentralized application",
      skills: ["Solidity", "Web3.js", "Truffle", "Ethereum"],
      timeline: "3 weeks",
      mentor: "Emma Johnson",
    },
    "Cybersecurity Analyst": {
      title: "Security Audit System",
      description:
        "Build automated security scanning and vulnerability assessment tool",
      skills: ["Python", "Nmap", "Wireshark", "OWASP"],
      timeline: "2 weeks",
      mentor: "Robert Lee",
    },
  };

  const certificationData = {
    "Software Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/frontend.pdf",
      certifications: [
        { name: "JavaScript Fundamentals", progress: 75 },
        { name: "React Advanced Patterns", progress: 45 },
        { name: "Node.js Backend Development", progress: 30 },
      ],
    },
    "Data Scientist": {
      roadmapLink: "https://roadmap.sh/pdfs/data-science.pdf",
      certifications: [
        { name: "Python for Data Science", progress: 80 },
        { name: "Machine Learning Basics", progress: 60 },
        { name: "Deep Learning Fundamentals", progress: 25 },
      ],
    },
    "DevOps Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/devops.pdf",
      certifications: [
        { name: "Docker & Containerization", progress: 70 },
        { name: "Kubernetes Administration", progress: 50 },
        { name: "AWS Cloud Practitioner", progress: 40 },
      ],
    },
    "QA Engineer": {
      roadmapLink: "https://roadmap.sh/pdfs/qa.pdf",
      certifications: [
        { name: "Test Automation", progress: 65 },
        { name: "Performance Testing", progress: 55 },
        { name: "Security Testing", progress: 35 },
      ],
    },
    "UX Designer": {
      roadmapLink: "https://roadmap.sh/pdfs/ux-design.pdf",
      certifications: [
        { name: "User Research Methods", progress: 85 },
        { name: "UI Design Principles", progress: 70 },
        { name: "Accessibility Standards", progress: 50 },
      ],
    },
    "Backend Developer": {
      roadmapLink: "https://roadmap.sh/pdfs/backend.pdf",
      certifications: [
        { name: "RESTful API Design", progress: 75 },
        { name: "Database Optimization", progress: 60 },
        { name: "Microservices Architecture", progress: 40 },
      ],
    },
    "Blockchain Developer": {
      roadmapLink: "https://roadmap.sh/pdfs/blockchain.pdf",
      certifications: [
        { name: "Blockchain Fundamentals", progress: 70 },
        { name: "Smart Contract Development", progress: 55 },
        { name: "DApp Development", progress: 30 },
      ],
    },
    "Cybersecurity Analyst": {
      roadmapLink: "https://roadmap.sh/pdfs/cyber-security.pdf",
      certifications: [
        { name: "Network Security", progress: 80 },
        { name: "Ethical Hacking", progress: 65 },
        { name: "Incident Response", progress: 45 },
      ],
    },
  };

  const initialProject =
    roleProjects[user.role] || roleProjects["Software Engineer"];
  const currentCertPath =
    certificationData[user.role] || certificationData["Software Engineer"];

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
            My <span className="gradient-text">Learning Path</span>
          </h1>
          <p className="text-gray-400">
            Track your progress and continue your professional development
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Initial Project */}
          <motion.div
            className="glass-card p-8 border border-green-900/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-green-400" />
              Initial Project
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl text-white font-medium mb-2">
                  {initialProject.title}
                </h4>
                <p className="text-gray-400">{initialProject.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-3">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {initialProject.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-gradient-to-r from-primary/20 to-orange-600/20 border border-primary/30 text-primary text-sm rounded-lg hover:scale-105 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Timeline:</p>
                  <p className="text-white font-semibold">
                    {initialProject.timeline}
                  </p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Mentor:</p>
                  <p className="text-white font-semibold">
                    {initialProject.mentor}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="glass-card p-8 border border-yellow-900/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Award className="w-6 h-6 mr-3 text-yellow-400" />
                Certification Road Map
              </h3>
              <a
                href={currentCertPath.roadmapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded-lg transition-all hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">View Roadmap</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-6">
              {currentCertPath.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 p-4 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{cert.name}</span>
                    <span className="text-primary font-bold">
                      {cert.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-orange-600 rounded-full h-3"
                      initial={{ width: 0 }}
                      animate={{ width: `${cert.progress}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Resources */}
        <motion.div
          className="mt-8 glass-card p-8 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-blue-400" />
            Recommended Learning Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-800/50 transition-colors">
              <h4 className="text-lg font-semibold text-white mb-2">
                Documentation
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Official guides and API references for your tech stack
              </p>
              <a
                href="#"
                className="text-primary hover:text-orange-400 text-sm font-medium"
              >
                Browse Docs →
              </a>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-800/50 transition-colors">
              <h4 className="text-lg font-semibold text-white mb-2">
                Video Tutorials
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Curated video courses from industry experts
              </p>
              <a
                href="#"
                className="text-primary hover:text-orange-400 text-sm font-medium"
              >
                Watch Videos →
              </a>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-800/50 transition-colors">
              <h4 className="text-lg font-semibold text-white mb-2">
                Practice Labs
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Hands-on coding challenges and projects
              </p>
              <a
                href="#"
                className="text-primary hover:text-orange-400 text-sm font-medium"
              >
                Start Practicing →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyLearning;
