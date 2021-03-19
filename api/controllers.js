'use strict'

const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const tv4 = require('tv4');
const config = require('../config');

const SCHEMA = path.join(__dirname, '/..', config.DATA_DIR, '/_-schema.json');
const DATA_PATH = path.join(__dirname, '/..', config.DATA_DIR, '/newdata.json');

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
    try {
      const readData = await fs.readFile('../data/newdata.json');
      const parseUser = JSON.parse(readData);
      console.log(parseUser);
      const validate = tv4.validate(newUser, SCHEMA);
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

    try {
      const readData = await readFile(DATA_PATH, 'utf-8');
      const parseUser = JSON.parse(readData);

      parseUser.users.push(newUser);

      const newUserData = JSON.stringify(parseUser, null, ' ');
      await writeFile(DATA_PATH, newUserData);
      console.log(newUser);
      res.json(parseRead);
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
