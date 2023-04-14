class Queue {
  #head;
  #tail;
  constructor() {
    this.element = {};
    this.#head = 0;
    this.#tail = 0;
  }
  enque(element) {
    this.element[this.#tail] = element;
    this.#tail++;
  }
  dequeue() {
    const data = this.element[this.#head];
    delete this.element[this.#head];
    this.#head++;
    return data;
  }
  peek() {
    return this.element[this.#head];
  }
  get length() {
    return this.#head - this.#tail;
  }
  get isEmpty() {
    if (this.#head - this.#tail === 0) return true;
    return false;
  }
}
