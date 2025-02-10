const fs = require("fs");
const http = require('http');

////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `this is what we know about avocado: ${textIn}.\n Created on ${Date.now()}`;

// fs.writeFileSync('./txt/newOutput.txt', textOut)

// console.log("File written!");

// Non-blocking, asynchronous way
// callback 2 args, 1st (error, actual data)
// fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', (error) => {
//                 console.log('Your file has been written 😊');
//             })
//         });
//     });
// });

// console.log('Will read file!');

////////////////////////
// SERVER
const server = http.createServer((request, response) => {
    response.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
});

