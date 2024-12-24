const esbuild = require("esbuild");
const path = require("path");

esbuild
  .build({
    entryPoints: [
      path.resolve(__dirname, "backend/src/index.ts"),
      path.resolve(__dirname, "shared/logs/log.ts"),
      path.resolve(__dirname, "shared/schemas/hash.schema.ts"),
    ],
    outdir: path.resolve(__dirname, "dist"),
    bundle: true,
    platform: "node",
    target: "node18",
    sourcemap: true,
    alias: {
      "shared/schemas": path.resolve(__dirname, "shared/schemas"),
      "shared/logs": path.resolve(__dirname, "shared/logs"),
    },
    external: ["express"],
    loader: {
      ".ts": "ts",
    },
  })
  .then(() => {
    console.log("Билд произведен успешно!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
