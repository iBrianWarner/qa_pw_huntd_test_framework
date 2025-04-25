# Huntd Test Framework

An automation testing project for [Huntd](https://huntd.tech/).

## Description

This repository contains an end-to-end (E2E) testing framework built using Playwright. It is designed to automate testing for the Huntd platform, ensuring the quality and reliability of its features.

## Repository Structure

```text
qa_pw_huntd_test_framework/
├── src/                # Source files for page objects and utilities
├── tests/              # Test cases for various features
├── configs/             # Configuration files for Playwright and other tools
├── reports/            # Generated test reports (e.g., Allure reports)
├── .prettierrc         # Prettier configuration file
├── package.json        # Node.js dependencies and scripts
├── README.md           # Project documentation
```

## Used Technologies

- **[Playwright](https://playwright.dev/)**
- **[Allure Reporter](https://docs.qameta.io/allure/)**
- **[Node.js v20](https://nodejs.org/en)**
- **TypeScript**
- **ESLint**
- **Prettier**

## Commands

Here are some useful commands to work with this project:

### Install Dependencies

```bash
npm ci --legacy-peer-deps
```

### Run Tests in debug mode

```bash
npm run pw:run:local-open-debug
```

### Allure Report

Read the [documentation](https://allurereport.org/docs/install/) to setup Allure locally.

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```

## Useful Information

- **Allure Reports**: Test reports can be accessed locally or via the [Allure report link](https://ibrianwarner.github.io/qa_pw_huntd_test_framework/#).
- **Prettier Configuration**: The `.prettierrc` file defines the formatting rules for this project.
- **Playwright Configuration**: Ensure the `playwright.config.ts` file is properly set up for your environment.
