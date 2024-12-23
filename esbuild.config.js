const esbuild = require("esbuild");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

esbuild
  .build({
    entryPoints: [
      path.resolve(__dirname, "backend/src/index.ts"),
      path.resolve(__dirname, "shared/logs/*.ts"),
      path.resolve(__dirname, "shared/schemas/*.ts"),
    ],
    outdir: path.resolve(__dirname, "dist"),
    bundle: true,
    platform: "node",
    target: "node14",
    sourcemap: true,
    external: ["express"],
    loader: {
      ".ts": "ts",
    },
    define: {
      "process.env.DATABASE_URL": JSON.stringify(process.env.DATABASE_URL),
    },
  })
  .then(() => {
    console.log("Билд произведен успешно!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
