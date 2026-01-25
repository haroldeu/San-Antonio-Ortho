import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "out");
const docsDir = path.join(projectRoot, "docs");

async function main() {
  try {
    await stat(outDir);
  } catch {
    throw new Error("Missing 'out' directory. Run `npm run build` first.");
  }

  await rm(docsDir, { recursive: true, force: true });
  await mkdir(docsDir, { recursive: true });
  await cp(outDir, docsDir, { recursive: true });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
