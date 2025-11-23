"""
Admin/HR functions for Watson Agent
Handles admin dashboard queries and HR management
"""
from watson_connection import WatsonAgentConnection
from typing import Dict, Any
import json

class AdminFunctions:
    """Functions for admin/HR-related queries"""
    
    def __init__(self, agent_connection: WatsonAgentConnection):
        self.agent = agent_connection
    
    def get_dashboard_overview(self) -> Dict[str, Any]:
        """
        Get admin dashboard overview statistics
        
        Returns:
            Dict with dashboard statistics
        """
        prompt = """Get admin dashboard overview statistics. 
        Include: total active employees, average integration time, success rate, 
        gaps detected, recent hires, role distribution, onboarding progress trends.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}
    
    def get_integration_gaps(self) -> Dict[str, Any]:
        """
        Get detected integration gaps for employees
        
        Returns:
            Dict with list of integration gaps
        """
        prompt = """Get all detected integration gaps for employees. 
        Include for each: employee name, issue description, priority (high/medium/low), 
        action taken, status. Return as JSON object with gaps array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}
    
    def get_employee_analytics(self, filters: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Get analytics for employees with optional filters
        
        Args:
            filters: Optional filters (role, level, date_range, etc.)
            
        Returns:
            Dict with analytics data
        """
        filters_str = json.dumps(filters) if filters else "None"
        prompt = f"""Get employee analytics with filters: {filters_str}. 
        Include: performance distribution, certification completion rates, 
        project success rates, time to productivity, retention metrics.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}
    
    def get_role_distribution(self) -> Dict[str, Any]:
        """
        Get distribution of employees by role
        
        Returns:
            Dict with role distribution data
        """
        prompt = """Get distribution of employees by role. 
        Include: role name, count, percentage, average salary, average performance score.
        Return as JSON object with roles array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}
    
    def get_onboarding_progress(self, time_period: str = "month") -> Dict[str, Any]:
        """
        Get onboarding progress statistics
        
        Args:
            time_period: Time period (week/month/quarter)
            
        Returns:
            Dict with onboarding progress data
        """
        prompt = f"""Get onboarding progress statistics for the last {time_period}. 
        Include: completed onboarding count, pending count, average completion time, 
        success rate, breakdown by week/month.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response}

