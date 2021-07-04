const s = ["H", "D", "S", "C"];
const v = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const rS = function() {
  return s[Math.floor(Math.random() * s.length)];
}

const rV = function() {
  return v[Math.floor(Math.random() * v.length)];
}

const rC = function() {
  return rV() + "-" + rS();
}

const doIt = function() {
  const c = [];

  c.push(rC());
  c.push(rC());
  c.push(rC());
  c.push(rC());
  c.push(rC());

  return c;
}

doIt();

console.log(doIt());

const wish = require("wish");

describe("doIt()", () => {
  // it("returns something", () => {
  //   wish(doIt(), true);
  // });

  it("returns something with a length of 5", () => {
    wish(doIt().length === 5);
  });
});

describe("rC()", () => {
  it("returns something", () => {
    // wish(rC(), true);
    wish(rC().match(/\w{1,2}-[HDSC]/));
  });
});

describe("rV()", () => {
  it("returns something", () => {
    // wish(rV(), true);
    wish(rV().match(/\w{1,2}/));
  });
});

describe("rS()", () => {
  it("returns something", () => {
    // wish(rS(), true);
    wish(rS().match(/[HDSC]/));
  });
});

