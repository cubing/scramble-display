import { build } from "esbuild";

build({
  entryPoints: ["src/scramble-display/bundle-global.ts"],
  format: "esm",
  outfile: "dist/bundle-global/scramble-display.bundle-global.ts",
  bundle: true,
});
