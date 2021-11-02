# Employee CMS
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A command-line CMS that allows users to add, update and remove entries about employees.
Runs on node.js and uses the mysql2 package for database logic.

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
Node.js and mySQL are required to run this program:
- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/installer/)

After both of these are installed, you can download/clone the project. In a command line interface, navigate to the root folder and use the command `npm i` to install all necessary dependencies.


## Usage
In `main.js`, the variable `db` contains the connection to a database. You'll need to enter your own credientials to connect to a specific database (or just change the password if it's on localhost).

Afterwards, use the command `npm start` to begin the program. You'll be given a list of options that can be used to manipulate the database, such as Add Employee, Remove Employee, and Update Employee.
Employee entires are built using existing roles and departments--you'll probably want to add some of each before building an Employee entry. 
Simply follow the on screen intructions to enter data.

A demonstration can be seen [here](https://github.com/jkohrt7/Employee_CMS).

### Limitations
Currently, if you remove a department that a customer is a part it will be replaced with null and cannot be updated. An update function is in development, but this project is pretty low priority and is more for demonstrative purposes (which is also why the login process is not streamlined!).

## Questions
If you have any questions about using or contibuting to the project, you can contact me via email or though github:
- Email: jkohrt7@gmail.com
- Github: [@jkohrt7](https://github.com/jkohrt7)

## Credits
- [jkohrt7 ](https://www.github.com/jkohrt7) 
- [inquirer ](https://www.npmjs.com/package/inquirer) 
- [mySQL2 ](https://www.npmjs.com/package/mysql2) 

## License
[MIT](https://opensource.org/licenses/MIT)
