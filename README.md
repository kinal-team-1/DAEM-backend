# Backend Example

This is a Node.js backend application built with Express.js. It provides a RESTful API for managing currencies and includes features such as internationalization (i18n), custom ESLint rules, testing with Jest, and a MongoDB database connection.

## Features

- **RESTful API**: The application exposes a RESTful API.
- **Internationalization (i18n)**: The application supports internationalization using the `typesafe-i18n` library, allowing translations for different locales.
- **Custom ESLint Rules**: The project includes custom ESLint rules to enforce best practices and coding standards.
- **Testing with Japa**: The repo is configured to use JAPA for testing.
- **MongoDB Integration**: The application connects to a MongoDB database for data persistence, using the `mongoose` library.
- **Error Handling**: The application includes error handling and logging mechanisms using the `pino` logger.
- **Environment Variables**: Configuration settings are managed through environment variables, with an example file (`.env.example`) provided.
- **GitHub Actions**: A GitHub Actions workflow is included for running checks on pull requests and manual triggers, including linting, type checking, and tests.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/backend-example.git`
2. Install dependencies: `npm install`
3. (OPTIONAL) Set up environment variables by creating a `.env` file based on the `.env.example` file.
4. (OPTIONAL) Generate the translations type with `npm run typesafe-i18n` (This is required if want to use `npm run start`)
5. Start the development server: `npm run dev` (this runs `npm run typesafe-i18n` automatically)

## Scripts

- `npm run dev`: Start the development server with hot reloading.
- `npm run start`: Start the production server.
- `npm run test`: Run the test suite.
- `npm run lint`: Run ESLint for code linting.
- `npm run ts`: Type-check the codebase using TypeScript.
- `npm run typesafe-i18n`: Generate translation files for i18n.
- `npm run once-typesafe-i18n`: Generate translation files once (without watching for changes).

## Project Structure

```
.
├── .env.example                    # Example environment variables file
├── .env.test                       # Environment variables for testing
├── .eslintignore                   # Files and directories to be ignored by ESLint
├── .eslintrc.cjs                   # ESLint configuration file
├── .github
│   └── workflows
│       └── example.yaml            # GitHub Actions workflow file
├── .gitignore                      # Files and directories to be ignored by Git
├── .nvmrc                          # Node version manager configuration file
├── .prettierrc                     # Prettier code formatter configuration file
├── .run
│   └── run tests.run.xml           # Run configuration for tests
├── .typesafe-i18n.json             # Configuration file for typesafe-i18n
├── README.md                       # Project readme file
├── eslint-custom-rules             # Custom ESLint rules directory
│   ├── enforce-*.cjs              # Custom ESLint rule files
│   └── package.json                # Package configuration for custom ESLint rules
├── git-hooks
│   └── commit-msg                  # Git hook for commit message validation
├── i18n                            # Internationalization files
│   ├── en                          # English translation files
│   │   └── index.js
│   ├── es                          # Spanish translation files
│   │   └── index.js
│   └── formatters.js               # Formatters for translation strings
├── jest-before-each-test.js        # Setup file for Jest tests
├── jest.config.mjs                 # Jest configuration file
├── package-lock.json               # Locked version of dependencies
├── package.json                    # Project package configuration
├── routes.js                       # Express routes file
├── server.js                       # Entry point for the server
├── src
│   ├── application
│   ├── db
│   │   └── db-connection.js        # Database connection setup
│   ├── middleware                  # Express middleware
│   │   ├── print-language.js       # Middleware to print the language
│   │   ├── retrieve-locale.js      # Middleware to retrieve locale
│   │   └── validate-checks.js      # Middleware for input validation
│   └── utils
│       ├── clean-object.js         # Utility function to clean objects
│       ├── get-translations-locale.js # Utility function to get translation functions
│       ├── http-errors.js          # HTTP error definitions
│       ├── logger.js               # Logging utility
│       └── message.js              # Utility for creating messages
├── tests                           # japa tests directory
└── tsconfig.json                   # TypeScript configuration file
```

The project follows a modular structure, with the main application logic residing in the `src` directory. The `src/application` directory contains modules, such as the `currency` module, which includes the controller, model, routes, and error definitions for managing currencies.

The `src/middleware` directory contains Express middleware functions for tasks like retrieving the locale, validating input, and printing the language.

The `src/utils` directory contains utility functions for tasks like logging, handling HTTP errors, cleaning objects, and creating messages.

The `routes.js` file defines the API routes and applies the necessary middleware functions.

The `server.js` file is the entry point of the application, where the Express server is created and started, and the database connection is established.

The `tests` directory contains Jest tests for the various components of the application, such as the currency endpoints and a health check.

The `i18n` directory contains the translation files for different locales, managed by the `typesafe-i18n` library.

The project also includes configuration files for tools like ESLint, Prettier, TypeScript, and typesafe-i18n, as well as custom ESLint rules defined in the `eslint-custom-rules` directory.

The `.github/workflows/example.yaml` file defines a GitHub Actions workflow for running checks on pull requests and manual triggers. It sets up a MongoDB service, installs dependencies, and runs linting, type checking, and tests.

## Functioning

The application follows a typical RESTful API structure, with routes defined for different resources (in this case, currencies). The `routes.js` file sets up the routes and applies middleware functions for tasks like retrieving the locale, validating input, and printing the language.

When a request is made to a specific route, the corresponding controller function is executed. For example, the `createCurrency` function in `currency.controller.js` is responsible for handling the creation of a new currency. This function performs input validation, creates a new `Currency` instance using the `currency.model.js` file, and saves it to the database.

The application uses the `mongoose` library to interact with the MongoDB database. The `currency.model.js` file defines the schema for the `Currency` model, including fields like `symbol`, `name`, `key`, and `tp_status` (which indicates whether the currency is active or inactive).

Error handling is performed using custom error classes defined in `currency.error.js`, and logging is handled using the `pino` logger in `logger.js`.

The application supports internationalization using the `typesafe-i18n` library. Translation files for different locales are stored in the `i18n` directory, and the `get-translations-locale.js` utility function provides a way to retrieve translation functions based on the current locale.

The project includes unit tests for the currency endpoints and a health check, written using the Jest testing framework. These tests can be run using the `npm run test` command.

The GitHub Actions workflow defined in `.github/workflows/example.yaml` sets up a MongoDB service, installs dependencies, and runs linting, type checking, and tests on pull requests and manual triggers. This helps ensure code quality and catch potential issues early in the development process.

Overall, the application follows a well-structured and modular approach, with separation of concerns and adherence to best practices for Node.js backend development.
