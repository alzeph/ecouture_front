import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

const componentName = args[0];
const basePath = args[1] ? path.resolve(args[1]) : process.cwd();

if (!componentName) {
  console.error("❌ Veuillez fournir un nom de composant en PascalCase.");
  process.exit(1);
}

const toKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const kebabName = toKebabCase(componentName);
const componentDir = path.join(basePath, componentName);
const componentFileName = `${componentName}.tsx`;
const propsTypeName = `${componentName}Props`;

// 🔍 Calcule le chemin Storybook relatif à src/
const getRelativePathFromSrc = (absolutePath: string) => {
  const srcIndex = absolutePath.lastIndexOf("src" + path.sep);
  if (srcIndex === -1) return componentName; // fallback
  return absolutePath
    .slice(srcIndex + 4) // 4 = 'src/'.length
    .split(path.sep)
    .join("/");
};

const storyTitle = getRelativePathFromSrc(componentDir);

// 1. Crée le dossier si besoin
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// 2. CSS
fs.writeFileSync(path.join(componentDir, `${kebabName}.module.css`), "");

// 3. TSX
fs.writeFileSync(
  path.join(componentDir, componentFileName),
  `//import styles from './${kebabName}.module.css';

export interface ${propsTypeName} {}

export const ${componentName} = ({}: ${propsTypeName}) => {
  return (
    <div>
    </div>
  );
};
`
);

// 4. Storybook
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.tsx`),
  `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${storyTitle}',
  component: ${componentName},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {},
};
`
);

// 5. Gère le fichier index.ts
const indexFilePath = path.join(basePath, "index.ts");

const exportComponentLine = `export { ${componentName} } from "./${componentName}/${componentName}";`;
const exportTypeLine = `export type { ${propsTypeName} } from "./${componentName}/${componentName}";

`;

let indexContent = "";

if (fs.existsSync(indexFilePath)) {
  indexContent = fs.readFileSync(indexFilePath, "utf-8");
  if (!indexContent.includes(exportComponentLine)) {
    indexContent += `\n${exportComponentLine}`;
  }
  if (!indexContent.includes(exportTypeLine)) {
    indexContent += `\n${exportTypeLine}`;
  }
} else {
  indexContent = `${exportComponentLine}\n${exportTypeLine}`;
}

fs.writeFileSync(indexFilePath, indexContent.trim() + "\n");

console.log(`✅ Composant ${componentName} généré dans ${componentDir}`);
console.log(`✅ Fichier index.ts mis à jour`);
