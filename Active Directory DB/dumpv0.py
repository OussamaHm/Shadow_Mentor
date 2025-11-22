import json
import requests

# --- CONFIGURATION (Same as your previous script) ---
TOKEN = "AstraCS:soSoZSZjxgMgvgbNSCQwOHOo:eb35fef8774c89e701aaf92259f2d7f83565f5ceb52c8950cd50a953cc7f759a"
DB_ID = "e343a5b2-d79c-4339-bc24-19ee6f8e1c88"
REGION = "us-east1"
KEYSPACE = "shadow_mentor"
COLLECTION = "staff_directory"

# API URL
BASE_URL = f"https://{DB_ID}-{REGION}.apps.astra.datastax.com/api/json/v1/{KEYSPACE}/{COLLECTION}"
HEADERS = {
    "Content-Type": "application/json",
    "Token": TOKEN
}

def fetch_all_documents():
    print(f"📥 Fetching all data from '{COLLECTION}'...")
    
    all_documents = []
    page_state = None
    page_count = 0

    while True:
        # Construct the query
        payload = {
            "find": {
                "filter": {} # Empty filter means "get everything"
            }
        }

        # If we have a next page token, add it to the request
        if page_state:
            payload["find"]["options"] = {"pageState": page_state}

        try:
            response = requests.post(BASE_URL, headers=HEADERS, json=payload)
            
            if response.status_code == 200:
                data = response.json()
                docs = data.get('data', {}).get('documents', [])
                all_documents.extend(docs)
                
                # Check if there are more pages
                page_state = data.get('data', {}).get('nextPageState')
                page_count += 1
                print(f"   Using Page {page_count}: Retrieved {len(docs)} records...")
                
                # If no page_state is returned, we are done
                if not page_state:
                    break
            else:
                print(f"❌ Error fetching data: {response.status_code}")
                print(response.text)
                break
                
        except Exception as e:
            print(f"❌ Connection error: {e}")
            break

    return all_documents

# --- EXECUTION ---
if __name__ == "__main__":
    employees = fetch_all_documents()
    
    total_count = len(employees)
    print(f"\n✅ Total Documents Found: {total_count}")

    if total_count > 0:
        # 1. Print the first 3 records as a preview
        print("\n--- PREVIEW (First 3 Records) ---")
        for emp in employees[:3]:
            print(f"- {emp.get('name', 'N/A')} | {emp.get('role', 'N/A')} | {emp.get('email', 'N/A')}")
        
        # 2. Save EVERYTHING to a file
        filename = "full_db_dump.json"
        with open(filename, "w") as f:
            json.dump(employees, f, indent=4)
        
        print(f"\n💾 Full dump saved to: {filename}")
    else:
        print("⚠️ The database appears to be empty.")