// NBC (Naive Bayes Classifier)
module.exports = class Classifier {
  constructor() {
    this._textList = {
      understood: ["yes", "no"],
      allWords: new Set(),
      texts: [],
      
      addText(name, words, comprehension) {
        this.texts.push({
          name,
          words,
          comprehension: this.understood[comprehension],
        });
      },
    }

    this._labelCounts = new Map();
    this._labelProbabilities = new Map();
    this._smoothing = 1.01;
  }

  addText(...textParams) {
    this._textList.addText(...textParams);
  }

  _likelihoodFromWord(comprehension, word) {
    return this._wordCountForComprehension(comprehension, word) / this._textList.texts.length;
  }

  _valueForWordComprehension(comprehension, words) {
    const value = this._likelihoodFromWord(comprehension, words);
    return value ? value + this._smoothing : 1;
  }
  
  classify(words) {
    return new Map(Array.from(this._labelProbabilities.entries()).map(labelWithProbability => {
      const comprehension = labelWithProbability[0];
      return [
        comprehension,
        words.reduce((total, word) => {
          return total * this._valueForWordComprehension(comprehension, word);
        }, this._labelProbabilities.get(comprehension) + this._smoothing)
      ];
    }));
  }

  _wordCountForComprehension(comprehension, testWord) {
    return this._textList.texts.reduce((counter, text) => {
      if(text.comprehension === comprehension) {
        counter += text.words.filter((word) => {
          return word === testWord;
        }).length;
      }

      return counter;
    }, 0);
  }

  trainAll() {
    this._textList.texts.forEach(text => {
      this._train(text.words, text.comprehension);
    });
  
    this._setLabelProbabilities();
  }

  _train(words, label) {  
    words.forEach(word => this._textList.allWords.add(word));
  
    if(Array.from(this._labelCounts.keys()).includes(label)) {
      this._labelCounts.set(label, this._labelCounts.get(label) + 1);
    } else {
      this._labelCounts.set(label, 1);
    }
  }

  _setLabelProbabilities() {
    this._labelCounts.forEach((_count, label) => {
      this._labelProbabilities.set(label, this._labelCounts.get(label) / this._textList.texts.length);
    });
  }

  // 정적 메서드
  static divide(dividend, divisor) {
    return dividend / divisor;
  }
};

// 현재 파일명 추출 함수
function fileName() {
  const theError = new Error("here I am");
  return theError.stack.match(/(\d+-\w+-?\w+\.js)/)[1];
}

// 환영 메시지 함수
function welcomeMessage() {
  return `Welcome to ${fileName()}!`;
}
