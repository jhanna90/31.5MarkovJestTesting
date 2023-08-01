// /** Command-line tool to generate Markov text. */
// const { MarkovMachine } = require("./markov");

// async function read(input, path) {
//     if (input === "file") {
//         const fs = require('fs');
//         try {
//             return fs.readFileSync(path, 'utf8');
//         } catch (err) {
//             console.log('Error reading ', path);
//             console.log(err.toString());
//             process.exit(1);
//         }

//     } else if (input === "url") {
//         const axios = require('axios');

//         try {
//             const resp = await axios.get(path);

//             const { stripHtml } = require('string-strip-html');

//             return stripHtml(resp.data).result;
//         } catch (err) {
//             console.log("Error fetching: ", path);
//             console.log(err.toString());
//             process.exit(1);
//         }
//     }
// }

// async function makeText() {
//     const input = process.argv[2];
//     const path = process.argv[3];
//     let text = await read(input, path);

//     if (text !== null) {
//         const mm = new MarkovMachine(text);

//         console.log(`... generated text from ${input} '${path}' ...`);
//         console.log(mm.makeText());
//     }
// }

// makeText();

/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require("axios");
const { MarkovMachine } = require('./markov');


function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}
function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });

}


async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.err(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data);
}


let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);

} else if (method === "url") {
    makeURLText(path);

} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}