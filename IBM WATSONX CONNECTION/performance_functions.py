"""
Performance tracking functions for Watson Agent
Handles performance scores, project monitoring, and test tracking
"""
from watson_connection import WatsonAgentConnection
from typing import Dict, Any
import json

class PerformanceFunctions:
    """Functions for performance-related queries"""
    
    def __init__(self, agent_connection: WatsonAgentConnection):
        self.agent = agent_connection
    
    def get_performance_score(self, employee_id: str) -> Dict[str, Any]:
        """
        Get overall performance score for an employee
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with performance score and breakdown
        """
        prompt = f"""Get overall performance score for employee ID: {employee_id}. 
        Include: overall score (0-100), breakdown by category (project completion, 
        certifications, tests, attendance), trend (improving/stable/declining).
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_initial_project_monitoring(self, employee_id: str) -> Dict[str, Any]:
        """
        Get monitoring information for employee's initial project
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with project monitoring data
        """
        prompt = f"""Get initial project monitoring for employee ID: {employee_id}. 
        Include: project status, tasks completed, total tasks, completion percentage, 
        tasks by status (completed, in progress, pending), timeline adherence, 
        any blockers or issues.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_test_status(self, employee_id: str) -> Dict[str, Any]:
        """
        Get test status for an employee (tests passed, required, retakes)
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with test information
        """
        prompt = f"""Get test status for employee ID: {employee_id}. 
        Include: tests passed, tests required (should be 3), retakes used, 
        retakes remaining, test scores, next test date, certification eligibility status.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def record_test_result(self, employee_id: str, test_name: str, passed: bool, score: int) -> Dict[str, Any]:
        """
        Record a test result for an employee
        
        Args:
            employee_id: Employee ID
            test_name: Name of the test
            passed: Whether the test was passed
            score: Test score (0-100)
            
        Returns:
            Dict with updated test status
        """
        passed_str = "passed" if passed else "failed"
        prompt = f"""Record test result for employee ID: {employee_id}. 
        Test: {test_name}, Status: {passed_str}, Score: {score}. 
        Update test count, retakes if needed, and return updated test status as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_performance_trends(self, employee_id: str, days: int = 30) -> Dict[str, Any]:
        """
        Get performance trends over a period
        
        Args:
            employee_id: Employee ID
            days: Number of days to analyze (default 30)
            
        Returns:
            Dict with performance trends
        """
        prompt = f"""Get performance trends for employee ID: {employee_id} over the last {days} days. 
        Include: score progression, project completion rate, certification progress, 
        test performance, overall trend analysis.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_performance_comparison(self, employee_id: str) -> Dict[str, Any]:
        """
        Compare employee performance with peers
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with comparison data
        """
        prompt = f"""Compare performance of employee ID: {employee_id} with their peers 
        (same role and level). Include: percentile ranking, areas of strength, 
        areas for improvement, peer average scores.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}

