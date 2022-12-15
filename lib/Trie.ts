class Trie{
  root: TrieNode;
  autoCompleteArray: string[] = [];
  constructor(){
    this.root = new TrieNode();
  }

  add(word: string): void{
    let current: TrieNode = this.root;
    word = word.toLowerCase();
    for(let i = 0; i < word.length; i++){
      let char: string = word.charAt(i);
      let index: number = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if(current.children[index]===undefined){
        current.children[index] = new TrieNode();
      }
      current = current.children[index];
    }
    console.log(this.root);
    current.word = true;
  }
  public contains(str: string): boolean {
    str=str.toLowerCase();
    let currNode: TrieNode = this.root;
    for(let i = 0;i < str.length; i++){
      let index: number = str.charCodeAt(i) - 'a'.charCodeAt(0);
      if(currNode.children[index]==null){
        return false;
      }
      currNode = currNode.children[index];
    }
    return currNode.word;
  }

  // "Deletes" a String from the Trie
  // In actuality, we will just unmark the String as a word
  public remove(str: string): void {
    str=str.toLowerCase();
    if(!this.contains(str)){
      return;
    }
    let currNode: TrieNode = this.root;
    for(let i = 0;i<str.length;i++){
      let index = str.charCodeAt(i) - 'a'.charCodeAt(0);
      currNode = currNode.children[index];
    }
    currNode.word = false;
  }

  public autoComplete (str: string): void {
    str = str.toLowerCase();
    this.autoCompleteArray = [];
    let currNode = this.root;
    for (let i = 0; i < str.length; i++) {
      let index: number = str.charCodeAt(i) - 'a'.charCodeAt(0);
      if (currNode.children[index] == null) {
        return;
      }
      currNode = currNode.children[index];
    }
    this.addToAutocompleteArrayRec(str, currNode);
  }

  public addToAutocompleteArrayRec(str: string, current: TrieNode): void {
    if(current==undefined){
      return;
    }
    if(current.word){
      this.autoCompleteArray.push(str);
    }
    for(let i = 0;i<26;i++){
      this.addToAutocompleteArrayRec(str + String.fromCharCode(i + 'a'.charCodeAt(0)), current.children[i]);
    }
  }

  // Calls the printRec method
  public print():void {
    this.printRec(this.root, "");
  }

  // Recursively prints out the Trie
  // String str will keep track of the "word so far"
  // Should print out any words
  // Should call the printRec method on all 26 children
  public printRec(current:TrieNode, str:string): void {
    if(current===undefined){
      return;
    }
    if(current.word){
      console.log(str);
    }
    for(let i = 0;i<26;i++){
      this.printRec(current.children[i], str + String.fromCharCode(i + 'a'.charCodeAt(0)));
    }
  }
}

class TrieNode {
  children: Array<TrieNode>;
  word: boolean;
  constructor(){
      this.children = new Array<TrieNode>(26);
      this.word = false;
  }
}

export default Trie;