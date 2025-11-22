import json
import requests
import random
import datetime
import uuid

# --- CONFIGURATION ---
TOKEN = "AstraCS:soSoZSZjxgMgvgbNSCQwOHOo:eb35fef8774c89e701aaf92259f2d7f83565f5ceb52c8950cd50a953cc7f759a"
DB_ID = "e343a5b2-d79c-4339-bc24-19ee6f8e1c88"
REGION = "us-east1"
KEYSPACE = "shadow_mentor"
TABLE_NAME = "employees_table"

# URL for the REST API v2 (Data API for Tables)
BASE_URL = f"https://{DB_ID}-{REGION}.apps.astra.datastax.com/api/rest/v2/keyspaces/{KEYSPACE}/{TABLE_NAME}"

HEADERS = {
    "Content-Type": "application/json",
    "X-Cassandra-Token": TOKEN
}

# --- DATA GENERATION ---
names_source = {
    "Moroccan": { 
        "first": ["Karim", "Nadia", "Tarik", "Salma", "Rachid", "Leila", "Samir", "Yasmin", "Amine", "Soraya", "Khalid", "Dounia", "Rida", "Malika", "Anas", "Hiba"], 
        "last": ["Bouhaddi", "Mansouri", "Zaidi", "Fadili", "Kettani", "Bensaid", "Rachidi", "Lahlou", "Bennouna", "Tahiri", "Mekouar", "Bennis", "Bouaziz", "Lazrak", "Boujida", "Hamdaoui"] 
    },
    "Pakistan": { 
        "first": ["Faisal", "Hira", "Zain", "Aisha", "Hamza", "Saba", "Tariq", "Nida", "Bilal", "Zara", "Asad", "Mehwish", "Usama", "Saima", "Rizwan", "Hina"], 
        "last": ["Abbasi", "Chaudhry", "Mirza", "Baig", "Qureshi", "Hashmi", "Rashid", "Nawaz", "Javed", "Akhtar", "Siddiqui", "Mahmood", "Farooq", "Yousaf", "Rauf", "Tariq"] 
    },
    "Mexican": { 
        "first": ["Fernando", "Gabriela", "Ricardo", "Patricia", "Eduardo", "Monica", "Roberto", "Laura", "Francisco", "Carmen", "Javier", "Diana", "Manuel", "Andrea", "Luis", "Elena"], 
        "last": ["Vargas", "Mendoza", "Castillo", "Ramos", "Ortega", "Jimenez", "Vega", "Mora", "Silva", "Castro", "Reyes", "Medina", "Delgado", "Vasquez", "Contreras", "Guerrero"] 
    },
    "USA": { 
        "first": ["Alexander", "Victoria", "Benjamin", "Grace", "Nathaniel", "Lily", "Jonathan", "Chloe", "Samuel", "Natalie", "Andrew", "Emily", "Ryan", "Madison", "Tyler", "Hannah"], 
        "last": ["Mitchell", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell"] 
    }
}
roles = ["Software Engineer", "HR Manager", "Data Scientist", "Sales Lead", "DevOps Engineer"]
contracts = ["Permanent", "Freelance", "Internship"]
countries_map = {"Moroccan": "Morocco", "Pakistan": "Pakistan", "Mexican": "Mexico", "USA": "USA"}

def generate_row(used_ids, used_names):
    """
    Generate a unique employee row with no duplicate IDs or names.
    
    Args:
        used_ids: Set of already used IDs
        used_names: Set of already used full names
    
    Returns:
        Dictionary with employee data, or None if unable to generate unique entry
    """
    max_attempts = 500  # Increased attempts to ensure we find unique combinations
    attempt = 0
    
    while attempt < max_attempts:
        origin = random.choice(list(names_source.keys()))
        f_name = random.choice(names_source[origin]["first"])
        l_name = random.choice(names_source[origin]["last"])
        full_name = f"{f_name} {l_name}"
        
        # Check for duplicate name FIRST (before generating ID)
        if full_name in used_names:
            attempt += 1
            continue
        
        # Generate unique ID
        new_id = str(uuid.uuid4())
        if new_id in used_ids:
            attempt += 1
            continue
        
        # If we get here, we have unique ID and name
        hire_date = datetime.date(2019, 1, 1) + datetime.timedelta(days=random.randint(0, 1600))
        
        # Add to used sets BEFORE returning (to prevent duplicates)
        used_ids.add(new_id)
        used_names.add(full_name)
        
        return {
            "id": new_id,
            "name": full_name,
            "role": random.choice(roles),
            "level": random.choice(["Junior", "Senior"]),
            "email": f"{f_name.lower()}.{l_name.lower()}@shadowmentor.com",
            "salary": random.randint(40000, 140000),
            "country_of_birth": countries_map[origin],
            "contract_type": random.choice(contracts),
            "gender": random.choice(["Male", "Female"]),
            "hire_date": hire_date.isoformat(),
            "length_of_service_days": (datetime.date.today() - hire_date).days
        }
    
    # If we couldn't generate a unique entry after max attempts
    print(f"   ⚠️  Failed to generate unique name after {max_attempts} attempts")
    return None

# --- EXECUTION ---
print(f"🚀 Inserting 60 records into Table '{TABLE_NAME}'...")
print(f"🔗 Target: {BASE_URL}")

# Track used IDs and names to prevent duplicates
used_ids = set()
used_names = set()

success_count = 0
duplicate_attempts = 0

for i in range(60):
    row = generate_row(used_ids, used_names)
    
    if row is None:
        print(f"   ⚠️  Warning: Could not generate unique row after multiple attempts (row {i+1})")
        duplicate_attempts += 1
        continue
    
    response = requests.post(BASE_URL, headers=HEADERS, json=row)
    
    if response.status_code == 201:
        success_count += 1
        if (i+1) % 10 == 0:
            print(f"   ... {i+1} rows inserted (Last: {row['name']})")
    else:
        print(f"   ❌ Error on row {i+1}: {response.text}")

print(f"\n✅ Finished! Successfully inserted {success_count}/60 rows.")
if duplicate_attempts > 0:
    print(f"⚠️  Warning: {duplicate_attempts} rows could not be generated due to duplicate prevention.")
print(f"📊 Unique IDs generated: {len(used_ids)}")
print(f"📊 Unique names generated: {len(used_names)}")