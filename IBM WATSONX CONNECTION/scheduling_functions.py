"""
Scheduling and calendar functions for Watson Agent
Handles daily tasks, meetings, and predictive scheduling
"""
from watson_connection import WatsonAgentConnection
from typing import Dict, Any, List
import json
from datetime import datetime, timedelta

class SchedulingFunctions:
    """Functions for scheduling-related queries"""
    
    def __init__(self, agent_connection: WatsonAgentConnection):
        self.agent = agent_connection
    
    def get_daily_tasks(self, employee_id: str, date: str = None) -> Dict[str, Any]:
        """
        Get daily tasks for an employee
        
        Args:
            employee_id: Employee ID
            date: Date in YYYY-MM-DD format (default: today)
            
        Returns:
            Dict with daily tasks
        """
        if not date:
            date = datetime.now().strftime("%Y-%m-%d")
        
        prompt = f"""Get daily tasks for employee ID: {employee_id} on date: {date}. 
        Include: list of tasks with status (completed/pending), priority, 
        estimated time, related project or certification.
        Return as JSON object with tasks array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id, "date": date}
    
    def get_meetings(self, employee_id: str, start_date: str = None, end_date: str = None) -> Dict[str, Any]:
        """
        Get scheduled meetings for an employee
        
        Args:
            employee_id: Employee ID
            start_date: Start date in YYYY-MM-DD format (default: today)
            end_date: End date in YYYY-MM-DD format (default: 7 days from start)
            
        Returns:
            Dict with meetings list
        """
        if not start_date:
            start_date = datetime.now().strftime("%Y-%m-%d")
        if not end_date:
            end_date = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
        
        prompt = f"""Get scheduled meetings for employee ID: {employee_id} 
        from {start_date} to {end_date}. 
        Include: meeting title, date, time, duration, type (daily/weekly/bi-weekly/as needed), 
        participants, status (on-time/delayed/cancelled), location or link.
        Return as JSON object with meetings array."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_predictive_clock(self, employee_id: str) -> Dict[str, Any]:
        """
        Get predictive clock showing if employee might be late or working slower than average
        
        Args:
            employee_id: Employee ID
            
        Returns:
            Dict with predictive analysis
        """
        prompt = f"""Analyze predictive clock for employee ID: {employee_id}. 
        Check if they might be late for upcoming meetings, if they're working slower 
        than their peers or average, current workload vs capacity, time management insights.
        Include: risk level (low/medium/high), specific warnings, recommendations.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def get_smart_calendar(self, employee_id: str, active_scheduling: bool = True) -> Dict[str, Any]:
        """
        Get smart calendar view (active or manual scheduling)
        
        Args:
            employee_id: Employee ID
            active_scheduling: Whether active (AI-driven) or manual scheduling is enabled
            
        Returns:
            Dict with calendar information
        """
        mode = "active AI-driven" if active_scheduling else "manual"
        prompt = f"""Get smart calendar for employee ID: {employee_id} with {mode} scheduling. 
        Include: today's schedule, upcoming meetings, daily tasks, time blocks, 
        availability, conflicts, suggestions for optimization.
        Return as JSON object."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def add_task(self, employee_id: str, task: str, priority: str = "medium", due_date: str = None) -> Dict[str, Any]:
        """
        Add a new task to employee's schedule
        
        Args:
            employee_id: Employee ID
            task: Task description
            priority: Priority level (low/medium/high)
            due_date: Due date in YYYY-MM-DD format
            
        Returns:
            Dict with task confirmation
        """
        prompt = f"""Add task for employee ID: {employee_id}. 
        Task: {task}, Priority: {priority}, Due Date: {due_date or 'Not specified'}. 
        Confirm addition and return task details as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def update_task_status(self, employee_id: str, task_id: str, completed: bool) -> Dict[str, Any]:
        """
        Update task completion status
        
        Args:
            employee_id: Employee ID
            task_id: Task identifier
            completed: Whether task is completed
            
        Returns:
            Dict with updated task status
        """
        status = "completed" if completed else "pending"
        prompt = f"""Update task status for employee ID: {employee_id}, task ID: {task_id} to {status}. 
        Return updated task information as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}
    
    def schedule_meeting(self, employee_id: str, title: str, date: str, time: str, 
                        duration: int = 60, meeting_type: str = "as needed") -> Dict[str, Any]:
        """
        Schedule a new meeting
        
        Args:
            employee_id: Employee ID
            title: Meeting title
            date: Date in YYYY-MM-DD format
            time: Time in HH:MM format
            duration: Duration in minutes
            meeting_type: Type (daily/weekly/bi-weekly/as needed)
            
        Returns:
            Dict with meeting confirmation
        """
        prompt = f"""Schedule meeting for employee ID: {employee_id}. 
        Title: {title}, Date: {date}, Time: {time}, Duration: {duration} minutes, 
        Type: {meeting_type}. Confirm scheduling and return meeting details as JSON."""
        
        response = self.agent.query_agent(prompt)
        
        try:
            return json.loads(response)
        except:
            return {"raw_response": response, "employee_id": employee_id}

