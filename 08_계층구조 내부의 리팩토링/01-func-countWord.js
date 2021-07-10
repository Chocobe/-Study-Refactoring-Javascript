function Word(word, language, lookUpUrl) {
  this.word = word;
  this.language = language;
  this.lookUpUrl = lookUpUrl;

  this.count = function() {
    return this.word.length;
  }

  this.lookUp = function() {
    return this.lookUpUrl + this.word;
  }
}

function EnglishWord(word) {
  Word.call(this, word, "English", "http://en.wiktionary.org/wiki/");
}

function JapaneseWord(word) {
  Word.call(this, word, "Japanese", "http://jisho.org/search/");
}

EnglishWord.prototype = Object.create(Word.prototype);
EnglishWord.prototype.constructor = EnglishWord;
JapaneseWord.prototype = Object.create(Word.prototype);
JapaneseWord.prototype.constructor = JapaneseWord;

const wish = require("wish");

describe("EnglishWord", () => {
  const english = new EnglishWord("dog");

  it("count()", () => {
    wish(english.count() === 3);
  });

  it("lookUp()", () => {
    wish(english.lookUp() === "http://en.wiktionary.org/wiki/dog");
  });
});

describe("JapaneseWord", () => {
  const japanese = new JapaneseWord("犬");
  
  it("count()", () => {
    wish(japanese.count() === 1);
  });

  it("lookUp()", () => {
    wish(japanese.lookUp() === "http://jisho.org/search/犬");
  });
});