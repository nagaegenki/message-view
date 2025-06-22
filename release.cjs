require('dotenv').config();
const semanticRelease = require('semantic-release').default;

// retrieve the dry-run option
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

// proceed semantic release
semanticRelease({
  dryRun: isDryRun,
}).then(result => {
  console.log('Release result:', result);
}).catch(err => {
  console.error('Release failed:', err);
  process.exit(1);
});