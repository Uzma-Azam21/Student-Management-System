#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Create the Student Class
class Student {
  static counter = 15001;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = []; // Initialize an empty array for courses
    this.balance = 1000;
  }

  // Method to enroll a Student in a Course
  enroll_course(course: string, fee: number) {
    if (this.balance >= fee) {
      this.courses.push(course);
      this.balance -= fee;
      console.log(
        chalk.bold(
          `\nEnrollment complete! ${chalk.cyan.bold(
            this.name
          )} is now in ${chalk.cyan.bold(
            course
          )}. Course fee: $${chalk.cyan.bold(
            fee
          )}. Remaining Balance: $${chalk.cyan.bold(this.balance)}`
        )
      );
    } else {
      console.log(
        chalk.red.bold(
          `\nError: Insufficient balance to enroll in ${course}. Course fee: $${fee}. Current balance: $${this.balance}.`
        )
      );
    }
  }

  // Method to view a Student Balance
  view_balance() {
    console.log(
      chalk.bold(
        `\nAccount balance for ${chalk.cyan.bold(
          this.name
        )}: $${chalk.cyan.bold(this.balance)}`
      )
    );
  }

  // Method to display Student Status
  show_status() {
    console.log(chalk.bold(`Name: ${chalk.green.bold(this.name)}`));
    console.log(chalk.bold(`ID: ${chalk.green.bold(this.id)}`));
    console.log(
      chalk.bold(`Courses: ${chalk.green.bold(this.courses.join(", "))}`)
    );
    console.log(chalk.bold(`Balance: $${chalk.green.bold(this.balance)}`));
  }
}

// Defining a student_manager class to manage students
class Student_manager {
  students: Student[];
  courses: { name: string; fee: number }[];

  constructor() {
    this.students = [];
    this.courses = [
      { name: "Java", fee: 300 },
      { name: "Web 3.0", fee: 400 },
      { name: "React.js", fee: 350 },
      { name: "JavaScript", fee: 200 },
      { name: "Python", fee: 250 },
    ];
  }

  // Method to add a new Student
  add_student(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      chalk.bold(
        `\nStudent: ${chalk.cyan.bold(
          name
        )} successfully registered! Student ID: ${chalk.cyan.bold(student.id)}`
      )
    );
  }

  // Method to find a student by name
  find_student_by_name(name: string) {
    return this.students.find((std) => std.name === name);
  }

  // Method to enroll a student in a course
  enroll_student(name: string, course_name: string) {
    let student = this.find_student_by_name(name);
    let course = this.courses.find((c) => c.name === course_name);
    if (student && course) {
      student.enroll_course(course.name, course.fee);
    } else if (!course) {
      console.log(chalk.red.bold(`Error: Course ${course_name} not found.`));
    }
  }

  // Method to view a student balance
  view_student_balance(name: string) {
    let student = this.find_student_by_name(name);
    if (student) {
      student.view_balance();
    } else {
      console.log(
        chalk.red.bold("\nError: Student not recognized. Please re-enter.")
      );
    }
  }

  // Method to display Student Status
  show_student_status(name: string) {
    let student = this.find_student_by_name(name);
    if (student) {
      student.show_status();
    }
  }
}

// Main function to run the program
async function main() {
  console.log(
    chalk.bold.hex("#5cc6ff")("\n \tWelcome to Your Student Manager CLI.")
  );
  console.log(
    chalk.bold.hex("#5cc6ff")(
      "\n\tEffortlessly manage student records with ease. Add, update, and view student information quickly and efficiently.\n "
    )
  );

  console.log(chalk.bold.yellow("-".repeat(120)));

  let student_manager = new Student_manager();

  // While loop to keep program running
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.green("\nSelect an option to proceed:\n"),
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
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
        let student_list = student_manager.students.map(
          (student) => student.name
        );
        let enroll_input = await inquirer.prompt([
          {
            name: "student_name",
            type: "list",
            message: chalk.rgb(233, 36, 116)("Select the student:"),
            choices: student_list,
          },
          {
            name: "course",
            type: "list",
            message: chalk.hex("#5cc6ff")("Select the course:"),
            choices: student_manager.courses.map(
              (course) => `${course.name} - $${course.fee}`
            ),
          },
        ]);
        let selected_course = enroll_input.course.split(" - ")[0];
        student_manager.enroll_student(
          enroll_input.student_name,
          selected_course
        );
        break;

      case "View Student Balance":
        let balance_student_list = student_manager.students.map(
          (student) => student.name
        );
        let balance_input = await inquirer.prompt([
          {
            name: "student_name",
            type: "list",
            message: chalk.rgb(233, 36, 116)("Select the student:"),
            choices: balance_student_list,
          },
        ]);
        student_manager.view_student_balance(balance_input.student_name);
        break;

      case "Show Status":
        let status_student_list = student_manager.students.map(
          (student) => student.name
        );
        let status_input = await inquirer.prompt([
          {
            name: "student_name",
            type: "list",
            message: chalk.rgb(233, 36, 116)("Select the student:"),
            choices: status_student_list,
          },
        ]);
        student_manager.show_student_status(status_input.student_name);
        break;

      case "Exit":
        console.log(
          chalk.cyan.bold(
            "\nThank you for using Student Manager CLI. Your records have been saved. Goodbye!"
          )
        );
        process.exit();
    }
  }
}

// Calling a main function
main();
