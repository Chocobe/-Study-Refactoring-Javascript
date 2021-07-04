const wish = require("wish");
const deepEqual = require("deep-equal");

function valuesFromHand(hand) {
  return hand.map(card => {
    return card.split("-")[0];
  })
}

function highestCount(values) {
  const counts = {};

  values.forEach(curValue => {
    counts[curValue] = 0;

    values.forEach(compareValue => {
      if(curValue === compareValue) {
        counts[curValue]++;
      }
    });
  });

  const countsArr = Object.keys(counts).map(key => {
    return counts[key];
  });

  return countsArr.sort((a, b) => b - a)[0];
}

function multiplesIn(hand) {
  return highestCount(valuesFromHand(hand));
}

function isTwoPair(hand) {
  const theCounts = allCounts(valuesFromHand(hand));
  return theCounts[0] === 2 && theCounts[1] === 2;
}

function isPair(hand) {
  return multiplesIn(hand) === 2;
}

function allCounts(values) {
  const counts = {};

  values.forEach(curValue => {
    counts[curValue] = 0;

    values.forEach(compareValue => {
      if(curValue === compareValue) {
        counts[curValue]++;
      }
    });
  });

  const totalCounts = Object.keys(counts).map(key => {
    return counts[key];
  });

  return totalCounts.sort((a, b) => b - a);
}

function isFullHouse(hand) {
  const theCounts = allCounts(valuesFromHand(hand));
  return theCounts[0] === 3 && theCounts[1] === 2;
}

function isTriple(hand) {
  return multiplesIn(hand) === 3;
}

function isQuadruple(hand) {
  return multiplesIn(hand) === 4;
}

function suitsFor(hand) {
  return hand.map(card => {
    return card.split("-")[1];
  });
}

function allTheSameSuit(suits) {
  let toReturn = true;
  
  suits.forEach((suit) => {
    if(suit !== suits[0]) {
      toReturn = false;
    }
  });

  return toReturn;
}

function isFlush(hand) {
  return allTheSameSuit(suitsFor(hand));
}

function fourAway(sortedValues) {
  return Number(sortedValues[sortedValues.length - 1]) - (Number(sortedValues[0]) + 4) === 0;
}

function noMultiples(values) {
  return highestCount(values) === 1;
}

function cardsInSequence(values) {
  const sortedValues = values.sort();
  return fourAway(sortedValues) && noMultiples(values);
}

function isStraight(hand) {
  return cardsInSequence(valuesFromHand(hand));
}

function isStraightFlush(hand) {
  return isStraight(hand) && isFlush(hand);
}

function checkHand(hand) {
  if(isTwoPair(hand)) {
    return "two pair";
  } else if(isPair(hand)) {
    return "pair";
  } else if(isFullHouse(hand)) {
    return "full house";
  } else if(isTriple(hand)) {
    return "three of a kind";
  } else if(isQuadruple(hand)) {
    return "four of a kind";
  } else if(isStraightFlush(hand)) {
    return "straight flush";
  } else if(isFlush(hand)) {
    return "flush";
  } else if(isStraight(hand)) {
    return "straight";
  } else {
    return "high card";
  }
}

describe("valuesFromHand()", () => {
  it("returns just the values from a hand", () => {
    const result = valuesFromHand(["2-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(deepEqual(result, ["2", "3", "4", "5", "2"]));
  })
});

describe("highestCount()", () => {
  it("returns count of the most common card from array", () => {
    const result = highestCount(["2", "4", "4", "4", "2"]);
    wish(result === 3);
  });
})

describe("multiplesIn()", () => {
  it("finds a duplicate", () => {
    const result = multiplesIn(["2-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(result === 2);
  });
});

describe("isPair()", () => {
  it("finds a pair", () => {
    const result = isPair(["2-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(result);
  });
});

describe("suitsFor()", () => {
  it("returns just the suit from a hand", () => {
    const result = suitsFor(["3-A", "3-B", "4-D", "2-H", "5-D"]);
    wish(deepEqual(result, ["A", "B", "D", "H", "D"]));
  });
});

describe("noMultiples()", () => {
  it("reports true when all elements are different", () => {
    const result = noMultiples(["2", "6"]);
    wish(result);
  });

  it("reports false when some elements are the same", () => {
    const result = noMultiples(["2", "2"]);
    wish(!result);
  });
});

describe("allTheSameSuit()", () => {
  it("reports true if elements are the same", () => {
    const result = allTheSameSuit(["D", "D", "D", "D", "D"]);
    wish(result);
  });

  it("reports false if elements are not the same", () => {
    const result = allTheSameSuit(["D", "H", "D", "D", "D"]);
    wish(!result);
  });
});

describe("fourAway()", () => {
  it("reports true if first and last are 4 away", () => {
    const result = fourAway(["2", "6"]);
    wish(result);
  });
});

describe("checkHand()", () => {
  it("handles two pair", () => {
    const result = checkHand(["2-D", "2-H", "3-H", "3-D", "8-D"]);
    wish(result === "two pair");
  });

  it("handles pairs (페어 검사)", () => {
    const result = checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(result === "pair");

    const anotherResult = checkHand(["3-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(anotherResult === "pair");
  });

  it("handles full house", () => {
    const result = checkHand(["2-D", "2-H", "3-H", "3-D", "3-C"]);
    wish(result === "full house");
  });

  it("handles three of a kind (세개 검사)", () => {
    const result = checkHand(["3-H", "3-C", "3-D", "5-H", "2-H"]);
    wish(result === "three of a kind");
  });

  it("handles four of a kind", () => {
    const result = checkHand(["3-H", "3-C", "3-D", "3-S", "2-H"]);
    wish(result === "four of a kind");
  });

  it("handles straight flush", () => {
    const result = checkHand(["1-H", "2-H", "3-H", "4-H", "5-H"]);
    wish(result === "straight flush");
  });

  it("handles flush", () => {
    const result = checkHand(["2-H", "5-H", "9-H", "7-H", "3-H"]);
    wish(result === "flush");
  });

  it("handles high card", () => {
    const result = checkHand(["2-H", "5-C", "9-D", "7-S", "3-H"]);
    wish(result === "high card");
  });

  it("handles straight", () => {
    const result = checkHand(["1-H", "2-H", "3-H", "4-H", "5-D"]);
    wish(result === "straight");
  });
});