#!/usr/bin/env python3
"""
Test script to verify Watson Agent connection
"""
from watson_connection import WatsonAgentConnection
from config import AGENT_NAME, API_URL

def test_connection():
    """Test basic connection to Watson Agent"""
    print("=" * 60)
    print("🧪 Testing Watson Agent Connection")
    print("=" * 60)
    print(f"Agent Name: {AGENT_NAME}")
    print(f"API URL: {API_URL}")
    print()
    
    # Initialize connection
    agent = WatsonAgentConnection()
    
    # Test session creation
    print("1. Testing session creation...")
    if agent.create_session():
        print("   ✅ Session created successfully")
        print(f"   Session ID: {agent.session_id}")
    else:
        print("   ❌ Failed to create session")
        return False
    
    print()
    
    # Test message sending
    print("2. Testing message sending...")
    test_message = "Hello, this is a test message. Please respond with 'Connection successful'."
    response = agent.send_message(test_message)
    
    if response:
        text_response = agent.extract_text_response(response)
        print("   ✅ Message sent successfully")
        print(f"   Response: {text_response[:200]}...")
    else:
        print("   ❌ Failed to send message")
        return False
    
    print()
    print("=" * 60)
    print("✅ All tests passed! Connection is working.")
    print("=" * 60)
    return True

if __name__ == '__main__':
    try:
        test_connection()
    except Exception as e:
        print(f"\n❌ Error during testing: {e}")
        import traceback
        traceback.print_exc()

