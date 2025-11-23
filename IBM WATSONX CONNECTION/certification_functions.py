"""
Certification-related functions for Watson Agent
Handles certification roadmaps, salary insights, and follow-up tracking
"""
from watson_connection import WatsonAgentConnection
from typing import Dict, Any, List
import json

class CertificationFunctions:
    """Functions for certification-related queries"""
    
    def __init__(self, agent_connection: WatsonAgentConnection):
        self.agent = agent_connection
    
    def get_certification_roadmap(self, role: str) -> Dict[str, Any]:
        """
        Get certification roadmap for a specific role
        
        Args:
            role: Employee role
            
        Returns:
            Dict with roadmap information including PDF link
        """
        prompt = f"""Get the certification roadmap for role: {role}. 
        Include: roadmap PDF link, list of recommended certifications in order, 
        prerequisites for each, estimated duration, difficulty level.
        Return as JSON object with structure: {{"roadmap_link": "...", "certifications": [...]}}."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "role": role}
    
    def get_salary_insight(self, employee_id: str, certification_name: str) -> Dict[str, Any]:
        """
        Get salary projection after completing a certification
        
        Args:
            employee_id: Employee ID
            certification_name: Name of the certification
            
        Returns:
            Dict with current salary, projected salary, increase amount and percentage
        """
        prompt = f"""Calculate salary insight for employee ID: {employee_id} after completing 
        certification: {certification_name}. 
        Include: current salary, projected salary after certification, 
        salary increase amount, percentage increase.
        Return as JSON object with fields: current, projection, increase, percentage, next_certificate."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_certification_followup(self, employee_id: str) -> Dict[str, Any]:
        """
        Get follow-up information on employee's current certification progress
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with certification progress information
        """
        prompt = f"""Get follow-up information on certification progress for employee ID: {employee_id}. 
        Include: list of certifications currently enrolled in, progress percentage for each, 
        next steps, deadlines, completion estimates, any issues or blockers.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_all_certifications_for_role(self, role: str) -> Dict[str, Any]:
        """
        Get all available certifications for a role
        
        Args:
            role: Employee role
            
        Returns:
            Dict with list of certifications
        """
        prompt = f"""Get all available certifications for role: {role}. 
        Include for each: name, prerequisites, difficulty, estimated duration, 
        average salary range, certification provider.
        Return as JSON array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "role": role}
    
    def enroll_in_certification(self, employee_id: str, certification_name: str) -> Dict[str, Any]:
        """
        Enroll an employee in a certification program
        
        Args:
            employee_id: Employee ID
            certification_name: Name of certification to enroll in
            
        Returns:
            Dict with enrollment confirmation
        """
        prompt = f"""Enroll employee ID: {employee_id} in certification: {certification_name}. 
        Confirm enrollment, set start date, provide study plan, and return enrollment details as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def update_certification_progress(self, employee_id: str, certification_name: str, progress: int) -> Dict[str, Any]:
        """
        Update certification progress for an employee
        
        Args:
            employee_id: Employee ID
            certification_name: Certification name
            progress: Progress percentage (0-100)
            
        Returns:
            Dict with updated progress information
        """
        prompt = f"""Update certification progress for employee ID: {employee_id}, 
        certification: {certification_name} to {progress}%. 
        Return updated progress information as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}

