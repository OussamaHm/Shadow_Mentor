# Quick Start Guide

## Setup

1. **Install Dependencies**
   ```bash
   cd "IBM WATSONX CONNECTION"
   pip install -r requirements.txt
   ```

2. **Configure Agent ID** (if needed)
   - Edit `config.py` and set `AGENT_ID` if you know your agent ID
   - Otherwise, the connection will attempt to discover it

3. **Test Connection**
   ```bash
   python test_connection.py
   ```

4. **Start API Server**
   ```bash
   python start_server.py
   # OR
   python api_server.py
   ```

   The server will run on `http://localhost:5000`

## Frontend Integration

The frontend is already configured to use the API. Make sure:

1. The API server is running on `http://localhost:5000`
2. The frontend is running (usually `npm run dev`)
3. CORS is enabled (already configured in `api_server.py`)

## API Endpoints Summary

### Employee
- `GET /api/employee/<id>` - Get employee info
- `GET /api/employees` - Get all employees
- `GET /api/employee/<id>/project` - Get initial project

### Certifications
- `GET /api/certifications/roadmap/<role>` - Get roadmap
- `GET /api/employee/<id>/salary-insight?certification=<name>` - Get salary insight
- `GET /api/employee/<id>/certifications/followup` - Get follow-up

### Performance
- `GET /api/employee/<id>/performance` - Get performance score
- `GET /api/employee/<id>/project-monitoring` - Get project monitoring
- `GET /api/employee/<id>/tests` - Get test status

### Scheduling
- `GET /api/employee/<id>/tasks` - Get daily tasks
- `GET /api/employee/<id>/meetings` - Get meetings
- `GET /api/employee/<id>/predictive-clock` - Get predictive clock
- `GET /api/employee/<id>/calendar` - Get smart calendar

### Admin
- `GET /api/admin/dashboard` - Get dashboard overview
- `GET /api/admin/integration-gaps` - Get integration gaps
- `GET /api/admin/analytics` - Get analytics

## Troubleshooting

1. **Connection Issues**
   - Check that your API_KEY and API_URL are correct in `config.py`
   - Verify your agent ID is set correctly
   - Run `test_connection.py` to diagnose issues

2. **API Not Responding**
   - Ensure the server is running: `python start_server.py`
   - Check the console for error messages
   - Verify the port 5000 is not in use

3. **Frontend Can't Connect**
   - Check CORS settings in `api_server.py`
   - Verify API_BASE_URL in `src/utils/watsonApi.js` matches your server
   - Check browser console for CORS errors

## Example Usage

See `example_usage.py` for examples of using the functions directly in Python.

