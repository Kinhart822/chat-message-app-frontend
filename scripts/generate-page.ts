import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract page name
const pageName = process.argv[2];

// Check if the page name is provided
if (!pageName) {
  console.error('❌ Please supply a valid page name!');
  console.log('👉 Usage: yarn gen:page <PageName>');
  process.exit(1);
}

// Validate page name
const pageNameRegex = /^[a-zA-Z]+$/;
if (!pageNameRegex.test(pageName)) {
  console.error('❌ Please supply a valid page name! (only letters allowed)');
  console.log('👉 Usage: yarn gen:page <PageName>');
  process.exit(1);
}

if (pageName.length < 3) {
  console.error('❌ Please supply a valid page name! (at least 3 characters)');
  console.log('👉 Usage: yarn gen:page <PageName>');
  process.exit(1);
}

// Check if follow format HomePage, LoginPage, etc
if (!pageName.endsWith('Page')) {
  console.error(
    "❌ Please supply a valid page name! (must end with 'Page', e.g., HomePage, LoginPage)",
  );
  console.log('👉 Usage: yarn gen:page <PageName>');
  process.exit(1);
}

// Capitalize the first letter of the page name
const capitalizedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

// Define the target file path for the new page
const targetFilePath = path.join(
  __dirname,
  '..',
  'src',
  'pages',
  `${capitalizedName}.tsx`,
);

// Check if page already exists to prevent accidental overwriting
if (fs.existsSync(targetFilePath)) {
  console.error(`❌ Error: Page '${capitalizedName}.tsx' already exists at:`);
  console.error(targetFilePath);
  process.exit(1);
}

// Ensure the pages directory exists
const pagesDir = path.join(__dirname, '..', 'src', 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Define the content for the component file
const fileContent = `import React from 'react';

const ${capitalizedName}: React.FC = () => {
  return (
    <div>
      <h1>Hello from ${capitalizedName}!</h1>
    </div>
  );
}

export default ${capitalizedName};
`;

// Write the contents to the file
try {
  fs.writeFileSync(targetFilePath, fileContent);

  console.log(`✅ Successfully generated page: ${capitalizedName}`);
  console.log(`📂 Location: src/pages/`);
  console.log(`📄 Created file: ${capitalizedName}.tsx`);
} catch (error) {
  console.error('❌ Failed to write page file:', error);
}
