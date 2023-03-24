# How To Run

## Setting up your virtual environment

If you haven't already, create a virtual environment by following these instructions:

1. Open a new terminal and navigate to the folder where the .git folder for this project is
2. Run the command `python -m venv venv`
3. To activate the virtual environment run the command `venv\scripts\activate`
4. Install the necessary libraries by running `pip install -r requirements.txt`

You will need to be in this virtual environment whenever running any commands for the Django server and React applications.
To exit the virtual environment when you need to, run `deactivate`

## SSH Tunneling

To allow your device to connect to the database, you need to first set up ssh tunneling to it

1. Open a new terminal and run the command `ssh -L 9999:teachdb:5432 USERNAME@linux.cim.rhul.ac.uk`
2. DO NOT close this terminal! You won't be able to use the Django apis otherwise!
3. That's it :)

## Starting the Django server

There are a few steps to starting the django server.

After opening a new terminal follow these instructions:

1. Firstly, ensure that your virtual environment is active
2. Navigate to the folder 'oaxaca'
3. Run the command `python manage.py makemigrations`
4. Then, run the command `python manage.py migrate`
5. Finally, run `python manage.py runserver`
6. The Django server should now be active!

## Starting the React applications

Before starting, navigate to the folder 'frontend' in a new terminal. Then:

1. Run `npm install` to install the necessary node modules
2. Run `npm start`
3. The website should now open automatically

That's all! Both Django and React should be up and running.

## Available Scripts in the Frontend

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run docs`

This will generate the documentation for the app based on the Jsdocs written in the app