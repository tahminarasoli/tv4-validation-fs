'use strict'

const { json } = require('body-parser');
const util = require('util');
const fs = require('fs');
const path = require('path');
const tv4 = require('tv4');
const config = require('../config');

const SCHEMA_PATH = path.join(__dirname, '/..', config.DATA_DIR, '/_-schema.json');
//const DATA_PATH = path.join(__dirname, '/..', config.DATA_DIR, '/newdata.json');


const readFile = util.promisify(fs.readFile);


const controllers = {
 hello: (req, res) => {
    res.json({ message: 'hello!' });
  },
  getUsers: (req, res) => {
    console.log("object")
    fs.readFile("./data/newdata.json", (err, data) => {
      if (err) {
        console.log(err);
      }
      const courses = JSON.parse(data);

      res.send(courses);
    });
  },

  userData: async (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    try {
      const readData = await fs.readFile('../data/newdata.json', (err, data) => {
        const parseUser = JSON.parse(data);
        console.log(parseUser);
        const validate = tv4.validate(newUser, '../data/_-schema.json');
        console.log('validate', validate);
        if (!validate) {
          const error = tv4.error;
          console.error(error);

          res.status(400).json({
            error: {
              message: error.message,
              dataPath: error.dataPath,
            },
          });
          return;
        }

        res.json(parseUser);
      });

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }
    }
  },
  signUp: async (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    try {
      const schemaString = await readFile(SCHEMA_PATH, 'utf-8');
      const userSchema = JSON.parse(schemaString);
      console.log(userSchema)
      const readData = await fs.readFile('./data/newdata.json', (err, data) => {
        const parseUser = JSON.parse(data);
        
       
        const isValid = tv4.validateMultiple(newUser, userSchema );
        
       

        if (!isValid.valid) {
                    
          const error = isValid.errors;
          // console.error(error)
          const err_obj = {};
          error.forEach(err => err_obj[err.dataPath.slice(1,err.dataPath.length)]=err.message)
          // console.log(err_obj)
          res.status(400).json(err_obj)
          return
        }

        parseUser.users.push(newUser);
        
        const newUserData = JSON.stringify(parseUser, null, 4);

         fs.writeFile('./data/newdata.json', newUserData, (err) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });

        res.json(newUser);
      });
     
    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }
    }
  }
}



module.exports = controllers;
