import { cp, mkdir, readdir, stat, unlink } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "out");
const docsDir = path.join(projectRoot, "docs");
const publicImagesDir = path.join(projectRoot, "public", "images");
const docsImagesDir = path.join(docsDir, "images");

async function main() {
  if (process.env.VERCEL) {
    console.log("Skipping docs sync on Vercel.");
    return;
  }

  try {
    await stat(outDir);
  } catch {
    console.log("Missing 'out' directory. Skipping docs sync.");
    return;
  }

  await mkdir(docsDir, { recursive: true });
  const docsEntries = await readdir(docsDir);
  await Promise.all(
    docsEntries.map(async (entry) => {
      const fullPath = path.join(docsDir, entry);
      await unlink(fullPath).catch(() => {});
    }),
  );
  await cp(outDir, docsDir, { recursive: true, force: true });
  await mkdir(docsImagesDir, { recursive: true });
  await cp(publicImagesDir, docsImagesDir, { recursive: true });
  await writeFile(path.join(docsDir, ".nojekyll"), "");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
