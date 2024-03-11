module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce that case labels in switch statements are sorted",
      url: "",
    },
    messages: {
      invalidOrder:
        'Case labels in switch statement must be in {{ caseSensitive }} {{ natural }} {{ order }}ending order: "{{ current }}" should be before "{{ prev }}"',
    },
    schema: [
      { enum: ["asc", "desc"] },
      {
        type: "object",
        properties: {
          caseSensitive: { type: "boolean" },
          natural: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const order = context.options[0] ?? "asc";
    const options = context.options[1] ?? {};
    const caseSensitive = options.caseSensitive ?? true;
    const natural = options.natural ?? true;

    const isValidOrder = (
      order,
      caseSensitive,
      natural,
      prevLabel,
      currentLabel
    ) => {
      if (!prevLabel) return true;

      let prev = prevLabel;
      let current = currentLabel;

      if (!caseSensitive) {
        prev = prev.toLowerCase();
        current = current.toLowerCase();
      }

      if (natural) {
        prev = isNaN(parseInt(prev)) ? prev : parseInt(prev);
        current = isNaN(parseInt(current)) ? current : parseInt(current);
      }

      if (order === "asc") {
        return prev <= current;
      } else if (order === "desc") {
        return prev >= current;
      }
    };

    return {
      SwitchStatement(node) {
        this.prevLabel = null;
      },

      SwitchCase(node) {
        const currentLabel =
          node.test && node.test.type === "Literal"
            ? node.test.value
            : undefined;

        if (typeof currentLabel !== "string") return;

        if (
          !isValidOrder(
            order,
            caseSensitive,
            natural,
            this.prevLabel,
            currentLabel
          )
        ) {
          context.report({
            node,
            messageId: "invalidOrder",
            data: {
              prev: this.prevLabel,
              current: currentLabel,
              order: order,
              caseSensitive: caseSensitive ? "sensitive" : "insensitive",
              natural: natural ? "natural" : "unnatural",
            },
          });
        }

        this.prevLabel = currentLabel;
      },
    };
  },
};
