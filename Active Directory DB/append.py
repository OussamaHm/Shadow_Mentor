import pandas as pd
import os

# 1. DEFINE THE KNOWLEDGE BASE (The Certifications & Rules)
# This dictionary maps the 'Role' found in your CSV to the specific learning path data.
CAREER_PATHS = {
    "Software Engineer": {
        "Target_Certifications": "Microsoft AZ-204, AWS Developer Associate, Oracle Java SE, Google Professional Cloud Developer",
        "Prerequisites": "Programming basics, OOP, data structures",
        "Difficulty": "Medium",
        "Estimated_Duration": "3–6 months",
        "Average_Salary_Range": "$80k–$140k/year"
    },
    "Data Scientist": {
        "Target_Certifications": "IBM Data Science, Google Data Analytics, Microsoft DP-100, AWS Machine Learning Specialty",
        "Prerequisites": "Python, statistics, ML basics",
        "Difficulty": "High",
        "Estimated_Duration": "4–8 months",
        "Average_Salary_Range": "$90k–$150k/year"
    },
    "HR Manager": {
        "Target_Certifications": "SHRM-CP, PHR, CIPD Level 3/5",
        "Prerequisites": "HR fundamentals, business laws",
        "Difficulty": "Medium",
        "Estimated_Duration": "2–4 months",
        "Average_Salary_Range": "$60k–$100k/year"
    },
    "Financial Analyst": {
        "Target_Certifications": "CFA Level 1–3, FRM, FMVA",
        "Prerequisites": "Finance basics, accounting, Excel",
        "Difficulty": "Very High",
        "Estimated_Duration": "6–24 months",
        "Average_Salary_Range": "$70k–$150k/year"
    },
    "Product Owner": {
        "Target_Certifications": "Scrum.org PSPO, Scrum Alliance CSPO, SAFe POPM",
        "Prerequisites": "Agile/Scrum knowledge",
        "Difficulty": "Low–Medium",
        "Estimated_Duration": "1–2 months",
        "Average_Salary_Range": "$80k–$130k/year"
    },
    "DevOps Engineer": {
        "Target_Certifications": "AWS DevOps Pro, Azure DevOps, Docker + Kubernetes CKA",
        "Prerequisites": "Linux, scripting, cloud basics",
        "Difficulty": "High",
        "Estimated_Duration": "4–7 months",
        "Average_Salary_Range": "$90k–$150k/year"
    },
    "Marketing Lead": {
        "Target_Certifications": "Google Ads, Google Analytics, HubSpot Marketing, Meta Blueprint",
        "Prerequisites": "Digital marketing basics",
        "Difficulty": "Low–Medium",
        "Estimated_Duration": "1–3 months",
        "Average_Salary_Range": "$60k–$110k/year"
    },
    "Sales Manager": {
        "Target_Certifications": "Certified Professional Sales Leader (CPSL), HubSpot Sales, Sandler Sales Training",
        "Prerequisites": "Sales fundamentals, communication skills",
        "Difficulty": "Medium",
        "Estimated_Duration": "2–4 months",
        "Average_Salary_Range": "$70k–$120k/year"
    },
    "Business Analyst": {
        "Target_Certifications": "IIBA ECBA/CCBA/CBAP, PMI-PBA, Agile BA",
        "Prerequisites": "Business process basics, modeling",
        "Difficulty": "Medium",
        "Estimated_Duration": "2–5 months",
        "Average_Salary_Range": "$70k–$120k/year"
    },
    "Project Manager": {
        "Target_Certifications": "PMP, PRINCE2, Scrum Master",
        "Prerequisites": "Project management experience",
        "Difficulty": "High",
        "Estimated_Duration": "3–6 months",
        "Average_Salary_Range": "$90k–$140k/year"
    },
    "QA Engineer": {
        "Target_Certifications": "ISTQB Foundation, Certified Agile Tester, Selenium Automation Certification",
        "Prerequisites": "Testing fundamentals, basic scripting",
        "Difficulty": "Medium",
        "Estimated_Duration": "2–4 months",
        "Average_Salary_Range": "$60k–$100k/year"
    },
    "UX Designer": {
        "Target_Certifications": "Google UX, NNGroup UX Certification, Interaction Design Foundation Certificates",
        "Prerequisites": "Design basics, Figma knowledge",
        "Difficulty": "Medium",
        "Estimated_Duration": "2–5 months",
        "Average_Salary_Range": "$70k–$120k/year"
    }
}

# ALIAS MAPPING
# Your CSV uses 'Sales Lead' but the definition was 'Sales Manager'.
# This map handles those variations so data isn't lost.
ROLE_ALIASES = {
    "Sales Lead": "Sales Manager",
    "Software Developer": "Software Engineer"
}

def process_csv():
    input_filename = 'employees.csv'
    output_filename = 'master_agent_knowledge.csv'

    if not os.path.exists(input_filename):
        print(f"Error: '{input_filename}' not found. Please make sure the file is in this folder.")
        return

    print(f"Reading {input_filename}...")
    try:
        df = pd.read_csv(input_filename)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    # Define a helper function to apply to each row
    def get_enrichment_data(row):
        role_name = row.get('role', '').strip()
        
        # Check for alias (e.g., convert 'Sales Lead' -> 'Sales Manager')
        if role_name in ROLE_ALIASES:
            role_name = ROLE_ALIASES[role_name]
            
        # Fetch data from dictionary
        data = CAREER_PATHS.get(role_name)
        
        if data:
            return pd.Series([
                data['Target_Certifications'],
                data['Prerequisites'],
                data['Difficulty'],
                data['Estimated_Duration'],
                data['Average_Salary_Range']
            ])
        else:
            # Fallback if role is not found in our knowledge base
            return pd.Series(["General Onboarding", "None", "Low", "1 month", "N/A"])

    # Apply the function to create new columns
    new_columns = ['Target_Certifications', 'Prerequisites', 'Difficulty', 'Estimated_Duration', 'Average_Salary_Range']
    
    print("Merging employee records with certification paths...")
    df[new_columns] = df.apply(get_enrichment_data, axis=1)

    # Save to new CSV
    df.to_csv(output_filename, index=False)
    print(f"Success! Created '{output_filename}' with {len(df)} rows.")
    print("Upload this new file to your IBM Watsonx Agent Knowledge Base.")

if __name__ == "__main__":
    process_csv()