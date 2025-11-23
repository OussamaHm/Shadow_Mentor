/**
 * Watson Agent API Client
 * Utility functions for calling the Watson Orchestrate Agent API
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Generic API call function
 */
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

// ==================== EMPLOYEE API ====================

export const employeeApi = {
  /**
   * Get employee information
   */
  getEmployee: (employeeId) => apiCall(`/employee/${employeeId}`),

  /**
   * Get all employees or by role
   */
  getAllEmployees: (role = null) => {
    const url = role ? `/employees?role=${encodeURIComponent(role)}` : '/employees';
    return apiCall(url);
  },

  /**
   * Get employee's initial project
   */
  getInitialProject: (employeeId) => apiCall(`/employee/${employeeId}/project`),

  /**
   * Assign initial project to employee
   */
  assignProject: (employeeId, role, level) =>
    apiCall(`/employee/${employeeId}/project`, {
      method: 'POST',
      body: JSON.stringify({ role, level }),
    }),
};

// ==================== CERTIFICATION API ====================

export const certificationApi = {
  /**
   * Get certification roadmap for a role
   */
  getRoadmap: (role) => apiCall(`/certifications/roadmap/${encodeURIComponent(role)}`),

  /**
   * Get salary insight after certification
   */
  getSalaryInsight: (employeeId, certificationName) =>
    apiCall(`/employee/${employeeId}/salary-insight?certification=${encodeURIComponent(certificationName)}`),

  /**
   * Get certification follow-up for employee
   */
  getFollowup: (employeeId) => apiCall(`/employee/${employeeId}/certifications/followup`),

  /**
   * Get all certifications for a role
   */
  getCertificationsForRole: (role) => apiCall(`/certifications/role/${encodeURIComponent(role)}`),
};

// ==================== PERFORMANCE API ====================

export const performanceApi = {
  /**
   * Get employee performance score
   */
  getPerformance: (employeeId) => apiCall(`/employee/${employeeId}/performance`),

  /**
   * Get initial project monitoring
   */
  getProjectMonitoring: (employeeId) => apiCall(`/employee/${employeeId}/project-monitoring`),

  /**
   * Get test status
   */
  getTestStatus: (employeeId) => apiCall(`/employee/${employeeId}/tests`),

  /**
   * Record test result
   */
  recordTest: (employeeId, testName, passed, score) =>
    apiCall(`/employee/${employeeId}/tests`, {
      method: 'POST',
      body: JSON.stringify({ test_name: testName, passed, score }),
    }),
};

// ==================== SCHEDULING API ====================

export const schedulingApi = {
  /**
   * Get daily tasks
   */
  getTasks: (employeeId, date = null) => {
    const url = date
      ? `/employee/${employeeId}/tasks?date=${date}`
      : `/employee/${employeeId}/tasks`;
    return apiCall(url);
  },

  /**
   * Add a new task
   */
  addTask: (employeeId, task, priority = 'medium', dueDate = null) =>
    apiCall(`/employee/${employeeId}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ task, priority, due_date: dueDate }),
    }),

  /**
   * Update task status
   */
  updateTask: (employeeId, taskId, completed) =>
    apiCall(`/employee/${employeeId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
    }),

  /**
   * Get scheduled meetings
   */
  getMeetings: (employeeId, startDate = null, endDate = null) => {
    let url = `/employee/${employeeId}/meetings`;
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    if (params.toString()) url += `?${params.toString()}`;
    return apiCall(url);
  },

  /**
   * Schedule a new meeting
   */
  scheduleMeeting: (employeeId, title, date, time, duration = 60, type = 'as needed') =>
    apiCall(`/employee/${employeeId}/meetings`, {
      method: 'POST',
      body: JSON.stringify({ title, date, time, duration, type }),
    }),

  /**
   * Get predictive clock analysis
   */
  getPredictiveClock: (employeeId) => apiCall(`/employee/${employeeId}/predictive-clock`),

  /**
   * Get smart calendar
   */
  getCalendar: (employeeId, activeScheduling = true) =>
    apiCall(`/employee/${employeeId}/calendar?active=${activeScheduling}`),
};

// ==================== ADMIN API ====================

export const adminApi = {
  /**
   * Get admin dashboard overview
   */
  getDashboard: () => apiCall('/admin/dashboard'),

  /**
   * Get integration gaps
   */
  getIntegrationGaps: () => apiCall('/admin/integration-gaps'),

  /**
   * Get employee analytics
   */
  getAnalytics: (filters = null) => {
    const url = filters
      ? `/admin/analytics?filters=${encodeURIComponent(JSON.stringify(filters))}`
      : '/admin/analytics';
    return apiCall(url);
  },

  /**
   * Get role distribution
   */
  getRoleDistribution: () => apiCall('/admin/role-distribution'),

  /**
   * Get onboarding progress
   */
  getOnboardingProgress: (period = 'month') =>
    apiCall(`/admin/onboarding-progress?period=${period}`),
};

// ==================== HEALTH CHECK ====================

export const healthCheck = () => apiCall('/health');

