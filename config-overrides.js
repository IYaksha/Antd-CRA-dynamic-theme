const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");
const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const lessToJs = require("less-vars-to-js");
const fs = require("fs");

module.exports = override(
  (config) => ({
    ...config,
    output: {
      ...config.output,
      globalObject: "this",
    },
  }),

  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),

  addWebpackPlugin(
    new AntDesignThemePlugin({
      varFile: path.join(__dirname, "./src/styles/variables.less"),
      mainLessFile: path.join(__dirname, "./src/styles/index.less"),
      antDir: path.join(__dirname, "./node_modules/antd"),
      stylesDir: path.join(__dirname, "./src/styles"),
      themeVariables: Object.keys(
        lessToJs(
          fs.readFileSync(
            path.join(
              __dirname,
              "./node_modules/antd/lib/style/themes/default.less"
            ),
            "utf8"
          )
        )
      ),
      generateOnce: true,
    })
  ),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" },
    },
  })
);
