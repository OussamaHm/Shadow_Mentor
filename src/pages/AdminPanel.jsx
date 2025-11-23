import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Users, Bell } from "lucide-react";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <p className="text-gray-400">
            Configuration and settings coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
