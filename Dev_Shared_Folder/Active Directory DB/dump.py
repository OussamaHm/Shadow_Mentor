import json
import requests

# --- CONFIGURATION ---
TOKEN = "AstraCS:soSoZSZjxgMgvgbNSCQwOHOo:eb35fef8774c89e701aaf92259f2d7f83565f5ceb52c8950cd50a953cc7f759a"
DB_ID = "e343a5b2-d79c-4339-bc24-19ee6f8e1c88"
REGION = "us-east1"
KEYSPACE = "shadow_mentor"
TABLE_NAME = "employees_table"

BASE_URL = f"https://{DB_ID}-{REGION}.apps.astra.datastax.com/api/rest/v2/keyspaces/{KEYSPACE}/{TABLE_NAME}"
HEADERS = {
    "Content-Type": "application/json",
    "X-Cassandra-Token": TOKEN
}

def fetch_table_data():
    print(f"📥 Fetching rows from table '{TABLE_NAME}'...")
    
    all_rows = []
    page_state = None
    
    while True:
        # We assume 100 rows is enough to get all 60 in one go, 
        # but we add loop logic just in case.
        params = {"page-size": 100}
        if page_state:
            params["page-state"] = page_state
            
        response = requests.get(BASE_URL, headers=HEADERS, params=params)
        
        if response.status_code == 200:
            data = response.json()
            rows = data.get('data', [])
            all_rows.extend(rows)
            
            page_state = data.get('pageState')
            if not page_state:
                break
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            break
            
    return all_rows

if __name__ == "__main__":
    rows = fetch_table_data()
    print(f"\n✅ Total Rows Found: {len(rows)}")
    
    if len(rows) > 0:
        print("--- Preview First 3 ---")
        for r in rows[:3]:
            print(f" - {r.get('name')} | {r.get('country_of_birth')}")
            
        with open("table_dump.json", "w") as f:
            json.dump(rows, f, indent=4)
        print("\n💾 Saved to 'table_dump.json'")