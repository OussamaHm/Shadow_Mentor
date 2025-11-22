import json
import random
import requests
import datetime
import uuid

# --- CONFIGURATION ---
# 1. Credentials (Taken from your inputs)
TOKEN = "AstraCS:soSoZSZjxgMgvgbNSCQwOHOo:eb35fef8774c89e701aaf92259f2d7f83565f5ceb52c8950cd50a953cc7f759a"
DB_ID = "e343a5b2-d79c-4339-bc24-19ee6f8e1c88"
REGION = "us-east1"
KEYSPACE = "shadow_mentor"  # ⚠️ UPDATED to match your screenshot
COLLECTION = "employees"

# 2. API Setup
BASE_URL = f"https://{DB_ID}-{REGION}.apps.astra.datastax.com/api/json/v1/{KEYSPACE}"
COLLECTION_URL = f"{BASE_URL}/{COLLECTION}"

HEADERS = {
    "Content-Type": "application/json",
    "Token": TOKEN
}

# --- STEP 1: CREATE COLLECTION (Idempotent) ---
def ensure_collection_exists():
    print(f"🔍 Checking/Creating collection '{COLLECTION}' in keyspace '{KEYSPACE}'...")
    
    # We try to create it. If it exists, the API usually ignores or returns an error we can skip.
    payload = {"createCollection": {"name": COLLECTION}}
    
    try:
        response = requests.post(BASE_URL, headers=HEADERS, json=payload)
        if response.status_code == 200:
            print("   ✅ Collection ready.")
        else:
            # It might already exist or there's a permission issue. We'll try to proceed.
            print(f"   ℹ️  Note: Creation status {response.status_code} (It might already exist). Proceeding...")
    except Exception as e:
        print(f"   ❌ Error checking collection: {e}")

# --- STEP 2: GENERATE DATA ---
names_source = {
    "Moroccan": { "first": ["Mohammed", "Youssef", "Amin", "Fatima", "Khadija", "Omar", "Zineb", "Hassan"], "last": ["Benali", "Idrissi", "Tazi", "Berrada", "Chraibi", "Alami"] },
    "Pakistani_Indian": { "first": ["Aarav", "Aditya", "Arjun", "Sai", "Priya", "Ananya", "Ahmed", "Bilal", "Zainab"], "last": ["Patel", "Sharma", "Singh", "Khan", "Ali", "Raja", "Malik"] },
    "Mexican": { "first": ["Santiago", "Mateo", "Leonardo", "Jose", "Maria", "Sofia", "Valentina"], "last": ["Garcia", "Rodriguez", "Hernandez", "Lopez", "Martinez", "Perez"] },
    "American_European": { "first": ["James", "Robert", "Michael", "David", "Emma", "Olivia", "Lars", "Sven"], "last": ["Smith", "Johnson", "Williams", "Brown", "Miller", "Muller", "Schmidt"] }
}
roles = ["Software Engineer", "Data Scientist", "HR Manager", "Financial Analyst", "Product Owner", "DevOps Engineer"]
contracts = ["Permanent contract", "Freelance", "Internship"]
countries_map = {"Moroccan": "Morocco", "Pakistani_Indian": "India", "Mexican": "Mexico", "American_European": "USA"}

def generate_employee():
    origin = random.choice(list(names_source.keys()))
    f_name = random.choice(names_source[origin]["first"])
    l_name = random.choice(names_source[origin]["last"])
    country = countries_map[origin]
    
    hire_date = datetime.date(2019, 1, 1) + datetime.timedelta(days=random.randint(0, 1500))
    los_days = (datetime.date.today() - hire_date).days
    
    return {
        "_id": str(uuid.uuid4()),
        "name": f"{f_name} {l_name}",
        "role": random.choice(roles),
        "level": random.choice(["Junior", "Senior"]),
        "salary": random.randint(40000, 130000),
        "hire_date": hire_date.isoformat(),
        "email": f"{f_name.lower()}.{l_name.lower()}@shadowmentor.com",
        "country_of_birth": country,
        "contract_type": random.choice(contracts),
        "gender": random.choice(["Male", "Female"]),
        "length_of_service_days": los_days
    }

# --- STEP 3: INSERT DATA IN CHUNKS ---
def run():
    ensure_collection_exists()
    
    print("\n📦 Generating 60 employees...")
    employees = [generate_employee() for _ in range(60)]
    
    # Batch size MUST be <= 20 for Astra Data API
    BATCH_SIZE = 20
    
    for i in range(0, len(employees), BATCH_SIZE):
        batch = employees[i : i + BATCH_SIZE]
        print(f"   📤 Uploading batch {i//BATCH_SIZE + 1} ({len(batch)} records)...")
        
        payload = { "insertMany": { "documents": batch } }
        
        response = requests.post(COLLECTION_URL, headers=HEADERS, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            inserted_ids = data.get('status', {}).get('insertedIds', [])
            
            if inserted_ids:
                print(f"      ✅ Success! Inserted {len(inserted_ids)} records.")
            else:
                # If 200 OK but no IDs, print raw response to debug
                print(f"      ⚠️  200 OK but 0 inserted. Server said: {json.dumps(data)}")
        else:
            print(f"      ❌ Failed (Status {response.status_code}). Response: {response.text}")

if __name__ == "__main__":
    run()