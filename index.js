const fs = require("fs");

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

const textOut = `this is what we know about avocado: ${textIn}.\n Created on ${Date.now()}`;

fs.writeFileSync('./txt/newOutput.txt', textOut)

console.log("File written!");