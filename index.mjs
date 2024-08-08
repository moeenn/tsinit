#!/usr/bin/env node

import process from "node:process";
import path from "node:path"
import fs from "node:fs"
import {
  readmeMdContnt,
  packageJSONContent,
  swcRcContent,
  tsConfigJSONContent,
  indexTsContent,
  indexTestTsContent,
} from "./content.mjs";
import { prompt, rl } from "./prompt.mjs"

/**
 * script entry-point
 *
 */
async function main() {
  let projectName = await prompt("Enter project name (default 'sandbox'): ")
  if (!projectName.trim()) {
    projectName = "sandbox"
  }

  const currentDir = process.cwd()
  const projectPath = path.join(currentDir, projectName)

  const projectDirExists = fs.existsSync(projectPath)
  const srcDir = path.join(projectPath, "src")
  if (!projectDirExists) {
    fs.mkdirSync(srcDir, { recursive: true })
  }

  const files = [
    {
      filename: "README.md",
      location: projectPath,
      content: readmeMdContnt(projectName).trim(),
    },
    {
      filename: "package.json",
      location: projectPath,
      content: JSON.stringify(packageJSONContent(projectName), null, 2),
    },
    {
      filename: ".swcrc",
      location: projectPath,
      content: JSON.stringify(swcRcContent(), null, 2),
    },
    {
      filename: "tsconfig.json",
      location: projectPath,
      content: JSON.stringify(tsConfigJSONContent(), null, 2),
    },
    {
      filename: "index.ts",
      location: srcDir,
      content: indexTsContent(),
    },
    {
      filename: "index.test.ts",
      location: srcDir,
      content: indexTestTsContent(),
    },
  ]

  for (const file of files) {
    const filepath = path.join(file.location, file.filename)
    console.log("Writing: ", filepath)
    fs.writeFileSync(filepath, file.content, { encoding: "utf8"})
  }
}

main()
    .then(() => rl.close())
    .catch(console.error);