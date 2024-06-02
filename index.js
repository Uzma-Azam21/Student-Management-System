#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Create the Student Class
class Student {
    static counter = 15001;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 1000;
    }
    // Method to enroll a Student in a Course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a Student Balance
    view_balance() {
        console.log(chalk.bold(`Account balance for ${chalk.cyan.bold(this.name)}: $${chalk.cyan.bold(this.balance)}`));
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.bold(`Payment received! ${chalk.cyan.bold(this.name)}'s fee of $${chalk.cyan.bold(amount)} is now settled.`));
        console.log(chalk.bold(`Remaining Balance: $${chalk.blue.bold(this.balance)}`));
    }
    // Method to display Student Status
    show_status() {
        console.log(chalk.bold(`Name: ${chalk.green.bold(this.name)}`));
        console.log(chalk.bold(`ID: ${chalk.green.bold(this.id)}`));
        console.log(chalk.bold(`Courses: ${chalk.green.bold(this.courses)}`));
        console.log(chalk.bold(`Balance: $${chalk.green.bold(this.balance)}`));
    }
}
// Defining a student_manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new Student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold(`Student: ${chalk.cyan.bold(name)} successfully registered! Student ID: ${chalk.cyan.bold(student.id)}`)); // sentence will be change
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
    //Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.bold(`Enrollment complete! ${chalk.cyan.bold(student.name)} is now in ${chalk.cyan.bold(course)}.`));
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red.bold("Error: Student ID not recognized. Please re-enter."));
        }
    }
    // Method to pay Student Fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red.bold("Error: Student ID not recognized. Please re-enter."));
        }
    }
    // Method to display Student Status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
}
// Main function to run the program
async function main() {
    console.log(chalk.bold.hex("#5cc6ff")("\n \tWelcome to Your Student Manager CLI."));
    console.log(chalk.bold.hex("#5cc6ff")("\n \tEffortlessly manage student records with ease. Add, update, and view student information quickly and efficiently.\n "));
    console.log(chalk.bold.yellow("-".repeat(120)));
    let student_manager = new Student_manager();
    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.green("Select an option to proceed:"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        // Using Switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.rgb(233, 36, 116)("Provide the student's name:"),
                    },
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.rgb(233, 36, 116)("Provide the unique student's ID:"),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.hex("#5cc6ff")("Provide the course's name"),
                    },
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.rgb(233, 36, 116)("Provide the unique student's ID"),
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.rgb(233, 36, 116)("Provide the unique student's ID"),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.hex("#5cc6ff")("Provide the amount to be paid:"),
                    },
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.rgb(233, 36, 116)("Provide the unique student's ID"),
                    },
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.cyan.bold("Thank you for using Student Manager CLI. Your records have been saved. Goodbye!"));
                process.exit();
        }
    }
}
// Calling a main function
main();
