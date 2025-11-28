import mysql from 'mysql2/promise'
const db= await mysql.createConnection(
       {
        host: 'localhost',
        user: 'root',
        password: 'Root1234@',
        database: 'details'
    }
)
console.log('db connected successful')
try{
 await db.query(
` CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(15),
    date_of_birth DATE,
    gender VARCHAR(10),
   department VARCHAR(50),
   department_id INT,
    admission_date DATE,
    city VARCHAR(50)             
    );`
 )
    await db.query(`CREATE TABLE IF NOT EXISTS department (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100)
);`
 )
 await db.query(
    `CREATE TABLE IF NOT EXISTS staff (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  staff_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone_number VARCHAR(15),
  hire_date DATE,
  position VARCHAR(100),
  gender ENUM('Male', 'Female', 'Other'),
  salary DECIMAL(10,2),
  department_id INT,
  department VARCHAR(30),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);`

 )
 await db.query(
`    CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('superadmin','admin','staff') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

 )

console.log('table created successful')}
catch (err){
   console.log(err.message)
}

export const queryExec = async (queryStr,queryOption=[]) =>{
    try{
        const [result]= await db.execute(queryStr,queryOption)
        return result
    }
    catch(err){
        console.log('query error', err)
        throw err
    }
}