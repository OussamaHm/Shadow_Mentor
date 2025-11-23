import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Brain,
  Target,
  MessageSquare,
  Activity,
  Github,
} from "lucide-react";

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Perception",
      description:
        "Continuously monitors calendar, Slack activity, and system access to identify integration gaps",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Decision Making",
      description:
        "Analyzes patterns and determines priority actions to ensure smooth onboarding",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Autonomous Actions",
      description:
        "Ghost-books meetings, sends reminders, and provisions role-specific challenges",
      color: "from-primary to-orange-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Buddy Matching",
      description:
        "Intelligently pairs new hires with mentors based on shared interests and backgrounds",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Roadmaps",
      description:
        "Creates personalized learning paths with certifications tailored to each role",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Performance Tracking",
      description:
        "Monitors progress with scoring systems and adaptive testing with retakes",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const stats = [
    { number: "95%", label: "Onboarding Success" },
    { number: "10 Days", label: "Avg. Integration Time" },
    { number: "60+", label: "Active Employees" },
    { number: "24/7", label: "AI Monitoring" },
  ];

  const benefits = [
    "No more ghosting after week 1",
    "Automated meeting scheduling",
    "Personalized career pathways",
    "Real-time integration gap detection",
    "Slack & Calendar integration",
    "Persistent task completion tracking",
  ];

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      {/* Navigation */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "glass-card shadow-2xl" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img
                src="/Shadow Mentor Logo.png"
                alt="Shadow Mentor Logo"
                className="w-20 h-20 object-contain"
              />
              <span className="text-2xl font-bold">
                Shadow<span className="gradient-text">Mentor</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-primary transition">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-primary transition">
                How It Works
              </a>
              <a href="#benefits" className="hover:text-primary transition">
                Benefits
              </a>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="mb-2" variants={fadeInUp}>
              <img
                src="/Shadow Mentor Logo.png"
                alt="Shadow Mentor"
                className="w-48 h-48 mx-auto object-contain"
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
            >
              The Future of{" "}
              <span className="gradient-text">Employee Onboarding</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Never let new hires feel lost again. Shadow Mentor is your
              invisible AI companion that ensures every employee gets the
              guidance, connections, and resources they need from day one.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link
                to="/login"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="https://github.com/abdullahxyz85/shadow-mentor1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center border-2 border-primary/30 hover:border-primary"
              >
                <Github className="mr-2 w-5 h-5" /> GitHub
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
              variants={fadeInUp}
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge AI to revolutionize your HR onboarding
              process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className={`w-12 h-12 text-primary`}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="section-container bg-dark-secondary/30"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-400">The AI-Powered 3-Step Cycle</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Perceive",
                description:
                  "Scans calendar, Slack activity, and system access. Notices integration gaps like missing 1:1s or unaccessed tools.",
                icon: <Brain className="w-12 h-12" />,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Decide",
                description:
                  "Analyzes patterns and identifies priority actions. Determines what interventions will have the most impact.",
                icon: <Target className="w-12 h-12" />,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Act",
                description:
                  "Ghost-books meetings, sends Slack DMs with task links, provisions challenges, and matches with buddies.",
                icon: <Zap className="w-12 h-12" />,
                color: "from-primary to-orange-600",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="glass-card p-8 h-full">
                  <div className="text-6xl font-bold text-white/10 mb-4">
                    {step.step}
                  </div>
                  <div className="mb-6">
                    <div className="w-16 h-16 text-primary">{step.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* Benefits Section */}
      <section id="benefits" className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Shadow Mentor?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Transform your onboarding process with intelligent automation and
              personalized guidance
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-dark-tertiary rounded-xl">
                  <div>
                    <div className="text-sm text-gray-400">
                      Integration Success
                    </div>
                    <div className="text-2xl font-bold text-green-500">95%</div>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-tertiary rounded-xl">
                  <div>
                    <div className="text-sm text-gray-400">Time Saved/Week</div>
                    <div className="text-2xl font-bold text-primary">
                      15 Hours
                    </div>
                  </div>
                  <Calendar className="w-10 h-10 text-primary" />
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-tertiary rounded-xl">
                  <div>
                    <div className="text-sm text-gray-400">
                      Employee Satisfaction
                    </div>
                    <div className="text-2xl font-bold text-blue-500">
                      4.8/5
                    </div>
                  </div>
                  <Award className="w-10 h-10 text-blue-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer  */}
      <footer className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <img
                src="/Shadow Mentor Logo.png"
                alt="Shadow Mentor Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold">
                Shadow<span className="gradient-text">Mentor</span>
              </span>
            </div>

            <div className="text-right">
              <div className="text-gray-400 text-sm mb-1">
                Built for{" "}
                <a
                  href="https://lablab.ai/event/agentic-ai-hackathon-ibm-watsonx-orchestrate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-orange-400 transition font-semibold"
                >
                  Agentic AI Hackathon - IBM Watsonx Orchestrate
                </a>
              </div>
              <div className="text-gray-500 text-xs">
                © 2025 Shadow Mentor. Built with ❤️ for better onboarding.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
