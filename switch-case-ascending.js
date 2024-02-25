module.exports = {
  meta: {
    type: "layout",
    docs: {
      description:
        "Enforce that case labels in switch statements are in ascending alphabetical order.",
      url: "",
    },
    schema: [],
  },
  create(context) {
    return {
      // caseラベルに'apple'が含まれていることを強制するルールを作ってみる
      SwitchStatement(node) {
        const hasAppleCase = node.cases.some(
          (caseNode) =>
            caseNode.test &&
            caseNode.test.type === "Literal" &&
            caseNode.test.value === "apple"
        );

        if (!hasAppleCase) {
          context.report({
            node,
            message: "switch statement dont have apple case.",
          });
        }
      },
    };
  },
};
