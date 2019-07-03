const rule = require("../../../lib/rules/no-filter-instead-of-find");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
const errorObject = {
  message:
    "It looks like you might be using filter where you should be using find",
  type: "MemberExpression"
};

ruleTester.run("no-filter-instead-of-find", rule, {
  valid: [
    `
    var haystack = ['hay', 'hay', 'needle', 'hay', 'hay'];
    var needle = haystack.find(function(item) {
        return item === "needle";
    }); 
    `,

    `
    var haystack = ['hay', 'hay', 'needle', 'hay', 'hay'];
    var needle = haystack.filter(function(item) {
        return item === "needle";
    })[1];
    `
  ],

  invalid: [
    {
      code: `
            var haystack = ['hay', 'hay', 'needle', 'hay', 'hay'];
            var needle = haystack.filter(function(item) {
                return item === "needle";
            })[0]; 
            `,
      errors: [errorObject]
    }
  ]
});
