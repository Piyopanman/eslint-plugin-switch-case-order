const { RuleTester } = require("eslint");
const rule = require("./switch-case-ascending");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run("switch-case-ascending", rule, {
  valid: [
    {
      code: `
    switch(fruit) {
        case "apple":
            console.log("apple!!");
        case "banana":
            console.log("banana!!");
        case "cherry":
            console.log("cherry!!");
        default:
           console.log("this is default");
    }
    `,
    },
  ],
  invalid: [
    {
      code: `
      switch(fruit) {
        case "apple":
            console.log("apple!!");
        case "cherry":
            console.log("cherry!!");
        case "banana":
            console.log("banana!!");
        default:
           console.log("this is default");
    }
    `,
      errors: 1,
    },
  ],
});

console.log("all tests passed!!");
