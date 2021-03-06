##### top
# 리팩토링 자바스크립트

* 저자: 에반 버차드

<br/>

00. [``VSCode`` 에서 디버깅 방법](#00)

01. [Node.js의 ``assert`` 라이브러리](#01)

02. [``Mocha`` 테스트 프레임워크 설치 및 사용](#02)

03. [``wish`` assert 라이브러리](#03)

04. [테스트 주도 개발(TDD) 방법](#04)

05. [테스트 주도 개발(TDD) 정리](#05)

06. [기본적인 리팩토링 목표](#06)

07. [간단한 구조 리팩토링](#07)



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

실행하면 검사대상의 실제 값을 메시지로 알려주며, 확인한 실제 값은 ``특성화 테스트(Characterization Test)``의 두번째 인자로 변경 합니다.

```javascript
// 특성화 테스트 실시
describe("mySum()", () => {
  it("특성화 테스트", () => {
    wish(mySum(1, 2), true); // 테스트 메시지로 3 확인
  });
});
```

<br/>

```javascript
// 특성화 테스트의 확인결과를 적용
describe("mySum()", () => {
  it("특성화 테스트", () => {
    wish(mySum(1, 2), 3);
  });

  it("1 + 2", () => {
    wish(mySum(1, 2) === 3);
  });
});
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 05
## 05. 테스트 주도 개발(TDD) 정리

테스트 주도 개발은 ``적색/녹색/리펙토링`` 단계를 주기로 개발하는 방법 입니다.

테스트를 하는 주 목족은 ``코드에 대한 확신``을 얻기 위함 입니다.

1. 테스트 코드 작성 (적색 단계)
2. 테스트 코드에 통과하는 코드 작성 (녹색 단계)
3. 리펙토링

<br/>

테스트를 거치지 않은 코드를 새롭게 테스트 할 때는 ``특성화 테스트(Characterization Test)``를 작성 합니다.

<br/>

버그를 수정할 때는 ``회귀 테스트``를 작성하여, 버그를 재현하여 정확한 현상을 파악한 후, 해당 기능을 변경 또는 추가 하여 해결 합니다.



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 06
## 06. 기본적인 리팩토링 목표

``리팩토링``이란, 품질향상을 위해 코드의 동작은 변경하지 않고, 안전하게 코드를 변경하는 절차 입니다.

프로그램을 구성하는 코드는 함수로써 동작을 하는데, 다양한 처리를 위해 하나의 함수에서 여러가지 일을 처리해야 할 경우가 많습니다.

이때, 하나의 함수에서 한번에 구현하게 되면 ``대규모(Bulk) 함수``의 형태가 되는데, 이는 함수가 복잡해지고 테스트가 어렵게 됩니다.

이를 해결하기 위해, ``대규모(Bulk) 함수``를 기능별 메서드 또는 함수로 나누는 리팩토링을 합니다.


<br/><br/>


### 06-01. 대규모 함수

``대규모(Bulk) 함수``가 되는 요인에는 ``복수의 분기문``이 존재할 경우 입니다.

각 분기문을 별도의 메서드 또는 함수로 분리하면, ``대규모(Bulk) 함수``는 분기문에 해당하는 메서드 또는 함수를 호출하는 방식으로 리팩토링할 수 있습니다.

```javascript
// 리펙토링 전 상태
function bulkFunction() {
  const val = 1;
  const state = false;

  switch(val) {
    // ...
  }

  if(state) {
    // ...
  } else {
    // ...
  }
}
```

<br/>

```javascript
// 리펙토링 후
function doSomething_1(val) {
  // ...
}

function doSomething_2(state) {
  // ...
}

function bulkFunction() {
  const val = 3;
  const state = false;

  doSomething_1(val);

  doSomething_2(state);
}
```


<br/><br/>


### 06-02. 입력

Javascript의 입력 방법에는 ``명시적``, ``암시적``, ``비지역적`` 입력 방법이 있습니다.

<br/>

함수 또는 메서드에는 ``매개변수(입력)``을 통해 동작을 할 수 있습니다.

함수 또는 메서드 정의에서 작성한 매개변수(입력)을 ``명시적 입력``이라고 하며, 가장 안전한 방법 입니다.

<br/>

반면, 함수 또는 메서드 내에서 사용한 ``this``는 ``암시적 입력``이라고 하는데, ``암시적 입력``은 호출 방식에 따라 ``this``가 지칭하는 객체가 달라지므로, 오동작 또는 버그가 발생할 가능성이 있습니다.

다만, ``class``내에서 사용하는 ``this``는 ``객체 자신``을 표현하므로, ``암시적 입력``이 아닌, 리터럴 객체로써 사용할 수 있습니다.

<br/>

마지막으로 ``비지역적 입력``은 함수 외부에 있는 변수 또는 객체에 접근하는 방식인데, 함수 또는 메서드 내에서 접근한 ``비지역적 변수``의 이름이 변경될 가능성이 있는 경우, 에러 요소가 됩니다.

<br/>

따라서, 함수 또는 메서드는 가능하면 ``명시적 입력``을 사용하도록 만드는 것이 안전한 코드가 됩니다.


<br/><br/>


### 06-03. 출력

함수는 처리 결과를 반환할 수 있습니다.

함수 또는 메서드의 반환형은 ``단일 타입``이 되도록 하는것이 좋습니다.

분기문에 따라 다양한 타입을 반환한다면, 테스트가 힘들고, 버그에 취약합니다.

<br/>

객체 내의 데이터 가공만을 위해, 반환값이 없는 ``void``형 메서드가 필요한 경우도 많은데, 이경우는 ``void`` 보다는 ``this(자신이 포함된 객체)``를 반환하도록 하는 것이 좀 더 나은 경우가 많습니다.

이유는, 메서드의 반환형이 결국 자신이므로 ``메서드 체이닝``으로 사용할 수 있기 때문에 마치 ``JQuery``와 같이 사용할 수 있기 때문입니다.


<br/><br/>


### 06-04. 암시적 입력 ``this``

Javascript의 ``this``는 ``Execution Context``에 의해 결정됩니다.

``Execution Context``가 열리는 시점에 ``this``가 결정되기 때문에, 함수를 호출하는 방식에 따라 ``this``가 달라질 수 있습니다.

<br/>

이러한 ``this``는 ``class``내의 ``메서드``에서 사용하는 것이 안전합니다.


<br/><br/>


### 06-05. 비공개

Javascript에서 ``비공개``를 구현하기 위해서는 ``class``의 ``#``문법이 가장 간단하게 구현할 수 있습니다.

``비공개``로 설정된 ``멤버 변수`` 또는 ``함수``는 잘못된 사용을 막거나 데이터 오염을 막기 때문에 유용합니다.


<br/><br/>


### 06-06. 정리

Javascript의 리팩토링에는 다음과 같은 사항을 고려하는 것이 좋습니다.

* ``대규모 함수``의 ``코드 라인 수``또는 ``복잡성``을 낮게 유지하도록 합니다.
* ``입력`` 횟수를 적게 유지 합니다.
* ``명시적 입력``을 선호 합니다.
* ``this`` 사용은 ``class``내에서만 사용합니다.
* ``반환값``은 ``단일 타입``을 갖도록 합니다.



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 07
## 07. 간단한 구조 리팩토링

코드 테스트와 리팩토링을 위해 사용할 예시 코드는 ``나이브 베이즈 분류자(Naive Bayes Classifier) 알고리즘`` 을 사용합니다.

``나이브 베이즈 분류자(Naive Bayes Classifier) 알고리즘``은 ``머신러닝``에서 사용되는 알고리즘 입니다.

이 알고리즘은 이전 지식을 바탕으로 ``항목을 분류``하는데 강력합니다.

<br/>

``나이브 베이즈 분류자(Naive Bayes Classifier) 알고리즘``을 사용한 코드를 보게되면, 사전지식이 있지 않으면 코드를 이해하기 어렵습니다.

이 때, 코드를 이해하기 위해 ``알고리즘을 사전 공부``하거나 하는것이 아닌, 코드 ``테스트`` 와 ``리팩토링``으로 ``확신``을 가질 수 있습니다.

> 예시 코드: ``00-nb.js``

<br/>

예시 코드에 ``테스트 코드``는 작성되지 않았지만, 실행 시 의도했던 동작을 하고 있습니다.

이것은 ``수동 테스트``를 거쳤다는 의미를 가집니다.

동일한 입력에 동일한 값이 반환되고, 결과값이 기대한 값이 됨을 확인하였으므로, ``테스트 코드가 없지만`` 테스트를 거쳤다고 볼 수 있습니다. (수동 테스트)

이와같이 ``자동 테스트`` 또는 ``수정 테스트``가 된 코드는 ``리팩토링이 가능한`` 코드가 됩니다.


<br/><br/>


### 07-01. 이름 바꾸기

가장 쉬운 리팩토링이자 가장 먼저 할 수 있는 리팩토링은 ``이름 바꾸기`` 입니다.

변수, 함수 등의 이름이 ``의미전달``이 가능한지, ``오타``가 있는지, ``코딩 컨벤션``에 맞는지에 대한 ``이름 변경``으로 리팩토링을 할 수 있습니다.


<br/><br/>


### 07-02. 죽은코드 및 추측코드 삭제

``죽은코드``란 프로그램 실행 시, 도달하지 못하여 동작하지 않는 코드를 말합니다.

아무런 역할이 없으므로, 리팩토링 시 삭제해야 합니다.

<br/>

``추측코드``는 나중에 사용하기 위해, ``주석처리한 코드``를 말합니다.

만약, ``추측코드``가 활성화 된다면 의도치 않은 동작을 일으킬 수 있기 때문에, ``추측코드`` 역시 리팩토링 단계에서 지워야 하는 코드 입니다. 


<br/><br/>


### 07-03. 쓸때없는 줄바꿈 삭제

줄바꿈이 2줄 이상 되는 경우, 코드가 산만해 집니다.

특히, ``$git diff``를 사용하여, 코드 변경사항을 확인할 때, 연속된 복수의 줄바꿈은 코드의 변경사항을 확인하는데 방해요소가 됩니다.


<br/><br/>


### 07-04. 아무것도 하지 않는 코드 삭제

아무것도 하지 않는 코드는 다음과 같은 코드 입니다.

```javascript
const arr = [1, 2, 3];

if(!!(arr.includes(1))) {
  // ...
}
```

<br/>

위의 코드에서 ``!!``를 사용하여 ``Boolean``형식으로 값을 변환하는데, ``Array.prototype.includes()``에 의해 이미 ``Boolean``값을 반환하고 있습니다.

즉, ``!!`` 코드는 아무것도 하지 않는 코드 입니다.

이러한 코드 역시 리팩토링 시 삭제해야 하는 코드 입니다.


<br/><br/>


### 07-05. 디버깅 / 로깅 구문 삭제

``수동 테스트``에서는 ``디버깅`` 또는 ``로깅``에 대한 코드가 테스트의 과정이 됩니다.

하지만, ``디버깅 / 로깅`` 코드가 존재함으로써, 리팩토링 과정에서 삭제해야 했던 코드를 미처 삭제하지 않았거나 할 경우, 문제를 일으킬 수 있습니다.

또한, ``디버깅 / 로깅`` 코드에 의해, ``사용자 경험 저하``의 현상을 발생 시킬수도 있습니다. (속도 저하)


<br/><br/>


### 07-06. ``매직 넘버``와 ``매직 문자열``

여기서 사용된 ``매직``의 의미는, ``갑자기 나타난 리터럴 값``을 의미 합니다.

``매직 넘버``또는 ``매직 문자열``은 사용하는 ``Scope``에 따라, 해당 ``Scope``의 ``최상위``에서 ``리터럴 변수``로 선언하여 사용해야 합니다.

<br/>

동일한 ``매직 넘버`` 또는 ``매직 문자열``이 복수로 사용되면, 값의 변경과 같이 유지보수가 어렵습니다.


<br/><br/>


### 07-07. 긴 코드 줄 (변수)

변수명에 의미를 부여하기 위해 작명을 하다보면, 길어질 수 있습니다.

이 경우, 해당 변수를 연산할 때 코드줄이 길어질 수 있는데, 변수명을 축약하는 것 보다는 연산자를 축약하는 방법이 더 좋습니다.

예를 들면, ``2항 연산자``를 사용하게 되면 변수명을 한번만 작성하므로, 코드줄을 줄일 수 있습니다.


<br/><br/>


## 07-08. 인라인 함수 호출

특정 값을 반환하는 함수의 경우, 반환되는 값에 의해 변수처럼 사용되는 경우가 생길 수 있습니다.

이러한 경우를 ``함수 결과가 변수로 설정되는 것``이라고 볼 수 있는데, 이 함수는 ``인라인``함수 또는 ``제거할``함수로써 리팩토링 할 수 있습니다.

예를 들면 다음과 같습니다.

```javascript
const myList = [1, 2, 3];

function getTotal() {
  return myList.length;
}
```

위의 ``getTotal()``함수는 ``myList``의 요소개수를 반환하는데, 이는 ``myList.length``의 변수와 동일한 역할만 하므로, 결론적으로 ``함수 결과가 변수로 설정되는 것``입니다.


<br/><br/>


### 07-09. ``캐싱 변수`` 도입

특정 함수에 의해 반환된 결과에 대해서 복수의 처리가 필요한 경우가 있습니다.

이때는 복수의 함수 호출이 아닌, 함수 호출의 반환값을 ``변수``에 담아서 사용해야 중복된 작업을 제거할 수 있습니다.

예를 들면 다음과 같습니다.

```javascript
// ``캐싱 변수`` 도입 전
document.querySelector(".myDiv").style.width = "5px";
document.querySelector(".myDiv").style.height = "10px";
```

<br/>

```javascript
// ``캐싱 변수`` 도입
const myDiv = document.querySelector(".myDiv");
myDiv.style.width = "5px";
myDiv.style.height = "10px";
```

<br/>

위와같이 ``캐싱 변수``를 사용하게 되면, 특정 요소에 접근하는 ``document.querySelector()``함수를 한번만 실행하게 되므로, 성능을 향상시키는 리팩토링이 됩니다.


<br/><br/>


### 07-10. 배열의 반복문

Javascript에는 여러가지의 반복문을 사용할 수 있습니다.

여기서 주의할 점은 ``for ... in``구문을 사용하는 것은 좋지 않은 선택 입니다.

이유는 ``for ... in``에서 접근하게되는 ``index값``은 배열의 ``순서를 보장하지 않는`` 특성을 갖고 있기 때문입니다.

<br/>

가독성을 좀 더 신경을 쓴다면, ``Array API``를 사용하는것이 좋습니다.



<br/><hr/><br/>



## 08. 개층구조 내부의 리팩토링

동일한 ``scope``에서 변수와 함수를 작성하여 프로그램을 작성할 수 있습니다.

하지만, 이렇게 작성된 코드는 재사용이 불편하고 구조가 잡히지 않습니다.

따라서, 하나의 객체 또는 클래스를 사용하여, 데이터를 구조화 하고 상속 등을 사용하여 코드의 재사용성을 늘릴 수 있습니다.


<br/><br/>


### 08-01. 계층구조 구축하기

계층구조를 만들기 위해, ``생성자 함수`` 또는 ``class``를 사용할 수 있습니다.

다음은 ``class``를 사용한 예시 입니다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printInfo() {
    console.log(`이름: ${this.name}, 나이: ${this.age}`);
  }
}

const kim = new Person("kim", 35); // 이름: kim, 나이: 35
```

<br/>

위 코드는 ``Person`` 클래스를 사용하여 객체를 생성 합니다.

위 코드로도 이미 재사용와 구조에 대한 이점이 많습니다.

새로운 ``Person`` 객체를 생성하기도 좋고, ``Person``객체 내부와 관련된 메서드도 제공하고 있습니다.

<br/>

여기서 ``Person`` 클래스를 상속하여, 국가에 대한 정보까지 가지는 객체를 만들고자 하면, ``Person``을 ``상속``받는 ``class``를 작성하면, 코드의 재사용을 높여서 만들 수 있습니다.

다음은 한국인과 미국인에 대한 ``class``를 작성한 예시 입니다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printInfo() {
    console.log(`이름: ${this.name}, 나이: ${this.age}`);
  }
}

// 한국인 class
class Korean extends Person {
  constructor(name, age, country) {
    super(name, age);
    this.country = country;
  }

  printInfo() {
    console.log(`이름: ${this.name}, 나이: ${this.age}, 국적: ${this.country}`);
  }
}

// 미국인 class
class American extends Person {
  contructor(name, age, country) {
    super(name, age);
    this.country = country;
  }

  printInfo() {
    console.log(`이름: ${this.name}, 나이: ${this.age}, 국적: ${this.country}`);
  }
}

const korean = new Korean("kim", 35, "한국");
korean.printInfo(); // 이름: kim, 나이: 35, 국적: 한국

const american = new American("bob", 40, "미국");
american.printInfo(); // 이름: bob, 나이: 40, 국적: 미국
```

<br/>

위와 같이 ``Person``를 재사용하여 ``Korean``과 ``American`` 클래스를 만들 수 있습니다.

``Person``과 동일하지만, ``country``라는 데이터가 확장된 형태로 만들 수 있게 되었습니다.

<br/>

현재 ``printInf()``함수를 보면, ``Korean``과 ``American``에 중복된 코드라는 것을 알 수 있습니다.

이러한 경우는 ``상위 클래스(Person)``에서 이를 처리하면 중복 코드를 제거할 수 있는 경우도 있습니다.

다음 코드는 ``country`` 데이터를 ``상위 클래스(Person)``에서 처리하므로써, ``Korean``과 ``American``의 ``printInfo()`` 중복코드를 제거한 방법 입니다.

```javascript
class Person {
  constructor(name, age, country) {
    this.name = name;
    this.age = age;
    this.country = country;
  }

  printInfo() {
    console.log(`이름: ${this.name}, 나이: ${this.age}, 국적: ${this.country}`);
  }
}

class Korean extends Person {
  constructor(name, age) {
    super(name, age, "한국");
  }
}

class American extends Person {
  constructor(name, age) {
    super(name, age, "미국");
  }
}

const korean = new Korean("kim", 35);
korean.printInfo(); // 이름: kim, 나이: 35, 국적: 한국

const american = new American("bob", 40);
american.printInfo(); // 이름: bob, 나이: 40, 국적: 미국
```

<br/>

여기서 주의할 점은, 단순 기능을 상위, 하위 클래스에 분산하여 처리하면, 코드를 파악하기 어려워 질 수 있습니다.

즉, 상위 클래스에서 전임을 할지, 하위 클래스에서 전임을 할지에 대한 설계를 생각해야 좋은 계층구조를 만들 수 있습니다.


<br/><br/>


## 08-02.