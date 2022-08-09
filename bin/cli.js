#! /usr/bin/env node

import inquirer from "inquirer";
import actionScript from "./action.js"

const createApplication = async () => {
    const [name_of_project, mode_install] = await getProjectName();
    actionScript(name_of_project, mode_install);
}

const getProjectName = () => {
    return new Promise((resolve, reject) => {
        inquirer
        .prompt([
            {
                type: "input",
                name: "project_name",
                message: "Name of your project : ",
            },
            {
                type: 'list',
                name: 'mode_install',
                message: 'Choose the installation mode : ',
                choices: ['Docker-compose', 'Local npm']
            },
        ])
        .then((answers) => {
            resolve([answers.project_name, answers.mode_install])
        }).catch((error) => reject(error))
  });
};

await createApplication();