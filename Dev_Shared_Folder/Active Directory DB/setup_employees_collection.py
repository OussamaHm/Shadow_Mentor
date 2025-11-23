import json
import random
import requests
import datetime
import uuid
import time

# --- CONFIGURATION ---
TOKEN = "AstraCS:soSoZSZjxgMgvgbNSCQwOHOo:eb35fef8774c89e701aaf92259f2d7f83565f5ceb52c8950cd50a953cc7f759a"
DB_ID = "e343a5b2-d79c-4339-bc24-19ee6f8e1c88"
REGION = "us-east1"
KEYSPACE = "shadow_mentor"
COLLECTION = "employees"

BASE_URL = f"https://{DB_ID}-{REGION}.apps.astra.datastax.com/api/json/v1/{KEYSPACE}"
HEADERS = {"Content-Type": "application/json", "Token": TOKEN}

# --- 1. CREATE COLLECTION ---
def create_collection():
    print(f"🔨 Creating collection '{COLLECTION}'...")
    
    payload = {
        "createCollection": {
            "name": COLLECTION
        }
    }
    
    response = requests.post(BASE_URL, headers=HEADERS, json=payload)
    
    if response.status_code == 200:
        print("   ✅ Collection created successfully.")
    else:
        # If it fails, it might already exist - that's okay
        print(f"   ℹ️  Collection status: {response.text}")

# --- 2. DATA GENERATION ---
names_source = {
    "Moroccan": { 
        "first": ["Mohammed", "Youssef", "Amin", "Fatima", "Khadija", "Omar", "Zineb", "Hassan", "Layla", "Mehdi"], 
        "last": ["Benali", "Idrissi", "Tazi", "Berrada", "Chraibi", "Alami", "El Fassi", "Bennani", "Alaoui"] 
    },
    "Pakistani_Indian": { 
        "first": ["Aarav", "Aditya", "Arjun", "Sai", "Priya", "Ananya", "Ahmed", "Bilal", "Zainab", "Rohan", "Kiran"], 
        "last": ["Patel", "Sharma", "Singh", "Khan", "Ali", "Raja", "Malik", "Gupta", "Kumar", "Desai"] 
    },
    "Mexican": { 
        "first": ["Santiago", "Mateo", "Leonardo", "Jose", "Maria", "Sofia", "Valentina", "Diego", "Carlos", "Ana"], 
        "last": ["Garcia", "Rodriguez", "Hernandez", "Lopez", "Martinez", "Perez", "Sanchez", "Torres", "Ramirez"] 
    },
    "American_European": { 
        "first": ["James", "Robert", "Michael", "David", "Emma", "Olivia", "Lars", "Sven", "Anna", "Sarah", "John"], 
        "last": ["Smith", "Johnson", "Williams", "Brown", "Miller", "Muller", "Schmidt", "Anderson", "Taylor", "Wilson"] 
    }
}

roles = [
    "Software Engineer", "Data Scientist", "HR Manager", "Financial Analyst", 
    "Product Owner", "DevOps Engineer", "Marketing Lead", "Sales Manager",
    "Business Analyst", "Project Manager", "QA Engineer", "UX Designer"
]

certifications_list = [
    "AWS Certified Solutions Architect", "Google Cloud Professional", "Microsoft Azure Certified",
    "PMP Certification", "Scrum Master", "CISSP", "Oracle Certified Professional",
    "Salesforce Certified", "Kubernetes Administrator", "Docker Certified",
    "CompTIA Security+", "ITIL Foundation", "Six Sigma Green Belt", "None"
]

supervisory_orgs = [
    "Engineering Division", "Sales & Marketing", "Human Resources", 
    "Finance & Accounting", "Operations", "Product Development", "IT Services"
]

contract_types = ["Permanent contract", "Freelance", "Internship"]

countries_map = {
    "Moroccan": "Morocco", 
    "Pakistani_Indian": "India", 
    "Mexican": "Mexico", 
    "American_European": "USA"
}

# Generate manager names (will be assigned randomly)
manager_pool = []

