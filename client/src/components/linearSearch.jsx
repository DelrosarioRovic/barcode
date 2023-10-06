const LinearSearch = (arr, target) => {
    const newMultiArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].distributorName === target) {
        newMultiArr.push(arr[i]);
      }
    }
    return newMultiArr;
  };
  
  export default LinearSearch;
  