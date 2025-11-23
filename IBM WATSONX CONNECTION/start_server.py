#!/usr/bin/env python3
"""
Startup script for Watson Agent API Server
"""
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from api_server import app

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Starting IBM Watson Orchestrate Agent API Server")
    print("=" * 60)
    print(f"📡 Server will run on: http://localhost:5000")
    print(f"📚 API Documentation: See README.md")
    print("=" * 60)
    print()
    
    try:
        app.run(host='0.0.0.0', port=5000, debug=True)
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped by user")
    except Exception as e:
        print(f"\n\n❌ Error starting server: {e}")
        sys.exit(1)

