class Word {
  constructor(word, language, lookUpUrl) {
    this.word = word;
    this.language = language;
    this.lookUpUrl = lookUpUrl;
  }

  count() {
    return this.word.length;
  }

  lookUp() {
    return `${this.lookUpUrl}/${this.word}`;
  }
}

class EnglishWord extends Word {
  constructor(word) {
    super(
      word, 
      "English", 
      "http://en.wiktionary.org/wiki"
    );
  }
};

class JapaneseWord extends Word {
  constructor(word) {
    super(
      word, 
      "Japanese", 
      "http://jisho.org/search"
    );
  }
};

const englishWord = new EnglishWord("dog");
const japaneseWord = new JapaneseWord("犬");

console.log(englishWord.word);
console.log(englishWord.count());
console.log(englishWord.lookUp());

console.log(japaneseWord.word);
console.log(japaneseWord.count());
console.log(japaneseWord.lookUp());

const wish = require("wish");
const deepEqual = require("deep-equal");

wish(englishWord.word === "dog");
wish(englishWord.lookUp() === "http://en.wiktionary.org/wiki/dog");
wish(englishWord.count() === 3);

wish(japaneseWord.word === "犬");
wish(japaneseWord.lookUp() === "http://jisho.org/search/犬");
wish(japaneseWord.count() === 1);

// 내부 테스트
wish(typeof englishWord === "object");
wish(typeof EnglishWord === "function");

wish(englishWord instanceof EnglishWord);
wish(englishWord instanceof Word);
wish(!(EnglishWord instanceof Word));

wish(englishWord.constructor === EnglishWord);
wish(Object.getPrototypeOf(EnglishWord) === Word);

// 약간 개략적인 테스트
wish(deepEqual(Object.getPrototypeOf(englishWord), {}));
console.log(Object.getPrototypeOf(englishWord));
console.log(EnglishWord);