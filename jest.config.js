module.exports = {
  "transform" : {
    "^.+\\.tsx?$" : "ts-jest"
  },
  "testRegex" : "src/ts/test/.*\\.test\\.(jsx?|tsx?)$",
  "moduleFileExtensions" : [
	  "ts",
	  "tsx",
	  "js",
	  "jsx",
	  "json"
  ],
  "unmockedModulePathPatterns" : [
    "node_modules/node-import",
    "node_modules/jquery",
    "node_modules/react",
    "node_modules/react-dom",
    "node_modules/react-test-renderer"
  ]

};
