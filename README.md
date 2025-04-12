# QA Automation Test Strategy

## Tools & Technologies Used
- **Playwright** (Test automation framework)
- **Node.js** (JavaScript runtime)
- **TypeScript** (Typed superset of JavaScript)
- **Allure / Playwright HTML Reports** (Test reporting)
- **GitHub Actions** (CI/CD for automated test runs)
- **dotenv** (Environment variable management)
- **VSCode** (Code editor)

## Session Management
- Validated login and logout functionality.
- Implemented page object model (POM) for reusable code.
- Credentials securely managed via `.env` file.

## Role-Based Access Control
- Test designed to verify different permissions per role.

## Functional Testing
- Tested full CRUD operations on employee data:
  - Create
  - Read 
  - Update/Edit
  - Delete

## Edge Case Testing
- Empty fields
- Special characters (e.g., `!@#$%^&*()`)
- Very long inputs (255+ characters)

## Data-Driven Testing
- Employee test cases driven via a `JSON` data file.
- Supports scaling test inputs without rewriting logic.

## Error Handling
- Retry mechanism via Playwright’s built-in retries.
- Screenshot and video capture on failure for easier debugging.

## Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in actual credentials and base URL

## How to Run Tests
```bash
npm install
npx playwright test
npx playwright show-report
```
## View [Manual Test Cases](./test-cases.md)
Created an excel file to showcase the OrangeHRM test cases in Google Spreadsheet
