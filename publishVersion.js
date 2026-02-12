import { execSync } from 'child_process';
const version = process.argv[2];
// const commit = process.argv[3];
const release = "Release:v";

if (version !== undefined && Number.isInteger(version)) {
  console.error('Please provide a version number');
  process.exit(1);
}
// if (commit === undefined) {
//   console.error('Please provide a commit message');
//   process.exit(1);
// }

try {
  console.log('🛠 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
   
  console.log('📡 Pushing to Git...');
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${release}${version}"`, { stdio: 'inherit' });
  execSync(`npm version ${version}`, { stdio: 'inherit' });
  execSync('git push --follow-tags', { stdio: 'inherit' });
  
  console.log('🚀 Publishing to npm...');
  execSync('npm publish', { stdio: 'inherit' });
  
  console.log('✅ Successfully published!');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('Check full error log for details');
  process.exit(1);
}