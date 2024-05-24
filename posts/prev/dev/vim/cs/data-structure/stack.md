# 스택 Stack

<https://www.zerocho.com/category/Algorithm/post/5800b79e1dfb250015c38db6>

## 설명

* 연결 리스트
* `push`, `pop`
* no shift, unshift
* `top`
* `stack overflow`
  * 주어진 스택 메모리보다 데이터를 더 넣었을 때 발생
* `stack undeflow`
  * 스택이 메모리가 비어있는데 거기서 데이터를 꺼내려고 했을 때 발생

## Stack Code

```js
var Stack = (function() {
  function Stack() {
    this.top = null;
    this.count = 0;
  }
  function Node(data) {
    this.data = data;
    this.next = null;
  }
  Stack.prototype.push = function(data) {
    var node = new Node(data);
    node.next = this.top;
    this.top = node;
    return ++this.count;
  };
  Stack.prototype.pop = function() {
    if (!this.top) { // stack underflow 방지
      return false;
    }
    var data = this.top.data;
    this.top = this.top.next;
    // 예전 this.top의 메모리 정리
    this.count--;
    return data;
  };
  Stack.prototype.stackTop = function() {
    return this.top.data;
  };
  return Stack;
})();
```

## Stack Usage

```js
var stack = new Stack();
stack.push(1); // 1
stack.push(3); // 2
stack.push(5); // 3
stack.pop(); // 5
stack.stackTop(); // 3
```
