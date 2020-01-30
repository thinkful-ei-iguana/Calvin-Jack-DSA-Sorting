class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertFirst(item) {
      this.head = new _Node(item, this.head);
    }
  
    insertLast(item) {
      if(this.head === null) {
        this.insertFirst(item);
      } else {
        let tempNode = this.head;
        while(tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
      }
    }
  
    insertBefore(item, itemBefore){
      let newNode = new _Node(item, null);
      if(!this.head){
        return null;
      }
  
      if(this.head.value === itemBefore){
        newNode.next = this.head;
        this.head = newNode;
        return;
      }
  
      
      let current = this.head; 
      let prev = this.head;  
  
      while(current !== null){
        if(current.value === itemBefore){
          newNode.next = current;
          prev.next = newNode;
          return;
        }
        prev = current; 
        current = current.next; 
      }
  
      console.log(`${itemBefore} not found`);
      return;
    }
  
    insertAfter(item, itemAfter) {
      const newNode = new _Node(item, null);
      if (!this.head) {
        return null;
      } else {
        let current = this.head;
        while ((current.value !== itemAfter) && (current !== null)) {
          current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
      }
    }
  
    insertAt(item, index){
      let newNode = new _Node(item, null);
      if(index < 0){
        console.log('index out of bounds');
        return;
      }
      if(index === 0){
        newNode.next = this.head;
        this.head = newNode;
        return;
      }
      
      
      let prev = this.head;
      let current = this.head;
      for(let i =0; i < index; i++){
        if(current === null){
          console.log('index out of bounds');
          return;
        }
        prev = current;
        current = current.next;
      }
  
      newNode.next = current;
      prev.next = newNode;
    }
  
    find(item) {
      let currNode = this.head;
  
      if (!this.head) {
        return null;
      }
  
      while (currNode.value !== item) {
        if (currNode.next === null) {
          return null;
        } else {
          currNode = currNode.next;
        }
      }
  
      return currNode;
    }
  
    remove(item) {
      if (!this.head) {
        return null;
      }
  
      if (this.head.value === item) {
        this.head = this.head.next;
        return;
      }
  
      let currNode = this.head;
      let previousNode = this.head;
  
      while((currNode !== null) && (currNode.value !== item)) {
        previousNode = currNode;
        currNode = currNode.next;
      }
  
      if (currNode === null) {
        console.log('Item not found');
        return;
      }
      previousNode.next = currNode.next;
    }
  }

function mSort(LinkedList){
    let count = 0;
    let curr = LinkedList.head;
    while(curr !== null){
        curr = curr.next;
        count++;
    }

    if(count <= 1){
        return LinkedList;
    }

    const middle = Math.floor(count / 2);
    let List1 = new LinkedList();
    let List2 = new LinkedList();
    curr = LinkedList.head;
    for(let i = 0; i < middle; i++){
        List1.insertLast(curr.value);
        curr = curr.next;
    }
    for(let i = middle; i < count; i++){
        List2.insertLast(curr.value);
        curr = curr.next;
    }

    List1 = mSort(List1);
    List2 = mSort(List2);
    return merge(List1, List2);

}

function merge(List1, List2){
    let result = new LinkedList();
    let curr1 = List1.head;
    let curr2 = List2.head;
    while(curr1 !== null && curr2 !== null){
        if(curr1.value < curr2.value){
            result.insertLast(curr1.value);
            curr1 = curr1.next;
        } else {
            result.insertLast(curr2.value);
            curr2 = curr2.next;
        }
    }
    while(curr1 !== null){
        result.insertLast(curr1.value);
        curr1 = curr1.next;
    }
    while(curr2 !== null){
        result.insertLast(curr2.value);
        curr2 = curr2.next;
    }
    return result;
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

function swap(array, i, j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

let data = [
    89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 
    78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 
    56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 
    16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 
    64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 
    13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 
    1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 
    49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 
    14, 5];


function bucketSort(array, high, low){
    let bucketSize = 5;
    var bucketCount = Math.floor((high - low) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount);
    
    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }
    
    // Pushing values to buckets
    array.forEach(function (currentVal) {
        allBuckets[Math.floor((currentVal - low) / bucketSize)].push(currentVal);
    });
  
    // Sorting buckets
    array.length = 0;
    
    allBuckets.forEach(function(bucket) {
        insertionSort(bucket);
        bucket.forEach(function (element) {
            array.push(element)
        });
    });
  
    return array;
}

function insertionSort(array) {
    var length = array.length;
    
    for(var i = 1; i < length; i++) {
      var temp = array[i];
      for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
        array[j+1] = array[j];
      }
      array[j+1] = temp;
    }
    
    return array;
  }

function randomize(array){
    //find random index, find second random index, swap, repeat however many times, return array 
    for(let i =0; i < array.length * 2; i++){
        let ind1 = Math.floor(Math.random() * (array.length -1));
        let ind2 = Math.floor(Math.random() * (array.length -1));
        if(ind1 !== ind2){
            let temp = array[ind1];
            array[ind1] = array[ind2];
            array[ind2] = temp;
        }
    }
    return array
}

function bookSort(array){
    for(let i =0; i < array.length; i++){
        let big = array[i];
        for(let j=0; j < array.length - 1; j++){
            if(big < array[j]){
                big = array[j];
                swap(array, i, j)
            }
        }
    }
    return array;
}

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

let books = ['e', 'd', 'c', 'b', 'a'];
//console.log(quickSort(data));
//console.log(mergeSort(data));
//console.log(bucketSort(data, 98, 1));
//console.log(randomize(quickSort(data)));
//console.log(bookSort(books));
