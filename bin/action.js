import shell from "shelljs";
import chalk from "chalk";
const path = process.cwd();

const actionScript = (project_name, mode_install) => {
    try {
        console.log( '📁 Create project directory');
        console.log('---------------------------------');
        shell.exec(`mkdir ${project_name}`);
        console.log(chalk.green('Done'));

        console.log(`🖨️  Clone boilerplate code`);
        console.log('---------------------------------');
        shell.exec(`git clone https://github.com/MandaNyAina/reactts-starter-code ${path}/${project_name}`, { silent: true });
        console.log(chalk.green('Done'));

        console.log(`🖨️  Configurations file`);
        shell.exec(`docker-compose build`, { silent: true })
        shell.cd(`${path}/${project_name}`);
        shell.exec(`sed -i 's+/var/www/boilerplate-reactts+${path}/${project_name})+g' ${path}/${project_name}/docker-compose.yml`);
        shell.exec(`sed -i 's+boilerplate-reactts+${project_name}+g' ${path}/${project_name}/.env`);

        console.log(`👨‍💻  Install dependencies`);
        console.log('---------------------------------');
        switch (mode_install) {
            case 'Docker-compose':
                shell.exec(`docker-compose run app npm install`);
                break;
            case 'Local npm':
                shell.exec(`npm i`);
                break;

            default:
                throw "Bad choice";
        }
        console.log(chalk.green('Done'));

        console.log('---------------------------------');
        console.log(
            chalk.black(
                chalk.bgGreen('Successfully installed all the required dependencies')
            )
        );

        console.log(chalk.green('\n\n🚀 Happy Coding 😎'));
    } catch (error) {
        console.log(`Failed : ${error}`);
    }
}

export default actionScript;