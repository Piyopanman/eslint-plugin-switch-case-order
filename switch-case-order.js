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
          natural: { type: "boolean" },
          additionalProperties: false,
        },
      },
    ],
  },
  create(context) {
    const order = context.options[0] ?? "asc";
    const options = context.options[1] ?? {};
    const natural = options.natural ?? true;

    const isValidOrder = (order, natural, prevName, currentName) => {
      if (!prevName) return true;

      let prev = prevName;
      let current = currentName;

      if (natural) {
        prev = isNaN(parseInt(prevName)) ? prevName : parseInt(prevName);
        current = isNaN(parseInt(currentName))
          ? currentName
          : parseInt(currentName);
      }

      if (order === "asc") {
        return prev < current;
      } else if (order === "desc") {
        return prev > current;
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

        if (!isValidOrder(order, natural, this.prevName, currentName)) {
          context.report({
            node,
            message:
              'Case labels in switch statement must be in {{ natural }} {{ order }}ending order: "{{ current }}" shoud be before "{{ prev }}"',
            data: {
              prev: this.prevName,
              current: currentName,
              order: order,
              natural: natural ? "natural" : "unnatural",
            },
          });
        }

        this.prevName = currentName;
      },
    };
  },
};
