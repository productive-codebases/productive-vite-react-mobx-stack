module.exports = {
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        // Add here patterns if you want to prevent some imports.

        // /**
        //  * Antd specifics
        //  * (Example)
        //  */
        // paths: [{
        //   name: "antd",
        //   importNames: ["Button"],
        //   message: "Please use Button from @/clients/components/common/Button instead."
        // }]
      }
    ]
  }
}
