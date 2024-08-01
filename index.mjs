#!/usr/bin/env node

import process from "node:process";
import path from "node:path"
import fs from "node:fs"
import {
  readmeMdContnt,
  packageJSONContent,
  swrRcContent,
  tsConfigJSONContent,
  indexTsContent,
  indexTestTsContent,
} from "./content.mjs";

/**
 * script entry-point
 *
 * @param {string[]} args
 */
async function main(args) {
  const projectName = args[0] ?? "sandbox";
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
      content: readmeMdContnt(projectName),
    },
    {
      filename: "package.json",
      location: projectPath,
      content: JSON.stringify(packageJSONContent(projectName)),
    },
    {
      filename: ".swrrc",
      location: projectPath,
      content: JSON.stringify(swrRcContent()),
    },
    {
      filename: "tsconfig.json",
      location: projectPath,
      content: JSON.stringify(tsConfigJSONContent()),
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

main(process.argv.slice(2)).catch(console.error);
