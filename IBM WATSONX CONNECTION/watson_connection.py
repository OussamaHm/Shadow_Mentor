"""
Core Watson Orchestrate Agent Connection Module
Handles session management and message sending
"""
import requests
import json
import time
from typing import Optional, Dict, Any
from config import API_URL, API_KEY, REQUEST_TIMEOUT, MAX_RETRIES, RETRY_DELAY

class WatsonAgentConnection:
    """Main class for connecting to IBM Watson Orchestrate Agent"""
    
    def __init__(self, agent_id: Optional[str] = None):
        """
        Initialize Watson Agent Connection
        
        Args:
            agent_id: Optional agent ID. If not provided, will be discovered.
        """
        self.api_url = API_URL
        self.api_key = API_KEY
        self.agent_id = agent_id
        self.session_id: Optional[str] = None
        self.session_headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
    
    def create_session(self) -> bool:
        """
        Create a new session with the Watson Agent
        
        Returns:
            bool: True if session created successfully, False otherwise
        """
        if not self.agent_id:
            # Try to discover agent ID from agent name
            self.agent_id = self._discover_agent_id()
            if not self.agent_id:
                print("Error: Could not discover agent ID. Please set it manually.")
                return False
        
        session_url = f"{self.api_url}/v2/agents/{self.agent_id}/sessions"
        
        try:
            response = requests.post(
                session_url,
                headers=self.session_headers,
                timeout=REQUEST_TIMEOUT
            )
            
            if response.status_code == 200 or response.status_code == 201:
                data = response.json()
                self.session_id = data.get('session_id') or data.get('id')
                if self.session_id:
                    print(f"✅ Session created: {self.session_id}")
                    return True
                else:
                    print(f"⚠️  Warning: No session_id in response: {data}")
                    return False
            else:
                print(f"❌ Failed to create session: {response.status_code}")
                print(f"Response: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Error creating session: {e}")
            return False
    
    def _discover_agent_id(self) -> Optional[str]:
        """
        Try to discover agent ID from agent name
        
        Returns:
            Optional[str]: Agent ID if found, None otherwise
        """
        # This is a placeholder - you may need to implement agent discovery
        # based on your Watson Orchestrate setup
        return None
    
    def send_message(self, message: str, retry: bool = True) -> Optional[Dict[str, Any]]:
        """
        Send a message to the Watson Agent
        
        Args:
            message: The message/prompt to send to the agent
            retry: Whether to retry on failure
            
        Returns:
            Optional[Dict]: Agent response as dictionary, or None on failure
        """
        if not self.session_id:
            if not self.create_session():
                return None
        
        message_url = f"{self.api_url}/v2/agents/{self.agent_id}/sessions/{self.session_id}/message"
        
        payload = {
            "input": {
                "text": message
            }
        }
        
        for attempt in range(MAX_RETRIES if retry else 1):
            try:
                response = requests.post(
                    message_url,
                    headers=self.session_headers,
                    json=payload,
                    timeout=REQUEST_TIMEOUT
                )
                
                if response.status_code == 200:
                    return response.json()
                elif response.status_code == 401:
                    # Session might have expired, try to recreate
                    if retry and attempt < MAX_RETRIES - 1:
                        print("Session expired, recreating...")
                        if self.create_session():
                            continue
                    return None
                else:
                    print(f"❌ Error sending message: {response.status_code}")
                    print(f"Response: {response.text}")
                    if not retry or attempt == MAX_RETRIES - 1:
                        return None
                    
            except requests.exceptions.RequestException as e:
                print(f"❌ Error sending message: {e}")
                if not retry or attempt == MAX_RETRIES - 1:
                    return None
                
            if retry and attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY * (attempt + 1))
        
        return None
    
    def extract_text_response(self, response: Dict[str, Any]) -> str:
        """
        Extract text response from agent response dictionary
        
        Args:
            response: Agent response dictionary
            
        Returns:
            str: Extracted text response
        """
        if not response:
            return "No response received from agent."
        
        # Try different response structures
        if 'output' in response:
            output = response['output']
            
            if 'generic' in output:
                texts = []
                for generic in output['generic']:
                    if generic.get('response_type') == 'text':
                        texts.append(generic.get('text', ''))
                if texts:
                    return '\n'.join(texts)
            
            if 'text' in output:
                return output['text']
            
            if 'message' in output:
                return output['message']
        
        # Check top-level fields
        if 'text' in response:
            return response['text']
        
        if 'message' in response:
            return response['message']
        
        if 'response' in response:
            return str(response['response'])
        
        # Fallback: return formatted JSON
        return json.dumps(response, indent=2)
    
    def query_agent(self, prompt: str) -> str:
        """
        Convenience method to send a prompt and get text response
        
        Args:
            prompt: The prompt/question to send
            
        Returns:
            str: Text response from agent
        """
        response = self.send_message(prompt)
        return self.extract_text_response(response)

