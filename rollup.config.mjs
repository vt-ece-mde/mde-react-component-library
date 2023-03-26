// import jsx from 'acorn-jsx';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
// import typescript from "rollup-plugin-typescript2";
// import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';


// const packageJson = require("./package.json");

// import packageJson from './package.json' assert { type: `json` };
// import tsconfigJson from './tsconfig.json';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    // acornInjectPlugins: [jsx()],
    plugins: [
      // // Delete existing build files.
      // del({ targets: "dist/*" }),
      peerDepsExternal(),
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({ extensions: [".css"] }),
    ],
    external: ["react", "react-dom"],
  },
  {
    // input: "src/index.ts",
    // input: "dist/esm/types/index.d.ts",
    input: "dist/types/index.d.ts",
    // output: [{ file: "dist/index.d.ts", format: "esm" }],
    // output: [{ file: "dist/esm/index.d.ts", format: "esm" }],
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    // acornInjectPlugins: [jsx()],
    external: [/\.css$/],
    // plugins: [dts()],
    plugins: [dts({ tsconfig: "./tsconfig.json" })],
  },
];