export function applyLanguages(_Prism) {
  /**
   * Here you have the possibility to add other supported languages to Prism and thus to the code highlighting.
   *
   * We support the following languages automatically:
   * markup, bash, clike, c, cpp, css, javascript, jsx, coffeescript, actionscript, css-extr,
   * diff, git, go, graphql, handlebars, json, less, makefile, markdown, objectivec, ocaml, python,
   * reason, sass, scss, sql, stylus, tsx, typescript, wasm, yaml
   *
   * If you need more languages you can add them yourself as follows:
   * (https://github.com/PrismJS/prism/tree/master/components)
   *
   * ```js
   * require("prismjs/components/prism-docker");
   * require("prismjs/components/prism-ada");
   * ```
   */

}

export function getTheme(_Prism) {
  /**
   * Here you have the possibility to change the prism highlighting.
   */
  return {
    plain: {
      color: "#393A34",
      backgroundColor: "rgba(0, 0, 0, 0)"
    },
    styles: [{
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#999988",
        fontStyle: "italic"
      }
    }, {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    }, {
      types: ["string", "attr-value"],
      style: {
        color: "#e3116c"
      }
    }, {
      types: ["punctuation", "operator"],
      style: {
        color: "#393A34"
      }
    }, {
      types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
      style: {
        color: "#36acaa"
      }
    }, {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#00a4db"
      }
    }, {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#d73a49"
      }
    }, {
      types: ["function-variable"],
      style: {
        color: "#6f42c1"
      }
    }, {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#00009f"
      }
    }]
  };
}
