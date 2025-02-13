const fs = require("fs");
const http = require('http');
const path = require("path");
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

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


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((request, response) => {
    console.log(request.url);
    console.log(url.parse(request.url, true)); // true - parse the query into an object
    
    const {query, pathname: pathName} = url.parse(request.url, true);
    console.log(query, pathName);
    // const pathName = request.url;
    
    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        response.writeHead(200, {
            'Content-type': 'text/html',
        });

        // Looping the data object
        const cardsHtml = dataObj.map((element) => replaceTemplate(templateCard, element)).join('');
        
        const output = templateOverview.replace('%PRODUCT_CARDS%', cardsHtml);

        response.end(output);
    
    // Product Page
    } else if (pathName === "/product") {
        response.writeHead(200, { 'Content-type': 'text/html' });

        const product = dataObj[query.id];

        const output = replaceTemplate(templateProduct, product);
        response.end(output);
        // response.end("this is the product")
        console.log(output);

    // API Page
    } else if (pathName === "/api") {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.end(data);
    
    // Not found page
    } else {
        response.writeHead(404, {
            // Header - a piece of information about the response we are sending back
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        response.end("<h1>Page not Found!!</h1>")
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
});

