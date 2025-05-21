import { barelyServe } from "barely-a-dev-server";

await barelyServe({ entryRoot: "src/dev", outDir: "./.cache/dev" });
