# playwrightAssigment

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npx playwright test
   ```

## Structure
- `tests/` - Contains only spec files
- `pageObjects/` - Page Object Model classes
- `utils/` - Utility scripts and test data
- `uploads/` - Files for upload tests
- `downloads/` - Downloaded files
- `assets/` - Other resources

## Conventions
- All POM files use camelCase naming
- Use Playwright's auto-waiting for locators
- Use `baseURL` from config
