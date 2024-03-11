const { RuleTester } = require("eslint");
const rule = require("../src/switch-case-order");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run("switch-case-order", rule, {
  valid: [
    {
      code: `
        switch(fruit) {
            case "apple":
                console.log("apple!");
            case "banana":
                console.log("banana!");
            case "cherry":
                console.log("cherry!");
            default:
              console.log("default!");
        }
      `,
      options: [],
    },
    {
      code: `
        // This rule applies only when the label is string.
        switch (num) {
          case 3:
            console.log("three!");
          case 10:
            console.log("ten!");
          case 1:
            console.log("one!");
          case 2:
            console.log("two!");
        }
      `,
      options: [],
    },
    {
      code: `
        switch(fruit) {
            case "cherry":
                console.log("cherry!");            
            case "banana":
                console.log("banana!");
            case "apple":
                console.log("apple!");
            default:
              console.log("default!");
        }
      `,
      options: ["desc"],
    },
    {
      code: `
        switch(fruit) {
          case "apple":
              console.log("apple!");
          case "banana":
              console.log("banana!");
          case "BANANA":
              console.log("BANANA!");    
          case "cherry":
              console.log("cherry!");
          default:
            console.log("default!");
        }
      `,
      options: ["asc", { caseSensitive: false }],
    },
    {
      code: `
        switch(fruit) {
            case "1":
                console.log("one!");
            case "2":
                console.log("two!");
            case "3":
                console.log("three!");
            case "10":
                console.log("ten!");    
            default:
              console.log("default!");
        }
      `,
      options: ["asc", { natural: true }],
    },
    {
      code: `
        switch(fruit) {
            case "1":
                console.log("one!");
            case "10":
                console.log("ten!");   
            case "2":
                console.log("two!");
            case "3":
                console.log("three!"); 
            default:
              console.log("default!");
        }
      `,
      options: ["asc", { natural: false }],
    },
  ],
  invalid: [
    {
      code: `
        switch(fruit) {
          case "apple":
              console.log("apple!");
          case "cherry":
              console.log("cherry!");
          case "banana":
              console.log("banana!");
          default:
            console.log("default!");
        }
      `,
      options: [],
      errors: 1,
    },
    {
      code: `
        switch(fruit) {
          case "apple":
              console.log("apple!");
          case "banana":
              console.log("banana!");
          case "BANANA":
              console.log("BANANA!");
          case "cherry":
              console.log("cherry!");
          default:
            console.log("default!");
        }
      `,
      options: ["asc", { caseSensitive: true }],
      errors: 1,
    },
    {
      code: `
        switch(fruit) {
          case "apple":
              console.log("apple!");
          case "banana":
              console.log("banana!");
          case "cherry":
              console.log("cherry!");
          case "BANANA":
              console.log("BANANA!");
          default:
            console.log("default!");
        }
      `,
      options: ["asc", { caseSensitive: false }],
      errors: 1,
    },
    {
      code: `
        switch(fruit) {
            case "1":
                console.log("one!");
            case "10":
                console.log("ten!");   
            case "2":
                console.log("two!");
            case "3":
                console.log("three!"); 
            default:
              console.log("default!");
        }
      `,
      options: ["asc", { natural: true }],
      errors: 1,
    },
    {
      code: `
        switch(fruit) {
            case "1":
                console.log("one!");  
            case "2":
                console.log("two!");
            case "3":
                console.log("three!"); 
            case "10":
                console.log("ten!"); 
            default:
              console.log("default!");
        }
      `,
      options: ["asc", { natural: false }],
      errors: 1,
    },
  ],
});

console.log("all tests passed!!");
