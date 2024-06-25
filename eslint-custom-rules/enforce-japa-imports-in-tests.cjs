module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce the import of japa type packages in the file to get intellisense",
      category: "Best Practices",
    },
    fixable: "code",
  },
  create(context) {
    // List of modules to enforce
    const enforcedModules = ["@japa/api-client", "@japa/expect"];
    const importedModules = [];

    return {
      ImportDeclaration(node) {
        const moduleName = node.source.value;
        if (enforcedModules.includes(moduleName)) {
          importedModules.push(moduleName);
        }
      },
      "Program:exit"() {
        const filename = context.getFilename();
        if (!filename.includes(".spec") && !filename.includes(".test")) {
          return;
        }

        enforcedModules.forEach((module) => {
          if (!importedModules.includes(module)) {
            context.report({
              node: context.getSourceCode().ast,
              message: `${module} should be imported in the file`,
              fix(fixer) {
                return fixer.insertTextBeforeRange(
                  [0, 0],
                  `import "${module}";\n`,
                );
              },
            });
          }
        });
      },
    };
  },
};
