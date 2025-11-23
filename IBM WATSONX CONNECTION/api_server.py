"""
Flask API Server for Watson Agent Functions
Exposes all functions as REST API endpoints for frontend consumption
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from watson_connection import WatsonAgentConnection
from employee_functions import EmployeeFunctions
from certification_functions import CertificationFunctions
from performance_functions import PerformanceFunctions
from scheduling_functions import SchedulingFunctions
from admin_functions import AdminFunctions
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Initialize Watson Agent Connection
agent_conn = WatsonAgentConnection()
employee_funcs = EmployeeFunctions(agent_conn)
cert_funcs = CertificationFunctions(agent_conn)
perf_funcs = PerformanceFunctions(agent_conn)
sched_funcs = SchedulingFunctions(agent_conn)
admin_funcs = AdminFunctions(agent_conn)

# Ensure session is created on startup
agent_conn.create_session()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "agent_connected": agent_conn.session_id is not None})

# ==================== EMPLOYEE ENDPOINTS ====================

@app.route('/api/employee/<employee_id>', methods=['GET'])
def get_employee(employee_id):
    """Get employee information"""
    try:
        result = employee_funcs.get_employee_info(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employees', methods=['GET'])
def get_all_employees():
    """Get all employees"""
    try:
        role = request.args.get('role')
        if role:
            result = employee_funcs.get_employee_by_role(role)
        else:
            result = employee_funcs.get_all_employees()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/project', methods=['GET'])
def get_employee_project(employee_id):
    """Get employee's initial project"""
    try:
        result = employee_funcs.get_initial_project(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/project', methods=['POST'])
def assign_project(employee_id):
    """Assign initial project to employee"""
    try:
        data = request.json
        role = data.get('role')
        level = data.get('level')
        result = employee_funcs.assign_initial_project(employee_id, role, level)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================== CERTIFICATION ENDPOINTS ====================

@app.route('/api/certifications/roadmap/<role>', methods=['GET'])
def get_roadmap(role):
    """Get certification roadmap for a role"""
    try:
        result = cert_funcs.get_certification_roadmap(role)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/salary-insight', methods=['GET'])
def get_salary_insight(employee_id):
    """Get salary insight for employee"""
    try:
        cert_name = request.args.get('certification')
        if not cert_name:
            return jsonify({"error": "certification parameter required"}), 400
        result = cert_funcs.get_salary_insight(employee_id, cert_name)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/certifications/followup', methods=['GET'])
def get_cert_followup(employee_id):
    """Get certification follow-up for employee"""
    try:
        result = cert_funcs.get_certification_followup(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/certifications/role/<role>', methods=['GET'])
def get_certs_for_role(role):
    """Get all certifications for a role"""
    try:
        result = cert_funcs.get_all_certifications_for_role(role)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================== PERFORMANCE ENDPOINTS ====================

@app.route('/api/employee/<employee_id>/performance', methods=['GET'])
def get_performance(employee_id):
    """Get employee performance score"""
    try:
        result = perf_funcs.get_performance_score(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/project-monitoring', methods=['GET'])
def get_project_monitoring(employee_id):
    """Get initial project monitoring"""
    try:
        result = perf_funcs.get_initial_project_monitoring(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/tests', methods=['GET'])
def get_test_status(employee_id):
    """Get test status for employee"""
    try:
        result = perf_funcs.get_test_status(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/tests', methods=['POST'])
def record_test(employee_id):
    """Record test result"""
    try:
        data = request.json
        test_name = data.get('test_name')
        passed = data.get('passed')
        score = data.get('score')
        result = perf_funcs.record_test_result(employee_id, test_name, passed, score)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================== SCHEDULING ENDPOINTS ====================

@app.route('/api/employee/<employee_id>/tasks', methods=['GET'])
def get_tasks(employee_id):
    """Get daily tasks for employee"""
    try:
        date = request.args.get('date')
        result = sched_funcs.get_daily_tasks(employee_id, date)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/tasks', methods=['POST'])
def add_task(employee_id):
    """Add a new task"""
    try:
        data = request.json
        task = data.get('task')
        priority = data.get('priority', 'medium')
        due_date = data.get('due_date')
        result = sched_funcs.add_task(employee_id, task, priority, due_date)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/tasks/<task_id>', methods=['PUT'])
def update_task(employee_id, task_id):
    """Update task status"""
    try:
        data = request.json
        completed = data.get('completed', False)
        result = sched_funcs.update_task_status(employee_id, task_id, completed)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/meetings', methods=['GET'])
def get_meetings(employee_id):
    """Get scheduled meetings"""
    try:
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        result = sched_funcs.get_meetings(employee_id, start_date, end_date)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/meetings', methods=['POST'])
def schedule_meeting(employee_id):
    """Schedule a new meeting"""
    try:
        data = request.json
        result = sched_funcs.schedule_meeting(
            employee_id,
            data.get('title'),
            data.get('date'),
            data.get('time'),
            data.get('duration', 60),
            data.get('type', 'as needed')
        )
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/predictive-clock', methods=['GET'])
def get_predictive_clock(employee_id):
    """Get predictive clock analysis"""
    try:
        result = sched_funcs.get_predictive_clock(employee_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee/<employee_id>/calendar', methods=['GET'])
def get_calendar(employee_id):
    """Get smart calendar"""
    try:
        active = request.args.get('active', 'true').lower() == 'true'
        result = sched_funcs.get_smart_calendar(employee_id, active)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================== ADMIN ENDPOINTS ====================

@app.route('/api/admin/dashboard', methods=['GET'])
def get_admin_dashboard():
    """Get admin dashboard overview"""
    try:
        result = admin_funcs.get_dashboard_overview()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/integration-gaps', methods=['GET'])
def get_gaps():
    """Get integration gaps"""
    try:
        result = admin_funcs.get_integration_gaps()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/analytics', methods=['GET'])
def get_analytics():
    """Get employee analytics"""
    try:
        filters = request.args.get('filters')
        filters_dict = json.loads(filters) if filters else None
        result = admin_funcs.get_employee_analytics(filters_dict)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/role-distribution', methods=['GET'])
def get_role_dist():
    """Get role distribution"""
    try:
        result = admin_funcs.get_role_distribution()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/onboarding-progress', methods=['GET'])
def get_onboarding():
    """Get onboarding progress"""
    try:
        period = request.args.get('period', 'month')
        result = admin_funcs.get_onboarding_progress(period)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================== MAIN ====================

if __name__ == '__main__':
    print("🚀 Starting Watson Agent API Server...")
    print(f"✅ Agent Session: {agent_conn.session_id}")
    print("📡 API Server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)

