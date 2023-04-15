class Listnode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
class DoubleLinkList {
  #head;
  #tail;
  constructor(Data) {
    this.#head = null;
    this.#tail = null;
    this.length = 0;
  }
  push(data) {
    let node = new Listnode(data);
    if (this.#head === null) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      node.prev = this.#tail;
      this.#tail = node;
    }
    this.length++;
    return this;
  }
  Pop(){
    let holder = this.#tail;
    if(this.length < 1) return null;
    else if(this.length === 1)
    {
        this.#head = null;
        this.#tail = null;
    }
    else{
        this.#tail = this.#tail.prev; //Point to last node
        delete this.#tail.next; // Delete current node;
        this.#tail.next = null; // 
    }
    this.length--;
    return holder;
  }
    Print(Front){
        let arr = [];
               let current = null;
       Front ? current = this.#head :current = this.#tail;
       let counter = this.length; 
        while(counter > 0){
           console.log(current)
           arr.push(current.data) 
           Front ?
           current = current.next :
           current = current.prev;
           counter --;
        }
        console.log(arr);
    }  

}
let test = new DoubleLinkList();
test.push(3);
test.Pop();
test.Pop()
test.Pop();
test.Print(false);

module.exports = DoubleLinkList;