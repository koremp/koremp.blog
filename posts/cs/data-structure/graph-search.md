# Graph 탐색 알고리즘

<https://www.zerocho.com/category/Algorithm/post/5870153c37e1c80018b64eb0>

## TL;DR

DFS는 깊이 우선 탐색(Depth First Search), 스택(LIFO)과 그래프.
BFS는 너비 우선 탐색(Breadth First Search), 큐(FIFO)와 그래프.

## DFS

```js
var graph = new Graph();
graph.insertVertex('A');
graph.insertVertex('X');
graph.insertVertex('G');
graph.insertVertex('H');
graph.insertVertex('P');
graph.insertVertex('E');
graph.insertVertex('Y');
graph.insertVertex('M');
graph.insertVertex('J');
insertTwoWayArc(graph, 1, 'A', 'X');
insertTwoWayArc(graph, 1, 'X', 'G');
insertTwoWayArc(graph, 1, 'X', 'H');
insertTwoWayArc(graph, 1, 'G', 'H');
insertTwoWayArc(graph, 1, 'G', 'P');
insertTwoWayArc(graph, 1, 'H', 'E');
insertTwoWayArc(graph, 1, 'H', 'P');
insertTwoWayArc(graph, 1, 'E', 'M');
insertTwoWayArc(graph, 1, 'E', 'Y');
insertTwoWayArc(graph, 1, 'Y', 'M');
insertTwoWayArc(graph, 1, 'M', 'J');
```

## BFS

```js
Graph.prototype.bfs = function() {
  var queue = new Queue();
  var temp = this.first;
  while (temp) {
    temp.inTree = false;
    temp = temp.next;
  }
  temp = this.first;
  queue.enqueue(temp); // 첫 버텍스를 큐에 넣음
  temp.inTree = true;
  while (queue.count) { // 탐색을 완료할 때까지
    temp = queue.dequeue(); // 큐에서 하나씩 꺼냄
    console.log(temp.key);
    temp.inTree = true;
    var arc = temp.arc;
    while (arc) {
      if (!arc.destination.inTree) {
        queue.enqueue(arc.destination); // 꺼낸 것과 연결된 버텍스들을 큐에 넣음
        arc.destination.inTree = true;
      }
      arc = arc.nextArc;
    }
  }
};
graph.bfs(); // A, X, G, H, P, E, M, Y, J
```
