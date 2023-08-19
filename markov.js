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
