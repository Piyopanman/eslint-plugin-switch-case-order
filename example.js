const validFunction = () => {
  switch (test) {
    case "apple":
      console.log("apple!!");
    case "banana":
      console.log("banana!!");
    case "cherry":
      console.log("cherry!!");
    default:
      console.log("this is default");
  }
};

const invalidFunction = (test) => {
  switch (test) {
    case "banana":
      console.log("banana!!");
    case "cherry":
      console.log("cherry!!");
    default:
      console.log("this is default");
  }
};
