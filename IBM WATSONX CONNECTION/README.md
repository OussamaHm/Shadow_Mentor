# IBM Watson Orchestrate Agent Connection

This folder contains scripts and functions to connect to the IBM Watson Orchestrate Agent (shadow_mentor) and provide various functionalities for the Shadow Mentor application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure your agent settings in `config.py`:
   - API_URL: Your Watson Orchestrate API endpoint
   - API_KEY: Your API key
   - AGENT_ID: Your agent ID (optional, can be auto-discovered)

## Structure

- `config.py`: Configuration settings
- `watson_connection.py`: Core connection class for Watson Agent
- `employee_functions.py`: Employee-related queries
- `certification_functions.py`: Certification and learning queries
- `performance_functions.py`: Performance tracking queries
- `scheduling_functions.py`: Calendar and scheduling queries
- `admin_functions.py`: Admin/HR dashboard queries
- `api_server.py`: Flask API server to expose functions to frontend

## Running the API Server

```bash
python api_server.py
```

The server will run on `http://localhost:5000`

## API Endpoints

### Employee Endpoints
- `GET /api/employee/<employee_id>` - Get employee information
- `GET /api/employees?role=<role>` - Get all employees or by role
- `GET /api/employee/<employee_id>/project` - Get initial project
- `POST /api/employee/<employee_id>/project` - Assign initial project

### Certification Endpoints
- `GET /api/certifications/roadmap/<role>` - Get certification roadmap
- `GET /api/employee/<employee_id>/salary-insight?certification=<name>` - Get salary insight
- `GET /api/employee/<employee_id>/certifications/followup` - Get certification follow-up
- `GET /api/certifications/role/<role>` - Get certifications for role

### Performance Endpoints
- `GET /api/employee/<employee_id>/performance` - Get performance score
- `GET /api/employee/<employee_id>/project-monitoring` - Get project monitoring
- `GET /api/employee/<employee_id>/tests` - Get test status
- `POST /api/employee/<employee_id>/tests` - Record test result

### Scheduling Endpoints
- `GET /api/employee/<employee_id>/tasks?date=<YYYY-MM-DD>` - Get daily tasks
- `POST /api/employee/<employee_id>/tasks` - Add task
- `PUT /api/employee/<employee_id>/tasks/<task_id>` - Update task
- `GET /api/employee/<employee_id>/meetings` - Get meetings
- `POST /api/employee/<employee_id>/meetings` - Schedule meeting
- `GET /api/employee/<employee_id>/predictive-clock` - Get predictive clock
- `GET /api/employee/<employee_id>/calendar?active=<true/false>` - Get smart calendar

### Admin Endpoints
- `GET /api/admin/dashboard` - Get dashboard overview
- `GET /api/admin/integration-gaps` - Get integration gaps
- `GET /api/admin/analytics?filters=<json>` - Get analytics
- `GET /api/admin/role-distribution` - Get role distribution
- `GET /api/admin/onboarding-progress?period=<period>` - Get onboarding progress

## Usage Examples

### Using the Functions Directly

```python
from watson_connection import WatsonAgentConnection
from employee_functions import EmployeeFunctions

# Initialize connection
agent = WatsonAgentConnection()
agent.create_session()

# Use employee functions
emp_funcs = EmployeeFunctions(agent)
employee_info = emp_funcs.get_employee_info("EMP-1001")
```

### Using the API

```javascript
// Frontend example
const response = await fetch('http://localhost:5000/api/employee/EMP-1001');
const employee = await response.json();
```

## Notes

- All functions send prompts to the Watson Agent and receive responses
- The agent has full access to employee data, certifications, and all system information
- Responses are parsed as JSON when possible, otherwise returned as raw text
- The API server includes CORS support for frontend integration

