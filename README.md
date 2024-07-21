go to back_end root directory, create .env file follow .env_example, using your own postgresql database info: host= user= password= database=

execute the postgresql_script.sql to create table

pip install pandas faker using "generate fake data.py" to generate fake data to a csv file
you can either generate 300000 records then duplicate it using python pandas, then use copy command copy into database
or you can generate 300000 and import into database, and then use Cartesian product sql to duplicate in postgresql(postgresql_script.sql) for saving execution time in large volume dataset generation and import

import the dummy data to the table

go to the back_end folder, npm i all the dependencies, node ./api/server.js initiate the back_end server
go to front_end folder, npm i all the dependencies, npm start

home page: 
![image](https://github.com/user-attachments/assets/61e32614-3d8f-44e1-ad5c-66e75808217a)

Turnover by Department: 
![image](https://github.com/user-attachments/assets/2773716d-58b4-4e74-a20f-5c63e680a513)

Turnover by Age:
![image](https://github.com/user-attachments/assets/aa3625ac-91e8-418c-a498-6775db8a86b9)

Turnover by Month:
![image](https://github.com/user-attachments/assets/e7b25f97-344a-491e-8773-43c8fa288739)

Pivot table: 
![image](https://github.com/user-attachments/assets/59134da8-cf8b-4166-a8ab-b965b0d23de8)




