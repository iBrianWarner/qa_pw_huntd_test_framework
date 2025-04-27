import { execSync } from 'child_process';

const MAX_RETRIES = 3;

function execCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });

    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);

    return false;
  }
}

function installBrowsersWithRetry() {
  let success = false;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    console.log(`Attempt ${attempt} to install Playwright browsers...`);

    success = execCommand('npx playwright install --with-deps chromium');

    if (success) {
      console.log('Playwright browsers installed successfully!');
      break;
    } else {
      console.log(`Attempt ${attempt} failed. Retrying...\n`);
    }

    if (attempt === MAX_RETRIES) {
      console.error('Failed to install Playwright browsers after 3 attempts.');
      process.exit(1);
    }
  }
}

installBrowsersWithRetry();
