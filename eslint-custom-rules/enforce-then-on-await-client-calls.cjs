const isClientCall = (node) => {
  const awaitedExpression = node.argument;

  let currentExpression = awaitedExpression;

  while (
    currentExpression.type === "CallExpression" &&
    currentExpression.callee.type === "MemberExpression"
  ) {
    currentExpression = currentExpression.callee.object;
  }

  return (
    currentExpression.type === "Identifier" &&
    currentExpression.name === "client"
  );
};

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce the use of .then() on awaited API client calls",
      category: "Best Practices",
    },
    fixable: "code",
  },
  create(context) {
    const filename = context.getFilename();
    const isTestFile = filename.includes(".spec") || filename.includes(".test")

    return {
      AwaitExpression(node) {
        if (!isTestFile) return;
        const awaitedExpression = node.argument;

        const isChain = awaitedExpression.callee.type === "MemberExpression";
        if (!isChain) return;


        const hasFinalThenCall =
          awaitedExpression.callee.property.name === "then";

        if (!isClientCall(node) || hasFinalThenCall) return;

        context.report({
          node,
          message: "Awaited API client calls should end with .then()",
          fix(fixer) {
            return fixer.insertTextAfter(node, ".then(res => res)");
          },
        });
      },
    };
  },
};
