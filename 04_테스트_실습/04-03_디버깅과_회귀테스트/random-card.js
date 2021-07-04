const suits = ["H", "D", "S", "C"];
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const spliceCard = function(cardArray) {
  const takeAway = cardArray.splice(Math.floor(Math.random() * cardArray.length), 1)[0];
  return [takeAway, cardArray];
}

const buildCardArray = function() {
  const tempArray = [];

  for(let i = 0; i < values.length; i++) {
    for(let j = 0; j < suits.length; j++) {
      tempArray.push(values[i] + "-" + suits[j]);
    }
  }

  return tempArray;
}

const randomHand = function() {
  const cards = Array.from({ length: 5 }, () => null);
  let cardArray = buildCardArray();
  let result = [];

  for(let i = 0; i < 5; i++) {
    [cards[i], cardArray] = spliceCard(cardArray);
  }

  return cards;
}

console.log(randomHand());

const wish = require("wish");
const deepEqual = require("deep-equal");

describe("randomHand()", () => {
  for(let i = 0; i < 100; i++) {
    it("should not have the first two cards be the same", () => {
      const result = randomHand();
      wish(result[0] !== result[1]);
    });
  }
});

describe("buildCardArray()", () => {
  // 특성화 테스트
  it("does something?", () => {
    wish(deepEqual(
      buildCardArray(), 
      [
        '1-H',  '1-D',  '1-S',  '1-C',  '2-H', '2-D',
        '2-S',  '2-C',  '3-H',  '3-D',  '3-S', '3-C',
        '4-H',  '4-D',  '4-S',  '4-C',  '5-H', '5-D',
        '5-S',  '5-C',  '6-H',  '6-D',  '6-S', '6-C',
        '7-H',  '7-D',  '7-S',  '7-C',  '8-H', '8-D',
        '8-S',  '8-C',  '9-H',  '9-D',  '9-S', '9-C',
        '10-H', '10-D', '10-S', '10-C', 'J-H', 'J-D',
        'J-S',  'J-C',  'Q-H',  'Q-D',  'Q-S', 'Q-C',
        'K-H',  'K-D',  'K-S',  'K-C'
      ]
    ));
  });
  
  it("returns a full deck", () => {
    console.log(buildCardArray());
    wish(buildCardArray().length === 52);
  });
});

describe("spliceCard()", () => {
  it("returns two things", () => {
    wish(spliceCard(buildCardArray()).length === 2);
  });

  it("returns the selected card", () => {
    wish(spliceCard(buildCardArray())[0].match(/\w{1,2}-[HDSC]/));
  });

  it("returns an array with one card gone", () => {
    wish(spliceCard(buildCardArray())[1].length === buildCardArray().length - 1);
  });
});