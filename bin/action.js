import shell from "shelljs";
import chalk from "chalk";
const path = process.cwd();

const actionScript = (project_name, mode_install) => {
    try {
        console.log( '📁 Create project directory');
        console.log(chalk.green('[CREATE]') + ` ${project_name}/ directory`);
        shell.exec(`mkdir ${project_name}`);

        console.log(`📥  Clone source from git`);
        console.log(chalk.green('[CLONE]') + ` from https://github.com/MandaNyAina/reactts-starter-code`);
        shell.exec(`git clone https://github.com/MandaNyAina/reactts-starter-code ${path}/${project_name}`, { silent: true });

        console.log(`🛠️  Config environment files`);
        shell.cd(`${path}/${project_name}`);
        console.log(chalk.green('[CONFIG]') + ` environment value`);
        shell.exec(`sed -i '' -e 's+/var/www/boilerplate-reactts+${path}/${project_name}+g' ${path}/${project_name}/docker-compose.yml`);
        shell.exec(`sed -i '' -e 's+boilerplate-reactts+${project_name}+g' ${path}/${project_name}/.env`);

        console.log(`👨‍💻  Install dependencies`);
        switch (mode_install) {
            case 'Docker-compose':
                console.log(chalk.green('[CONFIG]') + ` docker-compose file`);
                shell.exec(`docker-compose build`, { silent: true })
                console.log(chalk.green('[INSTALL]') + ` from docker-compose with 'docker-compose run app npm install'`);
                shell.exec(`docker-compose run app npm install`);
                break;
            case 'Local npm':
                console.log(chalk.green('[INSTALL]') + ` from local npm 'npm install'`);
                shell.exec(`npm install`);
                break;

            default:
                throw new Error("Bad choice");
        }

        console.log(
            chalk.black(
                chalk.bgGreen('\nSuccessfully installed all the required dependencies')
            )
        );

        console.log('\nHow to start : ' + chalk.blue(`${mode_install == 'Docker-compose' ? 'docker-compose run app npm start' : 'npm start' }`));
        console.log('Visit : ' + chalk.blue('http://localhost:3000'))

        console.log(chalk.green('\n\n🚀 Happy Coding 😎'));

    } catch (error) {
        console.log(`Failed : ${error}`);
    }
}

export default actionScript;