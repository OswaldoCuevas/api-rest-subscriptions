import { pool } from '../db.js';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Mazatlan');
export const getSubscriptionsStatus = async (req, res) => {
    const id = req.params.id;
     try {
         const [rows] = await pool.query('SELECT * FROM status_subscriptions where id_application = ?  ;',[id]);
         res.json(rows);  
     } catch (error) {
         return res.status(500).send("Error en el servidor porfavor intenta más tarde");
     }
}
export const deleteSubscriptionsActive = async (req, res) => {
    const {id_user, id_application} = req.params;
     try {
         const [rows] = await pool.query('SELECT * FROM subscriptions_view where id_user = ? and id_application = ? order by date_ending desc; ;',[id_user,id_application]);
         if(rows.length > 0 ) { 
         try {
            const [array]  = await pool.query('DELETE FROM subscriptions WHERE (id = ?);',[rows[0].id]);
            res.json("delete");
         } catch (error) {
            return res.status(500).send("Error en el servidor porfavor intenta más tarde")
         }
        }else{
            res.json( [] );
        }
     } catch (error) {
         return res.status(500).send("Error en el servidor porfavor intenta más tarde")
     }
}
export const  getSubscriptionsForMonth = async (req, res) =>{
    const id_application = req.params.id_application;
    const year = req.params.year;
    const month = req.params.month;
    try {
        const [rows] = await pool.query('SELECT * FROM subscriptions_view where month(date_start) = ? and year(date_start) = ? AND id_application=? order by date_start desc;',[month,year,id_application]);
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde");
    }

}
export const  getSubscriptionsForYear = async (req, res) =>{
    const id_application = req.params.id_application;
    const year = req.params.year;

    try {
        const [rows] = await pool.query('SELECT * FROM subscriptions_view where  year(date_start) = ? AND id_application=?;',[year,id_application]);
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde");
    }

}
export const  getSubscriptionsAll = async (req, res) =>{
    const id_application = req.params.id_application;
    try {
        const [rows] = await pool.query('SELECT * FROM subscriptions_view where id_application = ?;',[id_application]);
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde");
    }

}
export const  getDailyPaymentsMonth = async (req, res) =>{
    const id_application = req.params.id_application;
    const year = req.params.year;
    const month = req.params.month;
    try {
        const [rows] = await pool.query('select * from daily_payments where year = ? and month = ? and id_application = ?',[year,month,id_application]);
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde");
    }

}

export const  getDailyPaymentsYear = async (req, res) =>{
    const id_application = req.params.id_application;
    const year = req.params.year;

    try {
        const [rows] = await pool.query('select * from daily_payments where year = ? and id_application = ?',[year,id_application]);
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde");
    }

}
export const  getDailyPayments = async (req, res) =>{
    const id_application = req.params.id_application;


    try {
        const [rows] = await pool.query('select * from daily_payments where  id_application = ?',[id_application]);
        res.json(rows);  
    } catch (error) {
        return res.status(500).send("Error en el servidor porfavor intenta más tarde");
    }

}
export const getSubscriptionsUserApp = async (req, res) => {
  
    const id_user = req.params.id_user;
    const id_application = req.params.id_application;
     try {
         const [rows] = await pool.query('SELECT * FROM subscriptions_view where id_application = ? and id_user= ? order by date_ending desc ; ;',[id_application,id_user]);
         res.json(rows);  
     } catch (error) {
         return res.status(500).send("Error en el servidor porfavor intenta más tarde")
     }
    
   
}
export const addSubscription = async (req, res) => {
    const {id_application, id_user} = req.body;
    
    const dateNow = moment();
    const date_start = dateNow.format('YYYY-MM-DD HH:mm:ss');
    const date30Days = moment().add(30, 'days');
    const date_ending = date30Days.format('YYYY-MM-DD HH:mm:ss');
        try {
            const [applications] = await pool.query('Select * from applications_view where id = ?' , [id_application]);
            try {
                const values = [id_application, id_user, date_start, date_ending, applications[0].price];
                const [rows] = await pool.query('INSERT INTO subscriptions (id_application, id_user, date_start, date_ending, payment) VALUES (?,?,?,?,?);',values);
                res.send({id:rows.insertId});  
            } catch (error) {
                 return res.status(500).send("Error en el servidor porfavor intenta más tarde")
            }
        } catch (error) {
            return res.status(500).send("Error en el servidor porfavor intenta más tarde")
        }
     
    
    
   
}