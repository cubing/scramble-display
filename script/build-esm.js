import { build } from "esbuild";

build({
	entryPoints: ["src/scramble-display/index.ts"],
	format: "esm",
	target: "es2020",
	outdir: "dist/esm",
	bundle: true,
	splitting: true,
});
