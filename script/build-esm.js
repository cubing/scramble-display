import { build } from "esbuild";

build({
  entryPoints: ["src/scramble-display/index.ts"],
  format: "esm",
  outdir: "dist/esm",
  bundle: true,
  external: ["cubing"],
});
