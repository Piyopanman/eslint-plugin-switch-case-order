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
      SwitchStatement(node) {
        this.prevName = null;
      },

      SwitchCase(node) {
        const currentName =
          node.test && node.test.type === "Literal"
            ? node.test.value
            : undefined;

        if (typeof currentName !== "string") return;

        if (this.prevName && currentName < this.prevName) {
          context.report({
            node,
            message:
              'Case labels in switch statement are not in ascending alphabetical order: "{{ prevName }}" comes before "{{ currentName }}"',
            data: {
              prevName: this.prevName,
              currentName: currentName,
            },
          });
        }
        this.prevName = currentName;
      },
    };
  },
};
