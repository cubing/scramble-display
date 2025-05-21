import { es2022Lib } from "@cubing/dev-config/esbuild/es2022";
import { build } from "esbuild";

await build({
  ...es2022Lib(),
  entryPoints: ["src/scramble-display/index.ts"],
  outdir: "dist/esm",
});