def generate_employee_record(index, all_employees):
    origin = random.choice(list(names_source.keys()))
    f_name = random.choice(names_source[origin]["first"])
    l_name = random.choice(names_source[origin]["last"])
    full_name = f"{f_name} {l_name}"
    
    # Generate date of birth (between 25 and 55 years ago)
    birth_year = random.randint(1969, 1999)
    birth_month = random.randint(1, 12)
    birth_day = random.randint(1, 28)
    date_of_birth = datetime.date(birth_year, birth_month, birth_day)
    
    # Generate hire date (between 2018 and 2024)
    hire_date = datetime.date(2018, 1, 1) + datetime.timedelta(days=random.randint(0, 2200))
    
    # Calculate length of service
    today = datetime.date.today()
    length_of_service_days = (today - hire_date).days
    
    # Time in job profile (usually less than or equal to length of service)
    time_in_job_profile_days = random.randint(30, min(length_of_service_days, 2000))
    
    # Assign level (junior/senior)
    level = random.choice(["Junior", "Senior"])
    
    # Salary based on level and role
    if level == "Senior":
        salary = random.randint(80000, 150000)
    else:
        salary = random.randint(40000, 90000)
    
    # Assign certifications (0-3 certifications per employee)
    num_certs = random.randint(0, 3)
    certifications = random.sample(certifications_list, num_certs) if num_certs > 0 else []
    
    # Assign manager (if there are previous employees, randomly assign one as manager)
    manager = None
    if len(all_employees) > 0 and random.random() > 0.3:  # 70% chance of having a manager
        manager = random.choice(all_employees)["name"]
    
    # Generate work address
    country = countries_map[origin]
    work_address = f"{random.randint(100, 9999)} {random.choice(['Business Park', 'Tech Boulevard', 'Corporate Plaza', 'Innovation Center'])}, {random.choice(['Downtown', 'Midtown', 'Business District'])}, {country}"
    
    return {
        "id": f"EMP-{1000 + index}",
        "name": full_name,
        "role": random.choice(roles),
        "level": level,
        "salary": salary,
        "certifications": certifications,
        "length_of_service_days": length_of_service_days,
        "time_in_job_profile_days": time_in_job_profile_days,
        "hire_date": hire_date.isoformat(),
        "email": f"{f_name.lower()}.{l_name.lower()}@shadowmentor.com",
        "work_address": work_address,
        "supervisory_organization": random.choice(supervisory_orgs),
        "manager": manager,
        "contract_type": random.choice(contract_types),
        "gender": random.choice(["Male", "Female", "Other"]),
        "date_of_birth": date_of_birth.isoformat(),
        "country_of_birth": country
    }

# --- 3. POPULATE COLLECTION ---
def populate_collection():
    print("📦 Generating 60 employee records...")
    
    all_employees = []
    employees = []
    
    # Generate all employees first to enable manager assignment
    for i in range(60):
        employee = generate_employee_record(i, all_employees)
        employees.append(employee)
        all_employees.append(employee)
    
    # Now update manager assignments with full employee list
    for i, employee in enumerate(employees):
        if random.random() > 0.3:  # 70% chance of having a manager
            # Exclude self and pick from other employees
            potential_managers = [e for e in all_employees if e["id"] != employee["id"]]
            if potential_managers:
                employee["manager"] = random.choice(potential_managers)["name"]
    
    # Insert into collection
    url = f"{BASE_URL}/{COLLECTION}"
    
    # Upload in batches of 20
    for i in range(0, len(employees), 20):
        batch = employees[i : i + 20]
        batch_num = i // 20 + 1
        print(f"   📤 Uploading batch {batch_num} ({len(batch)} employees)...")
        
        payload = {"insertMany": {"documents": batch}}
        resp = requests.post(url, headers=HEADERS, json=payload)
        
        if resp.status_code == 200:
            print(f"      ✅ Batch {batch_num} uploaded successfully")
        else:
            print(f"      ❌ Batch {batch_num} failed: {resp.text}")
            try:
                error_detail = resp.json()
                print(f"      Error details: {json.dumps(error_detail, indent=2)}")
            except:
                pass
    
    print(f"\n🎉 DONE! Collection '{COLLECTION}' populated with {len(employees)} employees.")
    print(f"\n📊 Sample employee record:")
    print(json.dumps(employees[0], indent=2))

# --- 4. MAIN EXECUTION ---
if __name__ == "__main__":
    print("=" * 60)
    print("🚀 Astra DB Collection Setup - Employees")
    print("=" * 60)
    print()
    
    # Step 1: Create collection
    create_collection()
    time.sleep(2)  # Brief pause after creation
    
    print()
    
    # Step 2: Populate with data
    populate_collection()
    
    print()
    print("=" * 60)
    print("✅ Setup Complete!")
    print("=" * 60)

