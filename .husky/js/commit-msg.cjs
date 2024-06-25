#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');

// Function to validate commit message against Smart Commit standards
function validateCommitMessage(commitMessage) {
    const regex = /^\w+-\d+(( #comment .+\S)( #time .+\S)|( #time .+\S)( #comment .+\S))?$/;
    return regex.test(commitMessage);
}

// Get the path to the commit message file
const commitMsgFile = process.argv[2];

// Read the commit message from the file
const commitMessage = fs.readFileSync(commitMsgFile, 'utf8').trim();

console.log(chalk.magenta('Checking commit message format'));

// Validate the commit message
if (!validateCommitMessage(commitMessage) && !commitMessage.startsWith('Merge branch')) {
    console.error(chalk.red('Error: Commit message does not follow the Smart Commit standard.'));
    process.exit(1);
}

// If the commit message follows the Smart Commit standard, exit successfully
console.log(chalk.blue('Commit does follow the Smart Commit standard.'));
console.log('');
console.log(chalk.green('Commit has been done'));
process.exit(0);
