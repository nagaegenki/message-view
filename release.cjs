require('dotenv').config();
const semanticRelease = require('semantic-release').default;

// retrieve the dry-run option
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

// proceed semantic release
semanticRelease({
  dryRun: isDryRun,
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        labels: ['release'],
        successComment: false,
        failComment: false,
        assignees: []
      }
    ]
  ],
}).then(result => {
  console.log('Release result:', result);
}).catch(err => {
  console.error('Release failed:', err);
  process.exit(1);
});