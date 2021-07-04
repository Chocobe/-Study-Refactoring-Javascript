// 단순반복 아닌 함수
// * 미구현 상태이므로, false 반환 함수로 임시 작성
const checkStraightFlush = function(hand) {
  return false;
}
const checkFullHouse = function(hand) {
  return false;
}
const checkFlush = function(hand) {
  return false;
}
const checkStraight = function(hand) {
  return false;
}
const checkTwoPair = function(hand) {
  return false;
}

// 카드의 번호 목록 GETTERS
const getValues = function(hand) {
  console.log("hand: ", hand);
  const values = hand.map(curValue => curValue[0]);
  console.log("값: ", values);

  return values;
}

// 단순반복 함수 구현
const checkDuplicates = function(values) {
  let numberOfDuplicates = 0;
  let duplicatesOfThisCard = 0;

  values.forEach(curCard => {
    duplicatesOfThisCard = 0;
    
    values.forEach(compareCard => {
      if(curCard === compareCard) duplicatesOfThisCard++;
    });

    numberOfDuplicates = Math.max(numberOfDuplicates, duplicatesOfThisCard);
  });

  return numberOfDuplicates;
}

const checkHand = function(hand) {
  const values = getValues(hand);
  const number = checkDuplicates(values);

  if(checkStraightFlush(hand)) return "Straight Flush";
  else if(checkFullHouse(hand)) return "Full House";
  else if(checkFlush(hand)) return "Flush";
  else if(checkStraight(hand)) return "Straight";
  else if(checkTwoPair(hand)) return "Two Pair";

  else if(number === 4) return "Four Of a Kind";
  else if(number === 3) return "Three Of a Kind";
  else if(number === 2) return "Pair";

  else return "High Card";
};

// console.log(`value of checkHand is ${checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"])}`);

const assert = require("assert");
assert(checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"]) === "Pair");
assert(checkHand(["3-H", "3-C", "3-D", "5-H", "2-H"]) === "Three Of a Kind");