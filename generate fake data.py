import pandas as pd
import random
from faker import Faker

# Initialize Faker
fake = Faker()

# Define the constants
departments = ['AS007', 'AS008', 'AS009', 'AS010', 'AS011', 'AS012', 
               'AS013', 'AS014', 'AS015', 'AS016', 'AS017', 'AS018']
education_levels = ['master', 'bachelor', 'Phd or higher', 'High school', 'lower than high school']
reasons_for_leaving = ['Unwilling to disclose', 'No promotion', 'Workplace Bullying', 
                       'Low salary', 'Personal or family reasons']
change_career_options = ['Y', 'N', 'unknown']
ranks = ['A001', 'A002', 'A003', 'B001', 'B002', 'B003', 'C001', 'C002', 'C003']

# Helper function to generate random dates
def random_date(start, end):
    start_date = pd.to_datetime(start)
    end_date = pd.to_datetime(end)
    return fake.date_between(start_date=start_date, end_date=end_date)

# Generate the data
data = {
    'staff_id': [f'TB{str(i).zfill(7)}' for i in range(1, 300001)],
    'department': [random.choice(departments) for _ in range(300000)],
    'Age_of_leaving_job': [random.randint(20, 60) for _ in range(300000)],
    'if_internal_referance': [random.choice([True, False]) for _ in range(300000)],
    'highest_education': [random.choice(education_levels) for _ in range(300000)],
    'Reason_for_leaving': [random.choice(reasons_for_leaving) for _ in range(300000)],
    'Time_of_leaving': [random_date('2016-01-01', '2024-07-01') for _ in range(300000)],
    'if_change_career': [random.choice(change_career_options) for _ in range(300000)],
    'Rank': [random.choice(ranks) for _ in range(300000)]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save to a CSV file
df.to_csv('staff_data.csv', index=False)