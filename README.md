#### - Continues from Level 1
### Sudoku frontend with backend (Level 2)

#### Techniques used : React, Express

* Prepare folder and install npm modules
    * Modify the scripts part in the package.json like
    ```javascript  
      "scripts": {
        "test": "jasmine-node spec --verbose",
        "backend": "node app.js&",
        "build": "npm install && npm test && npm run backend && cd client && npm install && npm test && curl http://localhost:8081/sudoku/close && npm run build",
        "start": "node app.js"
      },
    ```
    * Modify the dependencies and scripts part in the client/package.json like
     ```javascript  
      "dependencies": {
       "@babel/runtime": "^7.7.2",
       "@fortawesome/fontawesome-free": "^5.11.2",
       "@fortawesome/fontawesome-svg-core": "^1.2.25",
       "@fortawesome/free-solid-svg-icons": "^5.11.2",
       "@fortawesome/react-fontawesome": "^0.1.7",
       "babel-preset-react-app": "^9.0.2",
       "react": "^16.12.0",
       "react-dom": "^16.12.0",
       "react-scripts": "3.2.0"
     },
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "CI=true react-scripts test --env=jsdom",
       "eject": "react-scripts eject"
     },
     ```
    It is because of special fonts and test. And add the proxy like 
     ```
     "proxy": "http://localhost:8081"
     ```
    It is because the Ajax call from the frontend needs to be routed to port 8081
    * ('sudo' if your system needs) `npm i react-create-app -g`
    * `create-react-app client` on the project root folder.
    * `cd client/src`
 
* Program with App.js
    * Class App
        * Main class to render subclasses.
    * Class Board 
        * Method componentDidMount() : Send a Ajax request to get a Sudoku array from the Server
        * Method render() : Draw 9x9 cells with the Sudoku array and the reload button.
    * Class Square
        * Method render() : Draw a cell include a Sudoku number.
    * See [App.js](https://github.com/hotdeveloper/sudoku-frontend-with-backend/blob/master/client/src/App.js)

* Add some CSS into App.css
    * See [App.css](https://github.com/hotdeveloper/sudoku-frontend-with-backend/blob/master/client/src/App.css)

* Code for testing into App.test.js
    * Checking the drawing of the 9x9 grid properly.  
    * Use the Async keyword to deal with the delay from the Ajax call.
    
* Add the API in app.js on the project root folder. 
    * To serve the frontend files, put some codes into `app.get('*',`
    
* Configure the nginx
   * Modify nginx.conf (Linux - in /etc/nginx/, macOS - in /usr/local/etc/nginx/) 
   ```
   worker_processes  1;

    events {
        worker_connections 1024;
    }

    http {
        server {
            listen 8080;
            server_name localhost;

            location / {
                proxy_pass http://localhost:8081;
            }
        }
    }
    ```
    * Restart the nginx.
    
* Build and test 
   * `npm run build` on the project root directory.
   
* Run
   * `npm start`
   * You are able to go to http://localhost:8080 on the web browser while running the reverse proxy with Nginx.
   * You can access the app through http://localhost:8081 on the web browser if you don't run the reverse proxy with Nginx.
