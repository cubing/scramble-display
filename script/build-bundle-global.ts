import { es2022Lib } from "@cubing/dev-config/esbuild/es2022";
import { build } from "esbuild";

await build({
  ...es2022Lib(),
  splitting: false,
  entryPoints: ["src/scramble-display/bundle-global.ts"],
  outfile: "dist/bundle-global/scramble-display.bundle-global.js",
  minify: true,
});
