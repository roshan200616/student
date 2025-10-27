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
    gender ENUM('Male', 'Female', 'Other'),
   department VARCHAR(50),
    admission_date DATE,
    city VARCHAR(50)             
    );`
 )

console.log('table created successful')}
catch (err){
   console.log(err.message)
}

export const queryExec = async (queryStr,queryOption) =>{
    try{
        const [result]= await db.execute(queryStr,queryOption)
        return result
    }
    catch(err){
        console.log('query error')
        throw err
    }
}