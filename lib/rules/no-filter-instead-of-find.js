const get = require("lodash/get");

module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description:
        "Find situations where filter is being used and find might be more suitable",
      category: "Possible Errors",
      recommended: true,
      url: "https://eslint.org/docs/rules/no-extra-semi"
    },
    fixable: "code"
  },
  create: function(context) {
    return {
      MemberExpression(node) {
        const isFilter = get(node, "object.callee.property.name") === "filter";
        const hasLiteral = get(node, "property.type") === "Literal";
        const literalValue = get(node, "property.value");
        if (!isFilter || !hasLiteral) {
          return;
        }
        if(literalValue > 0) {
          return null;
        }
        context.report({
          node,
          message:
            "It looks like you might be using filter where you should be using find"
        });
      }
    };
  }
};
