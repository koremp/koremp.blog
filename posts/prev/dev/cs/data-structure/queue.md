# 큐 Queue

<https://www.zerocho.com/category/Algorithm/post/580b9b94108f510015524097>

## 설명

* `enqueue`, `dequeue` (`push`, `shift`)
* `head`, `rear`
* LIFO
* __순환 큐__
  * `front`와 `rear`가 연결
  * `this.rear.next = this.front`
  * 메모리 관리가 쉬움
* __우선순위 큐__
  * `enqueue`할 때 우선순위 순서를 따져서 데이터를 넣습니다.
    * 어떤 데이터가 우선순위가 높은지 설정
  * 큐로 구현하면 데이터를 삽입하기 힘들다.

## Queue Code

```js
var Queue = (function() {
  function Queue() {
    this.count = 0;
    this.head = null;
    this.rear = null;
  }
  function Node(data) {
    this.data = data;
    this.next = null;
  }
  Queue.prototype.enqueue = function(data) {
    var node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.rear.next = node;
    }
    this.rear = node;
    return ++this.count;
  };
  Queue.prototype.dequeue = function() {
    if (!this.head) { // stack underflow 방지
      return false;
    }
    var data = this.head.data;
    this.head = this.head.next;
    // this.head 메모리 클린
    --this.count;
    return data;
  };
  Queue.prototype.front = function() {
    return this.head && this.head.data;
  };
  return Queue;
})();
```

## Queue Usage

```js
var queue = new Queue();
queue.enqueue(1); // 1
queue.enqueue(3); // 2
queue.enqueue(5); // 3
queue.dequeue(); // 1
queue.front(); // 3
```
