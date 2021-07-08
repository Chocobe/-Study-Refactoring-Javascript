// NBC(Naive Bayes Classifier: 나이브 베이즈 분류자) 알고리즘을 사용한 리팩토링 연습

imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];

somwhereOverTheRainbow = ["c", "em", "f", "g", "am"];

tooManyCooks = ["c", "g", "f"];

iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];

babyOneMoreTime = ["cm", "g", "bb", "eb", "fm", "ab"];

creep = ["g", "gsus4", "c", "cmsus4", "cm6"];

paperBag = ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"];

toxic = ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"];

bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];

// 노래 목록
// [난이도, 코드Array]로 구성된 배열
let songs = [];

// 레이블 목록
let labels = [];

// 모든 코드 목록
let allChords = [];

// 레이블당 개수 (난이도별 노래 개수)
let labelCounts = [];

// 레이블당 선택 확률
let labelProbabilities = [];

// 레이블(난이도)별 코드 개수
let chordCountsInLabels = [];

// 코드 확률 (파악 부족)
let probabilityOfChordsInLabels = [];

// 머신러닝 실행함수
// 노래의 코드에 따른 난이도 설정 기능
// label: 난이도
function train(chords, label) {
  // 노래 추가
  songs.push([label, chords]);
  // 레이블 추가
  labels.push(label);

  for(let index = 0; index < chords.length; index++) {
    // 새로운 코드일 경우 코드 추가
    if(!allChords.includes(chords[index])) {
      allChords.push(chords[index]);
    }
  }

  // 레이블 개수 갱신
  if(Object.keys(labelCounts).includes(label)) {
    labelCounts[label] = labelCounts[label] + 1;
  } else {
    labelCounts[label] = 1;
  }
};

// 노래 개수
function getNumberOfSongs() {
  return songs.length;
}

// 레이블당 선택 확률 계산
function setLabelProbabilities() {
  Object.keys(labelCounts).forEach(label => {
    const numberOfSongs = getNumberOfSongs();
    labelProbabilities[label] = labelCounts[label] / numberOfSongs;
  });
}

// 레이블(난이도)별 코드개수 데이터 생성
function setChordCountsInLabels() {
  songs.forEach(song => {
    // 레이블(난이도)에 대한 chordCountsInLabels 데이터가 없다면, 
    // 대상 레이블(난이도) 대한 객체 추가
    if(chordCountsInLabels[song[0]] === undefined) {
      chordCountsInLabels[song[0]] = {};
    }

    song[1].forEach(chord => {
      if(chordCountsInLabels[song[0]][chord] > 0) {
        // 코드 개수 정보가 있다면, 개수 증가
        chordCountsInLabels[song[0]][chord] = chordCountsInLabels[song[0]][chord] + 1;
      } else {
        // 코드 개수 정보가 없다면, 1개 등록
        chordCountsInLabels[song[0]][chord] = 1;
      }
    });
  });
}

// 레이블당 코드 선택 확률 계산?? (파악 부족)
function setProbabilitiesOfChordsInLabels() {
  probabilityOfChordsInLabels = chordCountsInLabels;

  Object.keys(probabilityOfChordsInLabels).forEach(difficulty => {
    Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(chord => {
      probabilityOfChordsInLabels[difficulty][chord] = 
        probabilityOfChordsInLabels[difficulty][chord] / songs.length;
    });
  });
}

const easy = "easy";
const medium = "medium";
const hard = "hard";

train(imagine, easy);
train(somwhereOverTheRainbow, easy);
train(tooManyCooks, easy);

train(iWillFollowYouIntoTheDark, medium);
train(babyOneMoreTime, medium);
train(creep, medium);

train(paperBag, hard);
train(toxic, hard);
train(bulletproof, hard);

setLabelProbabilities();
setChordCountsInLabels();
setProbabilitiesOfChordsInLabels();

function classify(chords) {
  const SMOOTHING = 1.01;
  
  console.log(labelProbabilities);

  const classified = {};

  Object.keys(labelProbabilities).forEach(difficulty => {
    let first = labelProbabilities[difficulty] + SMOOTHING;
    chords.forEach(chord => {
      const probabilityOfChordInLabel = probabilityOfChordsInLabels[difficulty][chord];

      if(probabilityOfChordInLabel) {
        first = first * (probabilityOfChordInLabel + SMOOTHING);
      }
    });

    classified[difficulty] = first;
  });

  console.log(classified);
}

classify(["d", "g", "e", "dm"]);
classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);