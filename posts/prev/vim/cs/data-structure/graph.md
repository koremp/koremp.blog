# Graph

<https://www.zerocho.com/category/Algorithm/post/584b9033580277001862f16c>

## 설명

* 그래프에서는 노드를 `버텍스`, 엣지를 `아크`
* 버텍스 간에 여러 개의 아크
  * 다른 버텍스에서부터 오는 아크의 개수를 `In-degree`
  * 다른 버텍스로 가는 아크의 개수를 `Out-degree`
* __방향 그래프__와 __무방향 그래프__
* 트리
  * `루트`가 있고 `In-degree`가 `1`인 `방향 그래프`
* 코드로 표현
  * 이차원 배열
    * 버텍스 개수(V)의 제곱에 해당하는 공간
    * 버텍스 개수와 아크 개수(E)의 합에 해당하는 공간만 차지
  * 연결 리스트
  * 버텍스 개수가 작으면 이차원 배열, 크면 연결 리스트를 사용하는 게 효율적

## 방향 그래프

```js
var Graph = (function() {
  function Vertex(key) {
    this.next = null;
    this.arc = null;
    this.key = key;
    this.inTree = null;
  }
  function Arc(data, dest, capacity) {
    this.nextArc = null;
    this.destination = dest;
    this.data = data;
    this.capacity = capacity;
    this.inTree = null;
  }
  function Graph() {
    this.count = 0;
    this.first = null;
  }
  Graph.prototype.insertVertex = function(key) {
    var vertex = new Vertex(key);
    var last = this.first;
    if (last) {
      while (last.next !== null) {
        last = last.next;
      }
      last.next = vertex;
    } else {
      this.first = vertex;
    }
    this.count++;
  };
  Graph.prototype.deleteVertex = function(key) {
    var vertex = this.first;
    var prev = null;
    while (vertex.key !== key) {
      prev = vertex;
      vertex = vertex.next;
    }
    if (!vertex) return false;
    if (!vertex.arc) return false;
    if (prev) {
      prev.next = vertex.next;
    } else {
      this.first = vertex.next;
    }
    this.count--;
  };
  Graph.prototype.insertArc = function(data, fromKey, toKey, capacity) {
    var from = this.first;
    var to = this.first;
    while (from && from.key !== fromKey) {
      from = from.next;
    }
    while (to && to.key !== toKey) {
      to = to.next;
    }
    if (!from || !to) return false;
    var arc = new Arc(data, to, capacity);
    var fromLast = from.arc;
    if (fromLast) {
      while (fromLast.nextArc != null) {
        fromLast = fromLast.nextArc;
      }
      fromLast.nextArc = arc;
    } else {
      from.arc = arc;
    }
  };
  Graph.prototype.deleteArc = function(fromKey, toKey) {
    var from = this.first;
    while (from !== null) {
      if (from.key === fromKey) break;
      from = from.next;
    }
    if (!from) return false;
    var fromArc = from.arc;
    var preArc;
    while (fromArc !== null) {
      if (toKey === fromArc.destination.key) break;
      preArc = fromArc;
      fromArc = fromArc.next;
    }
    if (!fromArc) return false;
    if (preArc) {
      preArc.nextArc = fromArc.nextArc;
    } else {
      from.arc = fromArc.nextArc;
    }
  };
  return Graph;
})();
```

```js
var graph = new Graph();
graph.insertVertex('A');
graph.insertVertex('B');
graph.insertVertex('C');
graph.insertVertex('D');
graph.insertVertex('E');
graph.insertVertex('F');
graph.insertArc(1, 'A', 'B');
graph.insertArc(1, 'B', 'C');
graph.insertArc(1, 'B', 'E');
graph.insertArc(1, 'C', 'E');
graph.insertArc(1, 'C', 'D');
graph.insertArc(1, 'E', 'D');
graph.insertArc(1, 'E', 'F');
```

### 무방향 그래프

```js
function insertTwoWayArc(graph, data, from, to) {
  graph.insertArc(data, from, to);
  graph.insertArc(data, to, from);
}
```
