/**
 * content of the `package.json` file.
 *
 * @param {string} projectName
 */
export function packageJSONContent(projectName) {
  return {
    name: projectName,
    version: "1.0.0",
    main: "index.js",
    scripts: {
      dev: "nodemon --ext ts --exec 'npm run build && node build/src/index.js'",
      build: "swc src --out-dir build",
      start: "NODE_ENV=production node build/src/index.js",
      "type-check": "tsc --noEmit",
      test: "jest",
      fmt: "npx prettier --write ./src/",
      lint: "npx eslint --fix ./src/ --ext .ts",
    },
    jest: {
      transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
      },
      testEnvironment: "node",
      modulePathIgnorePatterns: ["<rootDir>/build/"],
      moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
      },
    },
    eslintConfig: {
      root: true,
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      rules: {
        "no-console": "warn",
        quotes: [
          "warn",
          "double",
          {
            allowTemplateLiterals: true,
            avoidEscape: true,
          },
        ],
        semi: ["warn", "never"],
        "no-unused-vars": "warn",
      },
    },
    prettier: {
      singleQuote: false,
      semi: false,
      tabWidth: 2,
      trailingComma: "all",
    },
    keywords: [],
    author: "",
    license: "ISC",
    description: "",
    devDependencies: {
      "@swc/cli": "^0.4.0",
      "@swc/core": "^1.5.5",
      "@swc/jest": "^0.2.36",
      "@types/jest": "^29.5.12",
      "@types/node": "^20.12.11",
      "@typescript-eslint/eslint-plugin": "^7.8.0",
      "@typescript-eslint/parser": "^7.8.0",
      eslint: "^8.56.0",
      jest: "^29.7.0",
      nodemon: "^3.1.0",
      prettier: "^3.2.5",
      typescript: "^5.4.5",
    },
  };
}

/**
 * contents of the `README.md` file.
 *
 * @param {string} projectName
 * @returns {string}
 */
export function readmeMdContnt(projectName) {
  return `
# ${projectName}

## Setup
\`\`\`bash
$ npm i -D
\`\`\`

## Run in Development Mode
\`\`\`bash
$ npm run dev
\`\`\`

## Run in Production Mode
\`\`\`bash
$ npm run build
$ npm run start
\`\`\`
*Note*: The \`NODE_ENV\` environment variable will be set to \`production\` when running the app in production mode.

## Linting with ESLint
\`\`\`bash
$ npm run lint
\`\`\`

## Running Tests with Jest
\`\`\`bash
$ npm run test
\`\`\`    
  `;
}

/**
 * contents of the `.swcrc` file.
 *
 */
export function swcRcContent() {
  return {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: false,
        decorators: true,
        dynamicImport: true,
      },
      target: "es2020",
      baseUrl: "./src",
      paths: {
        "@/*": ["./*"],
      },
    },
    module: {
      type: "commonjs",
    },
  };
}

/**
 * contents of the `tsconfig.json` file.
 *
 */
export function tsConfigJSONContent() {
  return {
    compilerOptions: {
      target: "es2020",
      module: "es2020",
      allowJs: true,
      removeComments: true,
      resolveJsonModule: true,
      typeRoots: ["./node_modules/@types"],
      sourceMap: true,
      outDir: "dist",
      strict: true,
      lib: ["es2020"],
      forceConsistentCasingInFileNames: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      moduleResolution: "Node",
      skipLibCheck: true,
      baseUrl: "./src",
      paths: {
        "@/*": ["./*"],
      },
    },
    include: ["src/**/*"],
    exclude: ["node_modules", "**/node_modules/**"],
  };
}

/**
 * contents of the entry-point `src/index.ts` file.
 *
 * @returns {string}
 */
export function indexTsContent() {
  return `
function main(): void {
  console.log("Hello world")
}

main()  
  `;
}

export function indexTestTsContent() {
  return `
test("sample test", () => {
  expect(true).toBeTruthy()
})    
  `;
}
