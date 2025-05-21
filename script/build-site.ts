import { barelyServe } from "barely-a-dev-server";

await barelyServe({
  dev: false,
  entryRoot: "./src/dev",
  outDir: "./dist/web/experiments.cubing.net/scramble-display",
});
