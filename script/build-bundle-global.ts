import { build } from "esbuild";

build({
	entryPoints: ["src/scramble-display/bundle-global.ts"],
	format: "esm",
	target: "es2020",
	outfile: "dist/bundle-global/scramble-display.bundle-global.js",
	bundle: true,
	minify: true,
});
