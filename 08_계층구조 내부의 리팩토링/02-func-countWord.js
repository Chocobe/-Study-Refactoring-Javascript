function Word() {
  this.count = function() {
    return this.word.length;
  }

  this.lookUp = function() {
    return this.lookUpUrl + this.word;
  }
}

function EnglishWord(word) {
  Word.call(this);
  this.word = word;
  this.language = "English";
  this.lookUpUrl = "http://en.wiktionary.org/wiki";
}

function JapaneseWord(word) {
  Word.call(this);
  this.word = word;
  this.language = "Japanese";
  this.lookUpUrl = "http://jisho.org/search";
}

// EnglishWord.prototype = Object.create(Word);
// EnglishWord.prototype.constructor = EnglishWord;
// JapaneseWord.prototype = Object.create(Word);
// JapaneseWord.prototype.constructor = JapaneseWord;

Word.prototype.reportLanguage = function() {
  return `The language is: ${this.language}`;
}

EnglishWord.prototype = Object.create(Word.prototype);

const english = new EnglishWord("dog");
console.log(english.reportLanguage());