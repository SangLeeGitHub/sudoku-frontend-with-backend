#### Continues from Level 1
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
    * (sudo if your system needs) npm i react-create-app -g
    * `create-react-app client` on the project root folder.
    * `cd client/src`
 
* Program with app.js
    * Put codes for `GET /sudoku/board` into `app.get('/sudoku/board', ...`<br>
    * See [app.js](https://github.com/hotdeveloper/sudoku-backend/blob/master/app.js)

* Add the API test 
    * mkdir spec
    * Put the test codes for the Sudoku rule into spec/backend.spec.js
    * Read each row and sorting array and compare the [0,1,2,3,4,5,6,7,8]
    * Read each column and sorting array and compare the [0,1,2,3,4,5,6,7,8]
    * See [spec/backend.spec.js](https://github.com/hotdeveloper/sudoku-backend/blob/master/spec/backend.spec.js)

* Test 
   * `npm run build` on the project root directory.
   
* Run
   * `node app.js`
