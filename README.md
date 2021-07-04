##### top
# 리팩토링 자바스크립트

* 저자: 에반 버차드

<br/>

00. [``VSCode`` 에서 디버깅 방법](#00)

01.  [Node.js의 ``assert`` 라이브러리](#01)

02.  [``Mocha`` 테스트 프레임워크 설치 및 사용](#02)

03.  [``wish`` assert 라이브러리](#03)

04.  [테스트 주도 개발(TDD) 방법](#04)



<br/><hr/><br/>



##### 00
## 00. ``VSCode`` 에서 디버깅 방법

``VSCode``의 좌측에 ``실행 및 디버그`` 패널이 있습니다.

패널에 있는 ``실행 및 디버그``를 클릭하면, 지정한 ``Break Point``에서 일시정지되며 디버깅 모드가 실행 됩니다.

단축키는 다음과 같습니다.

* ``F5``: ``디버깅 시작`` 또는 ``다음 Break Point``까지 실행
* ``Shift`` + ``F5``: 디버깅 종료



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 01
## 01. Node.js의 ``assert`` 라이브러리

코드 구현중에 특정 부분을 테스트 하고 싶을 때, ``console.log()``를 사용하곤 합니다.

``Node.js``에 내장된 ``assert`` 라이브러리를 사용하면, ``코드 오류`` 또는 ``기대값 불일치``일 때만 터미널에 에러코드를 출력해 줍니다.

<br/>

``assert``함수의 스팩은 다음과 같습니다.

```typescript
function assert(value: 검사대상, message?: 에러메시지 | Error): asserts value;
```

<br/>

아래 코드는 간단한 사용 예시 입니다.

```javascript
const assert = require("assert");

function sum(a, b) {
  return a + b;
}

assert(sum(1, 2) === 3); // 정상 통과
assert(sum(10, 20) === 10); // 에러코드 출력
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 02
## 02. ``Mocha`` 테스트 프레임워크 설치 및 사용

``Javascript``의 테스트 프레임워크 중 하나인 ``Mocha`` 입니다.

설치는 ``global`` 에 설치하여 CLI로 사용할 수 있도록 합니다.

```bash
$ npm i -g mocha
```

<br/>

``mocha``를 사용하여 ``javascript 테스트``를 하려면, 다음 메서드를 사용하여 테스트 케이스를 만들 수 있습니다.

```javascript
describe("커버리지 명", () => { /* 커버리지 구현 */ });
```

```javascript
it("테스트 명", () => { /* 테스트 구현 */});
```

```javascript
const wish = require("wish");

describe("테스트 커버리지", () => {
  it("테스트 1", () => {
    // assert관련 함수 구현부
    wish(/* 테스트 */);
  })
});
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 03
## 03. ``wish`` assert 라이브러리

``wish``는 Node.js의 ``assert``를 개량한 라이브러리 입니다.

에러 메시지를 자동으로 작성해 주며, ``특성화 테스트(Characterization Test)`` 기능을 제공 합니다.

<br/>

다음과 같이 설치할 수 있습니다.

```bash
$ npm i wish
```

<br/>

사용법은 다음고 같습니다.

```javascript
const wish = require("wish");

describe("테스트", () => {
  it("하위 테스트", () => {
    wish(3 > 4); // 테스트 에러 발생
  });
});
```

<br/>

검사대상의 ``특성화 테스트(Characterization Test)``를 하려면, 두번째 인자에 ``true``값을 넘겨주면 됩니다.

```javascript
const wish = require("wish");

function myFunc() {
  const a = 1 + 2;
}

describe("myFunc()", () => {
  it("특성화 테스트", () => {
    wish(myFunc(), true); // myFunc()의 반환값이 undefined임을 출력
  });
});
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 04
## 04. 테스트 주도 개발(TDD) 방법

``테스트 주도 개발(TDD)``은 테스트 코드를 기반으로 테스트에 통과되도록 유도하며 작성하는 코딩 방법을 말합니다.

``TDD``의 작업 흐름은 다음과 같습니다.

1. 구현할 함수명 정의
  ```javascript
    function mySum() { }
  ```

2. 구현할 함수에 대한 ``테스트 코드`` 작성
  ```javascript
    const wish = require("wish");
  
    describe("mySum()", () => {
      it("두 인자의 합", () => {
        wish(mySum(1, 2) === 3);
      });
    });
  ```

3. ``mySum()``함수에는 인자를 받지도 않고, 반환도 하지 않는 상태이므로, 테스트 실패가 됩니다. (적색 상태)

4. ``mySum()``함수가 테스트를 통과하도록 ``mySum()``을 구현 합니다.
  ```javascript
    function mySum(a, b) {
      return a + b;
    }
  ```

5. 다시 테스트를 실행하면, 테스트에 통과하게 됩니다.

<br/>

위와같은 과정으로 코드를 작성하는 방식을 ``테스트 주도 개발(TDD)`` 라고 합니다.

테스트 코드를 작성한 후, 해당 테스트에 통과하도록 구현하는 방식이므로, 구현과 검증이 함께 만들어 집니다.

<br/>

만약, 테스트 코드가 없는 기존의 코드에 테스트 코드를 추가한다면, 가장 먼저 ``특성화 테스트(Characterization Test)``를 실행해야 합니다.

이유는, Javascript의 특징 중 ``Side Effects``에 의해, 함수의 반환값이 의도치 않게 변형될 수 있기 때문입니다.

예를 들면, 반환값이 없는 함수는 ``undefined``를 반환하지만, 이는 ``== null`` 로 검사할 때 통과하게 되기 때문입니다.

<br/>

``wish`` 라이브러리를 사용하면, 두번째 인자에 ``true``를 넣어 ``특성화 테스트(Characterization Test)`` 모드로 실행할 수 있습니다.

실행하면 검사대상의 실제 값을 메시지로 알려주며, 확인 후 해당 ``특성화 테스트(Characterization Test)``는 주석처리 합니다.

이유는, ``특성화 테스트(Characterization Test)``는 테스트 통과 개념이 아닌 확인 개념이기 때문입니다.

```javascript
// 특성화 테스트 실시
describe("mySum()", () => {
  it("특성화 테스트", () => {
    wish(mySum(), true);
  });
});
```

<br/>

```javascript
// 특성화 테스트 주석처리 및
// 실제 테스트 실행
describe("mySum()", () => {
  // it("특성화 테스트", () => {
  //   wish(mySum(), true);
  // });

  it("1 + 2", () => {
    wish(mySum(1, 2) === 3);
  });
});
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 05
## 05.