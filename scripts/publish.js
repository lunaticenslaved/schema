const fsExtra = require('fs-extra');
const fs = require('fs');
const { execSync } = require('child_process');

if (!fsExtra.existsSync('dist')) {
  throw new Error('Run build before publish!');
}

fsExtra.mkdirSync('dist-copy');
fsExtra.copySync('dist', `dist-copy/dist`);
fsExtra.removeSync('dist');
fsExtra.renameSync('dist-copy', 'dist');

// update package json version
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const args = process.argv.slice(2);

const versionIndex = args.findIndex(arg => arg === '--version');
const version = versionIndex > -1 ? args[versionIndex + 1] : 'patch';

const [major = 0, minor = 0, patch = 0] = packageJson.version.split('.').map(Number);

if (version === 'patch') {
  packageJson.version = `${major}.${minor}.${patch + 1}`;
} else if (version === 'minor') {
  packageJson.version = `${major}.${minor + 1}.${0}`;
} else {
  packageJson.version = `${major + 1}.${0}.${0}`;
}

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

const paths = ['.npmignore', 'package.json', 'package-lock.json'];

for (const path of paths) {
  fsExtra.copySync(path, `dist/${path}`);
}

execSync('cd dist && npm i --omit=dev && npm publish');
execSync('cd ..');
execSync('git add package.json');
execSync(`git commit -m "chore: update version up to ${packageJson.version}" && git push`);
