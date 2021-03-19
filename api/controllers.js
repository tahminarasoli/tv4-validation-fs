'use strict'

const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const tv4 = require('tv4');
const config = require('../config');

const SCHEMA = path.join(__dirname, '/..', config.DATA_DIR, '/_-schema.json');
//const DATA_PATH = path.join(__dirname, '/..', config.DATA_DIR, '/newdata.json');
console.log(SCHEMA);
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
      const readData = await fs.readFile('./data/newdata.json', (err, data) => {
        const parseUser = JSON.parse(data);
        console.log("before",parseUser) 
        console.log("user",parseUser.users) 
        parseUser.users.push(newUser);
        
        console.log("after", parseUser)
        const newUserData = JSON.stringify(parseUser, null, 4);
         fs.writeFile('./data/newdata.json', newUserData, (err) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });

         
        console.log(newUser);
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
