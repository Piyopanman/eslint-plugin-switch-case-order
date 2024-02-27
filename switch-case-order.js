/**
 * option memo
 * {
 * "switch-case-order": ["error", "asc", {"caseSensitive": true, "natural": false}]
 * }
 */

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce that case labels in switch statements are sorted",
      url: "",
    },
    schema: [
      { enum: ["asc", "desc"] },
      {
        type: "object",
        properties: {
          // caseSensitive: { type: "boolean" },
          // natural: { type: "boolean" },
          additionalProperties: false,
        },
      },
    ],
  },
  create(context) {
    const options = context.options;
    const order = options[0] ?? "asc";
    // const caseSensitive = options[1].caseSensitive ?? "true";
    // const natural = options[1].natural ?? "true";

    const isValidOrder = (order, prevName, currentName) => {
      if (!prevName) return true;

      if (order === "asc") {
        return prevName < currentName;
      } else if (order === "desc") {
        return prevName > currentName;
      }
    };

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

        // if (this.prevName && currentName < this.prevName) {
        //   context.report({
        //     node,
        //     message:
        //       'Case labels in switch statement are not in ascending alphabetical order: "{{ prevName }}" comes before "{{ currentName }}"',
        //     data: {
        //       prevName: this.prevName,
        //       currentName: currentName,
        //     },
        //   });
        // }

        if (!isValidOrder(order, this.prevName, currentName)) {
          context.report({
            node,
            message:
              // 'Case labels in switch statement are not in ascending alphabetical order: "{{ prevName }}" comes before "{{ currentName }}"',
              'Case labels in switch statement are not in valid order({{ order }}): "{{ prevName }}" comes before "{{ currentName }}"',
            data: {
              prevName: this.prevName,
              currentName: currentName,
              order: order,
            },
          });
        }

        this.prevName = currentName;
      },
    };
  },
};
