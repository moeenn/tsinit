import readline from "node:readline";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const prompt = (query) =>
  new Promise((resolve) => rl.question(query, resolve));
rl.on("close", () => process.exit(0));
