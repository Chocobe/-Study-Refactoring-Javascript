// NBC (Naive Bayes Classifier)
const Classifier = function() {
  function SongList() {
    this.difficulties = ["easy", "medium", "hard"];
    this.allChords = new Set();
    this.songs = [];
    
    this.addSong = function(name, chords, difficulty) {
      this.songs.push({
        name,
        chords,
        difficulty: this.difficulties[difficulty],
      });
    }
  }

  this.songList = new SongList();
  this.labelCounts = new Map();
  this.labelProbabilities = new Map();
  this.chordCountsInLabels = new Map();
  this.smoothing = 1.01;

  this.likelihoodFromChord = function(difficulty, chord) {
    return this.chordCountForDifficulty(difficulty, chord) / this.songList.songs.length;
  }

  this.valueForChordDifficulty = function(difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);
    return value ? value + this.smoothing : 1;
  }
  
  this.classify = function(chords) {
    return new Map(Array.from(this.labelProbabilities.entries()).map(labelWithProbability => {
      const difficulty = labelWithProbability[0];
      return [
        difficulty, 
        chords.reduce((total, chord) => {
          return total * this.valueForChordDifficulty(difficulty, chord);
        }, this.labelProbabilities.get(difficulty) + this.smoothing)
      ];
    }));
  }

  this.chordCountForDifficulty = function(difficulty, testChord) {
    return this.songList.songs.reduce((counter, song) => {
      if(song.difficulty === difficulty) {
        counter += song.chords.filter((chord) => {
          return chord === testChord;
        }).length;
      }

      return counter;
    }, 0);
  }

  this.trainAll = function() {
    this.songList.songs.forEach(song => {
      this.train(song.chords, song.difficulty);
    });
  
    this.setLabelProbabilities();
  }

  this.train = function(chords, label) {  
    chords.forEach(chord => this.songList.allChords.add(chord));
  
    if(Array.from(this.labelCounts.keys()).includes(label)) {
      this.labelCounts.set(label, this.labelCounts.get(label) + 1);
    } else {
      this.labelCounts.set(label, 1);
    }
  }

  this.setLabelProbabilities = function() {
    this.labelCounts.forEach((_count, label) => {
      this.labelProbabilities.set(label, this.labelCounts.get(label) / this.songList.songs.length);
    });
  }
};

// ?????? ????????? ?????? ??????
function fileName() {
  const theError = new Error("here I am");
  return theError.stack.match(/(\d+-\w+-?\w+\.js)/)[1];
}

// ?????? ????????? ??????
function welcomeMessage() {
  return `Welcome to ${fileName()}!`;
}

const wish = require("wish");

describe("the file", () => {
  const classifier = new Classifier();
  
  classifier.songList.addSong(
    "imagine",
    ["c", "cmaj7", "f", "am", "dm", "g", "e7"],
    0,
  );

  classifier.songList.addSong(
    "somewhereOverTheRainbow",
    ["c", "em", "f", "g", "am"],
    0,
  );

  classifier.songList.addSong(
    "tooManyCooks",
    ["c", "g", "f"],
    0,
  );

  classifier.songList.addSong(
    "iWillFollowYouIntoTheDark",
    ["f", "dm", "bb", "c", "a", "bbm"],
    1,
  );

  classifier.songList.addSong(
    "babyOneMoreTime",
    ["cm", "g", "bb", "eb", "fm", "ab"],
    1,
  );

  classifier.songList.addSong(
    "creep",
    ["g", "gsus4", "c", "cmsus4", "cm6"],
    1,
  );

  classifier.songList.addSong(
    "paperBag",
    ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"],
    2,
  );

  classifier.songList.addSong(
    "toxic",
    ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"],
    2,
  );

  classifier.songList.addSong(
    "bulletproof",
    ["d#m", "g#", "b", "f#", "g#m", "c#"],
    2,
  );

  classifier.trainAll();
  
  // classify() ????????? "????????? ?????????"
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

  // ?????? ????????? ?????????
  it("welcomeMessage()", () => {
    wish(welcomeMessage() === "Welcome to 01-object-nb.js!");
  });

  // labelProbabilities ????????? ?????????
  it("label probabilities", () => {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
