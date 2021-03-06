const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];


function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What role is the employee",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "Name",
            message: "Whats the employees name:"
        },
        {
            type: "input",
            name: "Id",
            message: " Whats the employees ID"
        },
        {
            type: "input",
            name: "Email",
            message: "Whats the employee's email:",
        },
    ]).then(answers => {
        if (answers.role === "Manager") {
            inquirer.prompt([
                {

                    type: "input",
                    name: "Office",
                    message: "Enter employee's office number:",

                }
            ])
                .then(function (res) {
                    const manager = new Manager(answers.Name, answers.Id, answers.Email, res.Office);
                    employees.push(manager);
                    addRole();
                })
        } else if (answers.role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "Github",
                    message: "Enter employee's GitHub username:",
                }
            ])
                .then(function (res) {
                    const engineer = new Engineer(answers.Name, answers.Id, answers.Email, res.Github);
                    employees.push(engineer);
                    addRole();
                });
        } else if (answers.role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "What is the employee's school?"
                }
            ])
                .then(function (res) {
                    const intern = new Intern(answers.name, answers.id, answers.email, res.school);
                    employees.push(intern);
                    addRole();
                })
        }
    })
}
function addRole() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "Add",
            message: "Would you like to add another employee to the list?",
        }
    ]).then(function (res) {
        if (res.Add) {
            init()
        }
        else {
            const data = render(employees);
            fs.writeFile(outputPath, data, function (err) {
                if (err) return err;
                console.log('employees', employees);
                console.log('data', data);
            })
        }
    })
}


init()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
