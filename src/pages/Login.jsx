import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, LogIn, Crown, Briefcase, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Roadmap links for each role
  const roadmapLinks = {
    "Software Engineer": "https://roadmap.sh/pdfs/roadmaps/full-stack.pdf",
    "Data Scientist": "https://roadmap.sh/pdfs/roadmaps/ai-data-scientist.pdf",
    "DevOps Engineer": "https://roadmap.sh/pdfs/roadmaps/devops.pdf",
    "QA Engineer": "https://roadmap.sh/pdfs/roadmaps/qa.pdf",
    "UX Designer": "https://roadmap.sh/pdfs/roadmaps/ux-design.pdf",
    "Backend Developer": "https://roadmap.sh/pdfs/roadmaps/backend.pdf",
    "Blockchain Developer": "https://roadmap.sh/pdfs/roadmaps/blockchain.pdf",
    "Cybersecurity Engineer":
      "https://roadmap.sh/pdfs/roadmaps/cyber-security.pdf",
  };

  // Demo credentials - 8 Employees + 1 HR
  const demoAccounts = [
    {
      id: "SE1023",
      email: "adam.keller@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Adam Keller",
      role: "Software Engineer",
      level: "Junior",
      roadmap: roadmapLinks["Software Engineer"],
    },
    {
      id: "DS8741",
      email: "sofia.martins@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Sofia Martins",
      role: "Data Scientist",
      level: "Junior",
      roadmap: roadmapLinks["Data Scientist"],
    },
    {
      id: "DV5539",
      email: "liam.oconnor@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Liam O'Connor",
      role: "DevOps Engineer",
      level: "Junior",
      roadmap: roadmapLinks["DevOps Engineer"],
    },
    {
      id: "QA6612",
      email: "emma.rousseau@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Emma Rousseau",
      role: "QA Engineer",
      level: "Junior",
      roadmap: roadmapLinks["QA Engineer"],
    },
    {
      id: "UX4498",
      email: "noah.yamamoto@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Noah Yamamoto",
      role: "UX Designer",
      level: "Junior",
      roadmap: roadmapLinks["UX Designer"],
    },
    {
      id: "BE7310",
      email: "maya.benali@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Maya Benali",
      role: "Backend Developer",
      level: "Junior",
      roadmap: roadmapLinks["Backend Developer"],
    },
    {
      id: "BC2174",
      email: "ethan.delgado@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Ethan Delgado",
      role: "Blockchain Developer",
      level: "Junior",
      roadmap: roadmapLinks["Blockchain Developer"],
    },
    {
      id: "CY9056",
      email: "chloe.ivanova@shadowmentor.com",
      password: "employee123",
      type: "employee",
      name: "Chloe Ivanova",
      role: "Cybersecurity Engineer",
      level: "Junior",
      roadmap: roadmapLinks["Cybersecurity Engineer"],
    },
    {
      id: "HR3842",
      email: "lucas.hernandez@shadowmentor.com",
      password: "hr123",
      type: "hr",
      name: "Lucas Hernandez",
      role: "HR Manager",
      level: "Junior",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const account = demoAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(account));

      // Navigate based on user type
      if (account.type === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  const fillDemo = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card p-8">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <img
                src="/Shadow Mentor Logo.png"
                alt="Shadow Mentor"
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h1 className="text-3xl font-bold mb-2">
                Welcome to <span className="gradient-text">Shadow Mentor</span>
              </h1>
              <p className="text-gray-400">Sign in to track your journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition text-white placeholder-gray-400"
                    placeholder="you@shadowmentor.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition text-white placeholder-gray-400"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            </form>

            {/* Back to Home Button */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Test Accounts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-white">Test Accounts</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Click to auto-fill credentials
            </p>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Employee Accounts */}
              {demoAccounts
                .filter((acc) => acc.type === "employee")
                .map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillDemo(account)}
                    className="w-full p-4 bg-dark-lighter border border-gray-700 rounded-lg hover:border-primary transition text-left group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-primary transition">
                          {account.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {account.role} ({account.level})
                        </div>
                      </div>
                      <Briefcase className="w-4 h-4 text-gray-500 group-hover:text-primary transition" />
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Email: {account.email}</div>
                      <div>Password: {account.password}</div>
                      <div className="text-primary">ID: {account.id}</div>
                    </div>
                  </button>
                ))}

              {/* HR Account */}
              {demoAccounts
                .filter((acc) => acc.type === "hr")
                .map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillDemo(account)}
                    className="w-full p-4 bg-gradient-to-r from-primary/20 to-orange-600/20 border border-primary/50 rounded-lg hover:border-primary transition text-left group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-primary" />
                          <div className="text-sm font-semibold text-white">
                            {account.name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          {account.role} ({account.level})
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Email: {account.email}</div>
                      <div>Password: {account.password}</div>
                      <div className="text-primary">ID: {account.id}</div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
