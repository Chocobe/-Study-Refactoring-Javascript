##### top
# 리팩토링 자바스크립트

* 저자: 에반 버차드



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