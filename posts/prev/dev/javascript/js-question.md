# js questions

## this

* [MDN this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
* [제로초 실행컨텍스트](https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0)
* [제로초 함수의 범위(스코프)](https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e)
* [제로초 this](https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb)

컨텍스트에 생긴 변수이며, 일반 함수/화살표 함수/객체의 함수/생성자 함수 등의 컨텍스트에서 각자 다른 컨텍스트의 값을 참조합니다. 기본적으로는 windows이며, 객체 메서드 및 함수 메서드의 bind, call, apply와 new 생성자에서만 this가 가르키는 값이 바뀝니다. strict 모드에서는 undefined 입니다.

## closure

실행 컨텍스트 중, 비공개 변수를 가질 수 있는 환경에 있는 함수를 클로져라고 합니다. 함수의 실행컨텍스트와 스코프체인을 통해 클로져는 비공개 변수에 접근할 수 있으며, IIFE(즉시 호출 함수 표현식) 등에서 활용되기도 합니다.

## 실행컨텍스트

실행컨텍스트는 자바스크립트가 실행될 때 생성되는 컨텍스트를 의미합니다. 자바스크립트 코드가 처음 실행될 때 생기는 전역 컨텍스트 이후 함수를 호출할 때마다 개별 컨텍스트가 생깁니다. 컨텍스트 내부에는 변수 객체, 스코프 체인, this가 생성됩니다. 컨텍스트 생성 이후 함수가 실행되는데, 함수가 실행되면서 컨텍스트 내부의 변수 값을 참조하며, 컨텍스트 내부에 없을 경우 스코프 체인을 올라가며 값을 찾습니다. 함수 실행이 마무리되면 해당 컨텍스트는 사라집니다. 다만 클로져의 경우는 남아있습니다.

## 비동기

[캡틴판교 JS 비동기 1~3](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

크게 3가지로 나뉩니다. callback, promise, async-await. callback의 경우 ES6 Promise가 나오기 이전 주로 사용되던 방식입니다. 비동기 함수의 인자에 callback 함수를 인자로 넣어 비동기 함수의 결과물을 필요로 하는 로직을 구현하였습니다. 연속으로 비동기 함수를 작성해야 할 때 코드의 깊이가 깊어지면서 callback hell이라고 불릴 정도로 코드가 어려워지고, 비동기 처리도 어렵다는 단점이 있습니다. Promise는 ES6 에서 새로 등장한 비동기 처리 개념입니다. 비동기 상황을 pending, fullfilled, rejected 3개로 표현하여 비동기를 쉽게 처리할 수 있으며, then/reject/catch로 비동기 상태에 대한 값을 처리할 수 있고 체이닝을 통해 로직을 이어갈 수 있습니다. async-await는 ES8부터 지원된 비동기 처리 방식이며, async function을 통해 callback hell, then chaining의 방식보다 코드의 가독성도 좋아지고, 기존의 비동기 처리 방식대로 사고하지 않아도 된다는 장점이 있습니다.

## JS 메모리 관리

[mdn 메모리 관리](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)
[toast ui 메모리 관리](https://ui.toast.com/weekly-pick/ko_20210611)

자바스크립트는 메모리를 관리하는데 가비지 컬렉터를 사용한다. 사용하지 않는 변수, 객체, 함수 등을 자동으로 수집하여 할당된 메모리를 지우며, 개발자가 수동으로 메모리를 관리하지 않아도 된다. 하지만 가비지 컬렉터가 지우지 못하는 경우에 대해서는 개발자가 수동으로 null을 할당하여 관리할 수 있다.
