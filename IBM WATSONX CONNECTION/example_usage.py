#!/usr/bin/env python3
"""
Example usage of Watson Agent functions
Demonstrates how to use various functions
"""
from watson_connection import WatsonAgentConnection
from employee_functions import EmployeeFunctions
from certification_functions import CertificationFunctions
from performance_functions import PerformanceFunctions
from scheduling_functions import SchedulingFunctions
from admin_functions import AdminFunctions
import json

def main():
    print("=" * 60)
    print("📚 Watson Agent Functions - Example Usage")
    print("=" * 60)
    print()
    
    # Initialize connection
    agent = WatsonAgentConnection()
    if not agent.create_session():
        print("❌ Failed to create session. Exiting.")
        return
    
    print()
    
    # Example: Employee Functions
    print("1. Employee Functions Example")
    print("-" * 60)
    emp_funcs = EmployeeFunctions(agent)
    
    # Get employee info
    employee_id = "EMP-1001"
    print(f"Getting info for employee: {employee_id}")
    emp_info = emp_funcs.get_employee_info(employee_id)
    print(f"Result: {json.dumps(emp_info, indent=2)[:200]}...")
    print()
    
    # Example: Certification Functions
    print("2. Certification Functions Example")
    print("-" * 60)
    cert_funcs = CertificationFunctions(agent)
    
    role = "Software Engineer"
    print(f"Getting roadmap for role: {role}")
    roadmap = cert_funcs.get_certification_roadmap(role)
    print(f"Result: {json.dumps(roadmap, indent=2)[:200]}...")
    print()
    
    # Example: Performance Functions
    print("3. Performance Functions Example")
    print("-" * 60)
    perf_funcs = PerformanceFunctions(agent)
    
    print(f"Getting performance for employee: {employee_id}")
    performance = perf_funcs.get_performance_score(employee_id)
    print(f"Result: {json.dumps(performance, indent=2)[:200]}...")
    print()
    
    # Example: Scheduling Functions
    print("4. Scheduling Functions Example")
    print("-" * 60)
    sched_funcs = SchedulingFunctions(agent)
    
    print(f"Getting tasks for employee: {employee_id}")
    tasks = sched_funcs.get_daily_tasks(employee_id)
    print(f"Result: {json.dumps(tasks, indent=2)[:200]}...")
    print()
    
    # Example: Admin Functions
    print("5. Admin Functions Example")
    print("-" * 60)
    admin_funcs = AdminFunctions(agent)
    
    print("Getting dashboard overview...")
    dashboard = admin_funcs.get_dashboard_overview()
    print(f"Result: {json.dumps(dashboard, indent=2)[:200]}...")
    print()
    
    print("=" * 60)
    print("✅ Examples completed!")
    print("=" * 60)

if __name__ == '__main__':
    main()

