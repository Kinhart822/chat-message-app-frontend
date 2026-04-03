import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract component name
const componentName = process.argv[2];

// Check if the component name is provided
if (!componentName) {
  console.error('❌ Please supply a valid component name!');
  console.log('👉 Usage: yarn gen:component <ComponentName>');
  process.exit(1);
}

// Validate component name
const compNameRegex = /^[a-zA-Z]+$/;
if (!compNameRegex.test(componentName)) {
  console.error(
    '❌ Please supply a valid component name! (only letters allowed)',
  );
  console.log('👉 Usage: yarn gen:component <ComponentName>');
  process.exit(1);
}

if (componentName.length < 3) {
  console.error(
    '❌ Please supply a valid component name! (at least 3 characters)',
  );
  console.log('👉 Usage: yarn gen:component <ComponentName>');
  process.exit(1);
}

// Capitalize the first letter of the component name
const capitalizedName =
  componentName.charAt(0).toUpperCase() + componentName.slice(1);

// Define the target directory path for the new component
const targetDirPath = path.join(
  __dirname,
  '..',
  'src',
  'components',
  capitalizedName,
);

// Check if component already exists to prevent accidental overwriting
if (fs.existsSync(targetDirPath)) {
  console.error(`❌ Error: Component '${capitalizedName}' already exists at:`);
  console.error(targetDirPath);
  process.exit(1);
}

// Create the component directory
fs.mkdirSync(targetDirPath, { recursive: true });

// Define the content for the index.tsx file
const indexContent = `import React from 'react';
import styles from "./${capitalizedName}.module.css";

interface ${capitalizedName}Props {
  // Add props here
}

const ${capitalizedName}: React.FC<${capitalizedName}Props> = (props) => {
  return (
    <div>
      <h1>Hello from ${capitalizedName} Component!</h1>
    </div>
  );
}

export default ${capitalizedName};
`;

// Define the content for the CSS Module file
const cssContent = `/* Add your custom styles for ${capitalizedName} here */`;

// Define file paths
const indexPath = path.join(targetDirPath, 'index.tsx');
const cssPath = path.join(targetDirPath, `${capitalizedName}.module.css`);

// Write the contents to the physical files
try {
  fs.writeFileSync(indexPath, indexContent);
  fs.writeFileSync(cssPath, cssContent);

  console.log(`✅ Successfully generated component: ${capitalizedName}`);
  console.log(`📂 Location: src/components/${capitalizedName}`);
  console.log(`📄 Created files: index.tsx, ${capitalizedName}.module.css`);
} catch (error) {
  console.error('❌ Failed to write component files:', error);
}
