import requests
import json

# IBM Watson Orchestrate API credentials
API_KEY = "c23bc2fe9ea418ba342609061fb69bb4ca276e422a0ef90745a32fe5b3d43464"
INSTANCE_ID = "3bc8278c-7cdd-48bd-b803-270980ed236c"
REGION = "eu-gb"

# Construct the API endpoint
API_URL = f"https://api.{REGION}.watson-orchestrate.cloud.ibm.com/instances/{INSTANCE_ID}/api/v1"

def send_message(user_message):
    """Send a message to Watson Orchestrate and get a response"""
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    payload = {
        "input": {
            "text": user_message
        }
    }
    
    try:
        response = requests.post(f"{API_URL}/chat/message", headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Status Code: {e.response.status_code}")
            print(f"Response: {e.response.text}")
        return None

if __name__ == "__main__":
    # Test the API connection
    result = send_message("Hello, how can I help you today?")
    if result:
        print("Success! Response:")
        print(json.dumps(result, indent=2))
    else:
        print("Failed to get a response from the API")