# Creating a new page's jsx file
Create your .jsx file and name it pagename.jsx where pagename is replaced by the name of your page.
Import react: 
import React from "react";

Then import your css. How to name and import your css is covered later in this README
After which you can import any other necessary imports. Do not add unnecessary and unused imports.

Then create a function in the .jsx file.
Example:
function functionname() {
    return(
        <>
            (this will be where any html elements will be housed)
        </>
    );
}
export default functionname;

Your function name should be the same as your page name.
Now the jsx file exists and is set up for you to code in.

# Adding new pages to the app and routing them
To add new pages and make them visible you need to import them and route to them using the app.jsx file.
Import them below all the currently available pages, but before the notfound import as this should always remain the last page imported.

To import the new page into app.jsx:
import "functionname" from "./pages/pagename";

The way you route to pages is as follows:
{userHasPermission('pagename') && (
    <Route path="pagename" element={<whatyoucalledthefunctioninthejsxfile />} />
)}
Also to make sure you have added the permission (check const pagePermissions)
Finally make sure that you put the route to the page before the notfound route as this must remain the last route.

# CSS File Naming and Importing

Our css is modular. Import and name your css file as follows:
If your .jsx file is named FileName.jsx your css file should be named FileName.css
To import the css in the .jsx file:
import "../styling/FileName.css";

# CSS class/id Naming 

We have an issue where all the css files are imported and will conflict if we do not keep class/id names unique.
As such the naming convention will be as follows:
pagename_classname
Your class name can be whatever you wish it to be as long as it makes sense and is preceded by the page name.

# Giving elements classes and ids

Please only give elements in your jsx code classes and ids if you need them for the code to work or you need them for styling reasons.
React can and will on occasion throw errors if unused styling classes are used.

# Styling by element

If you need to style all of a certain element on a page, please give it a class and follow naming conventions to avoid conflicts with the same element being used in another page.
 
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
