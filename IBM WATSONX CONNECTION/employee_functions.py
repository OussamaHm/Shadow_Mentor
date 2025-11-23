"""
Employee-related functions for Watson Agent
Handles employee information, initial projects, and employee data queries
"""
from watson_connection import WatsonAgentConnection
from typing import Dict, Any, Optional
import json

class EmployeeFunctions:
    """Functions for employee-related queries"""
    
    def __init__(self, agent_connection: WatsonAgentConnection):
        self.agent = agent_connection
    
    def get_employee_info(self, employee_id: str) -> Dict[str, Any]:
        """
        Get complete employee information
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with employee information
        """
        prompt = f"""Get complete information for employee with ID: {employee_id}. 
        Include all fields: _id, contract_type, country_of_birth, email, gender, 
        hire_date, length_of_service_days, level, name, role, salary.
        Return the data in JSON format."""
        
        response = self.agent.query_agent(prompt)
        
        # Try to parse JSON response
        try:
            return json.loads(response)
        except:
            # If not JSON, return as text
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_all_employees(self) -> Dict[str, Any]:
        """
        Get list of all employees
        
        Returns:
            Dict with list of employees
        """
        prompt = """Get a list of all employees in the system. 
        Include for each: _id, name, role, level, email, hire_date, salary.
        Return as JSON array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}
    
    def get_employee_by_role(self, role: str) -> Dict[str, Any]:
        """
        Get all employees with a specific role
        
        Args:
            role: Employee role (e.g., "Software Engineer", "Data Scientist")
            
        Returns:
            Dict with list of employees
        """
        prompt = f"""Get all employees with role: {role}. 
        Include: _id, name, level, email, hire_date, salary, length_of_service_days.
        Return as JSON array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}
    
    def get_initial_project(self, employee_id: str) -> Dict[str, Any]:
        """
        Get initial project assigned to an employee
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with project information
        """
        prompt = f"""Get the initial project assigned to employee ID: {employee_id}. 
        Include: project title, description, required skills, timeline, mentor name, 
        current progress, tasks completed, total tasks.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def assign_initial_project(self, employee_id: str, role: str, level: str) -> Dict[str, Any]:
        """
        Assign an initial project to a new employee
        
        Args:
            employee_id: Employee ID
            role: Employee role
            level: Employee level (Junior/Senior)
            
        Returns:
            Dict with assigned project information
        """
        prompt = f"""Assign an appropriate initial project for employee ID: {employee_id}, 
        Role: {role}, Level: {level}. 
        The project should be suitable for their role and level, help them learn and integrate.
        Include: project title, description, required skills, timeline (in weeks), 
        suggested mentor name, learning objectives.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def update_employee_info(self, employee_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update employee information
        
        Args:
            employee_id: Employee ID
            updates: Dictionary of fields to update
            
        Returns:
            Dict with update confirmation
        """
        updates_str = json.dumps(updates)
        prompt = f"""Update employee ID: {employee_id} with the following changes: {updates_str}. 
        Confirm the update and return the updated employee information as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}

