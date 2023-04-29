import { pool } from '../db.js';

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users_view; ');
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde")
    }
}
export const addUser = async (req, res) => {
    const {username, email, password} = req.body;
   try{
    const [rows] = await pool.query('SELECT * FROM users_view where email = ?; ',[email] );
      if(rows < 1) {
        try {
            const values = [username, email, password];
            const [rows] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, sha(?));',values);
            res.send({id:rows.insertId});
            
        } catch (error) {
            return res.status(500).send("Error en el servidor porfavor intenta más tarde")
        }
      }else{
         res.status(400).send({error:'User already exists'});
      } 
    }catch (error){
        return res.status(500).send("Error en el servidor porfavor intenta más tarde")
    }
    
   
}