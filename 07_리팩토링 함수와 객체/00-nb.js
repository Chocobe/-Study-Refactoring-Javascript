// NBC (Naive Bayes Classifier)
const classifier = {
  // 셋업 함수
  allChords: new Set(),
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  smoothing: 1.01,

  likelihoodFromChord(difficulty, chord) {
    return this.chordCountForDifficulty(difficulty, chord) / songList.songs.length;
  },

  valueForChordDifficulty(difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);
    return value ? value + this.smoothing : 1;
  },
  
  classify(chords) {
    return new Map(Array.from(this.labelProbabilities.entries()).map(labelWithProbability => {
      const difficulty = labelWithProbability[0];
      return [
        difficulty, 
        chords.reduce((total, chord) => {
          return total * this.valueForChordDifficulty(difficulty, chord);
        }, this.labelProbabilities.get(difficulty) + this.smoothing)
      ];
    }));
  },

  chordCountForDifficulty(difficulty, testChord) {
    return songList.songs.reduce((counter, song) => {
      if(song.difficulty === difficulty) {
        counter += song.chords.filter((chord) => {
          return chord === testChord;
        }).length;
      }

      return counter;
    }, 0);
  },
};

// 노래 목록
const songList = {
  difficulties: ["easy", "medium", "hard"],
  songs: [],
  addSong(name, chords, difficulty) {
    this.songs.push({
      name,
      chords,
      difficulty: this.difficulties[difficulty],
    });
  },
};

// 현재 파일명 추출 함수
function fileName() {
  const theError = new Error("here I am");
  return theError.stack.match(/(\d+-?\w+\.js)/)[1];
}

// 환영 메시지 함수
function welcomeMessage() {
  return `Welcome to ${fileName()}!`;
}

function train(chords, label) {  
  chords.forEach(chord => classifier.allChords.add(chord));

  if(Array.from(classifier.labelCounts.keys()).includes(label)) {
    classifier.labelCounts.set(label, classifier.labelCounts.get(label) + 1);
  } else {
    classifier.labelCounts.set(label, 1);
  }
}

function setLabelProbabilities() {
  classifier.labelCounts.forEach((_count, label) => {
    classifier.labelProbabilities.set(label, classifier.labelCounts.get(label) / songList.songs.length);
  });
}

// 머신러닝 훈련 통합 함수
function trainAll() {
  songList.songs.forEach(song => {
    train(song.chords, song.difficulty);
  });

  setLabelProbabilities();
}

const wish = require("wish");

describe("the file", () => {
  songList.addSong(
    "imagine",
    ["c", "cmaj7", "f", "am", "dm", "g", "e7"],
    0,
  );

  songList.addSong(
    "somewhereOverTheRainbow",
    ["c", "em", "f", "g", "am"],
    0,
  );

  songList.addSong(
    "tooManyCooks",
    ["c", "g", "f"],
    0,
  );

  songList.addSong(
    "iWillFollowYouIntoTheDark",
    ["f", "dm", "bb", "c", "a", "bbm"],
    1,
  );

  songList.addSong(
    "babyOneMoreTime",
    ["cm", "g", "bb", "eb", "fm", "ab"],
    1,
  );

  songList.addSong(
    "creep",
    ["g", "gsus4", "c", "cmsus4", "cm6"],
    1,
  );

  songList.addSong(
    "paperBag",
    ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"],
    2,
  );

  songList.addSong(
    "toxic",
    ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"],
    2,
  );

  songList.addSong(
    "bulletproof",
    ["d#m", "g#", "b", "f#", "g#m", "c#"],
    2,
  );

  trainAll();
  
  // classify() 함수의 "특성화 테스트"
  it("classifies", () => {
    const classified = classifier.classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);

    wish(classified.get("easy") === 1.3433333333333333);
    wish(classified.get("medium") === 1.5060259259259259);
    wish(classified.get("hard") === 1.6884223991769547);
  });

  it("classifies again", () => {
    const classified = classifier.classify(["d", "g", "e", "dm"]);

    wish(classified.get("easy") === 2.023094827160494);
    wish(classified.get("medium") === 1.855758613168724);
    wish(classified.get("hard") === 1.855758613168724);
  });

  // 환영 메시지 테스트
  it("welcomeMessage()", () => {
    wish(welcomeMessage() === "Welcome to 00-nb.js!");
  });

  // labelProbabilities 특성화 테스트
  it("label probabilities", () => {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
