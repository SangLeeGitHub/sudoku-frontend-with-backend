const express = require('express');
const path = require('path');
const sudoku = require('sudoku');
const app = express();
const port = 8081;
const arr = [];
let s = [];
var exports = module.exports = {};
var server = null;

for (var i = 0; i < 81; i++) arr.push(null);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/sudoku/board', (req, res) => {
	
	s = sudoku.solvepuzzle(arr);
	res.send(JSON.stringify(s));
});

app.get('/sudoku/close', (req, res) => {

	res.send("Closing the server");
	server.close();
});

app.get('*', (req, res) => {
	
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

server = app.listen(port, () => console.log(`Sudoku API listening on port ${port}!`));

exports.closeServer = function () {

	server.close();
};
