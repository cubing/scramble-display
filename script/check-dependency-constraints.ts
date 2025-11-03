import { default as assert } from "node:assert";
import packageJSON from "../package.json" with { type: "json" };

assert.notEqual(
  // biome-ignore lint/complexity/useLiteralKeys: https://github.com/biomejs/biome/discussions/7404
  packageJSON.dependencies["cubing"].match(/^>=0\.\d+\.\d+ && <1\.0\.0$/),
  null,
);
