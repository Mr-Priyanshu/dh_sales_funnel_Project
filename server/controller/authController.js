// const {users} = require('../data');
const {db} = require("../config/db");

const registerController = async (req, res, next) => {    
    try {
        const { name, number, email, password } = req.body;
        const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
        db.query(checkUserQuery, [email], (err, result) => {
            if (err) {
              res.status(500).json({ error: "Internal server error" });
            } else {
              if (result.length > 0) {      
                return res.status(201).json({
                  error: "User already exists.",
                });
              } else {
                const insertUserQuery = `INSERT INTO users (
                    name, number, email, password) VALUES (?, ?, ?, ?)`;
      
                const insertUserParams = [ name, number, email, password ];
      
                db.query(
                  insertUserQuery,
                  insertUserParams,
                  (err, result) => {
                    if (err) {
                      res.status(500).json({ error: "Internal server error" });
                    } else {
                      console.log("User registered successfully");
                      return res.status(200).json({
                        success: true,
                        data: result,
                        message: "User registered successfully",
                      });
                    }
                  }
                );
              }
            }
          });
    } catch (e) {
        console.log("error");
        res.status(500).json({ error: e.message });

    }
}

const loginController = async (req, res, next) => {
  console.log('in login Controller')
  
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
          return res.status(404).send({
            success: false,
            message: "Invalid email or password",
          });
        }
        const qry = `SELECT * FROM users WHERE email = ?`;
        db.query(qry,[email], async(err, result) => {
          if(err){
            return res.status(500).json({
              success: false,
              message: "Internal server error",
            });
          }
          const user = result[0];
          const match = user.password == password;
          if(!match) {
            res.status(400).send({message: 'password invalid'});
          }
          res.status(200).send({
          success: true,
          message: "login successfully",
          user: {result},
        }); 
    });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
module.exports = {registerController, loginController};