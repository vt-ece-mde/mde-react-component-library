import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// const packageJson = require("./package.json");

// import packageJson from './package.json';
// import tsconfigJson from './tsconfig.json';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", exclude: ["**/playground/**"] }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    // input: "src/index.ts",
    // output: [{ file: "dist/index.d.ts", format: "esm" }],
    output: [{ file: "dist/esm/index.d.ts", format: "esm" }],
    plugins: [dts({ tsconfig: "./tsconfig.json" })],
  },
];