# Development Strategy

![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/tahminarasoli/tv4-validation-fs)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues-raw/tahminarasoli/tv4-validation-fs)
![Github All Contributors](https://img.shields.io/github/all-contributors/tahminarasoli/tv4-validation-fs)

> [courses-web-app](https://github.com/DIVYASREE345/courses-web-app)

Good Food application is a project emplemented by group 2 HYF, 
---


## Screenshot
<p align="center">
<img src="/planning/Loginform.png" alt="figma" with="600">
</p>

---

## team
_Group 2 HYF_
1. Burak
2. Divya
3. Sharaf
4. Tahmina
5. Peyman

---
## tools
1. HTML
2. CSS
3. JavaScript
4. Nodejs
5. heroku
6. SQLite

---

## 0.Setup

_A User can see the initial repository and live demo_

- create a repo using starter
- Add collaborators
- Set up a project board
- Start a development strategy.
- Create initial README file
- Create Group issue
- Turn on GitHub Pages

---

## 1. Data
- newdata.JSON 
- contains users object.
- _-schema.JSON
- contains the validation for newdata.JSON.




---

## 2. user stories
### As a user I want to have an up and running web page.
_create repository using starter repo, write planning, create database, write code and deploy._
>`github repo`, `heroku deployment tool`
### As a user I want to see a friendly user interface.
_create the view of project according to figma design._
> HTML 
> CSS
### As a user I want to insert my username and password to get access to the menu page.
_create function to enter username and password on loging fields._
>Handlers `login` & `signup`.
>
>`loginFunction()`, `getExistingUser()`, `signupFunction()`
>
### As a user I want to be alerted if my credentials was not correct.
_validate the form on the serverside to compare the user data with defined schema._
> `tv4 validation`
### As a user I want to be alerted if I was not registered in the system.
_create function to alert user if the login information was not excist in the .JSON file._
>`getExistingUser()`
### As a user I want to register my self to be a member of this system.
_validate the user data to make suere the user is not entering duplicate data during registration._
>`signupFunction()`
### As a user I want to be alerted if I enter wrong data in registration form.
_validate user data to make sure the correct data is entered to the database aplying schema._
>`tv4 validation`
### If I enered correct data and login was successful I want to see a nice, well organized menu page
_create menu page with all food list options._
>`menu.html`, `style.css`
### As a user I want to access the menu page and select my favorite food.
_the food options are selectable if a user select it the color must change and the cart option apears._
>
### As a user I want to add my selected option to the cart.
_create function to select menu options and add them to the cart._
>`addToCart()`
### As a user I want to submit my order.
>`sendOrder()`
