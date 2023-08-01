// /** Textual markov chain generator */

// class MarkovMachine {

//   /** build markov machine; read in text.*/

//   constructor(text) {
//     let words = text.split(/[ \r\n]+/);
//     this.words = words.filter(c => c !== "");
//     this.makeChains();
//   }

//   /** set markov chains:
//    *
//    *  for text of "the cat in the hat", chains will be
//    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

//   makeChains() {
//     const keys = new Set(this.words);

//     this.chains = {};

//     keys.forEach(key => {
//       this.chains[key] = [];
//       let fromIndex = 0;
//       let index = this.words.indexOf(key);
//       while (index >= 0) {
//         if (index < this.words.length - 1) {
//           //not the last word
//           this.chains[key].push(this.words[index + 1])
//         } else {
//           //last word
//           this.chains[key].push(null);
//         }

//         //search from the next word
//         fromIndex = index + 1;
//         index = this.words.indexOf(key, fromIndex);
//       }
//     });
//   }


//   /** return random text from chains */

//   makeText(numWords = 100) {
//     let count = 0;

//     let word = this.words[Math.floor(this.words.length * Math.random())];

//     const words = [];
//     words.push(word);
//     while (words.length < 100) {
//       word = this.chains[word][Math.floor(this.chains[word].length * Math.random())];

//       if (word === null) {
//         break;
//       }
//       words.push(word);
//     }

//     return words.join(" ");
//   }
// }

// module.exports = {
//   MarkovMachine: MarkovMachine
// };

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chain = {}

    for (let i = 0; i < this.words.length; i++) {

      let word = this.words[i];

      if (!this.chain[word]) {
        this.chain[word] = [];
      }

      if (this.words[i + 1]) {
        this.chain[word].push(this.words[i + 1]);
      }

    }

  }


  /** return random text from chains */

  makeText(numWords = 10) {
    // TODO
    const words = Object.keys(this.chain);

    let word = words[Math.floor(Math.random() * words.length)];

    let result = '';

    for (let i = 0; i < numWords; i++) {
      result += word + ' ';
      let newWord = this.chain[word][Math.floor(Math.random() * this.chain[word].length)];

      word = newWord;
      if (!word || !this.chain.hasOwnProperty(word)) {
        word = words[Math.floor(Math.random() * words.length)];
      }

    }
    return result;
  }
}

let mm = new MarkovMachine("Green eggs and ham");
mm.makeText(numWords = 20);

module.exports = { MarkovMachine };