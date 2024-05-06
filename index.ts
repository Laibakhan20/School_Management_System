#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from 'chalk';


console.log(chalk.bold.blueBright("<<<<<<<<<<<<<< Welcome! to the TechCraft Institute. \n\t\tWhere your tech journey begins! >>>>>>>>>>>>>>"));

//class and its properties then we make constructor which is used to assign values to the properties, we use "this" keyword to access the properties:
class students{
    id : string;
    name : string;
    courses : string[];
    paidFees : number;

     constructor(id: string, name:string, courses:string[], balance: number){
        this.id = id ; 
        this.name = name ;
        this.courses = courses ;                         
        this.paidFees = balance ;

     }
   }


   let baseId = 10000;
   let studentId : string = "";
   let continueEnrollment = true;
    
   //making variable to store all of the student's data into one array.
   let studentsData : students[] = [];


   //making do-while loop and using inquirer to get user's input.
do {
   let answers = await inquirer.prompt({
      name : "answer",
      type : "list",
      message : chalk.red("What do you want to do?"),
      choices : ["Add a student", "Enroll a student", "Show status"]
   });

//ADD A STUDENT:
   if (answers.answer === "Add a student") {
      let studentName = await inquirer.prompt({
         name : "stdname",
         type: "input",
         message : "Enter the name of the student: ",
         validate : function(value){
            if (value.trim !== ""){
               return true;
            }
            return "Please enter a non-empty value";
         },
      })  
      let studentNameCheck = studentsData.map(obj => obj.name);

      baseId++
      studentId = "STID" + baseId

      console.log("---------------------------------------------------")
      console.log(`\n\tStudent Name: ${studentName.stdname}`);
      console.log(`\tStudent ID: ${studentId}`);
      console.log("----------------------------------------------------")
         
   } ;


   //ENROLLMENT:
   if (answers.answer === "Enroll a student") {
      let enrollment = await inquirer.prompt({
         name: "selectid",
         type: "input",
         message: "Enter the student ID: "        
      }) 

      let nameOfStd = await inquirer.prompt({
         name: "name",
         type: "input",
         message: "Enter the name of the student: "
      })
      let trimmedStudentName = (nameOfStd.name).trim().toLowerCase()
      let studentNameCheck = studentsData.map(obj => obj.name);
      
      
   
   let selectCourses = await inquirer.prompt ({
      name: "courses",
      type: "list",
      message: "select a course: ",
      choices: ["Python", "HTML & CSS", "JavaScript", "Typescript", "AI & ML", "DS & Algorithm"]
   })
   let selectCoursesCheck = studentsData.map(obj => obj.courses);
   
   let courseFees = 0
            switch (selectCourses.courses) {
               case "Python":
                  courseFees = 500
                  break;
               case "Typescript":
                  courseFees = 200
                  break;
               case "HTML & CSS":
                  courseFees = 300
                  break;
               case "JavaScript":
                  courseFees = 400
                  break;
               case "AI & ML":
                  courseFees = 2000
                  break;
               case "Cloud Computing":
                  courseFees = 4000
                  break;
               case "DS & Algorithm":
                  courseFees = 600
                  break;
            }
            console.log(`\n\tThe tution fee for the course ${selectCourses.courses} is $${courseFees}`);

            

            let confirmCourse = await inquirer.prompt({
               name: "confirm",
               type: "confirm",
               message: chalk.magenta("\tDo you want to enroll this course?")
            })
            if (confirmCourse.confirm === true) {
               let Student = new students(studentId, trimmedStudentName , [selectCourses.courses], courseFees);
               
               studentsData.push(Student);
               console.log("\tStudent enrolled successfully!");
            }

   }

   //SHOW STATUS:
   else if (answers.answer === "Show status") {
      if (studentsData.length !== 0) {
         let studentNameCheck = studentsData.map(e => e.name)

         let selectedStudent = await inquirer.prompt({
            name: "selected",
            type: "list",
            message: chalk.bold("Select a student: "),
            choices: studentNameCheck
         })
         let foundStudent = studentsData.find(Student => Student.name === selectedStudent.selected);
         
         console.log("----------------------------------------");
         console.log(chalk.bgBlueBright.white("STUDENT INFROMATION"));
         console.log(foundStudent);
         console.log("----------------------------------------")
      }else {
         console.log(chalk.red("Record is empty"));
      }
   } 

   //exit
   let userConfirm = await inquirer.prompt({
      name: "exit",
      type: "confirm",
      message: chalk.magenta("Do you want to continue?")
   })
   if (userConfirm.exit === false) {
      continueEnrollment = false
   }
      
   

} while (continueEnrollment); 
























