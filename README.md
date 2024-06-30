<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">DAEM-BACKEND</h1>
</p>
<p align="center">
    <em>Backend for Child Exploitation Reporting Application</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/kinal-team-1/DAEM-backend?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/kinal-team-1/DAEM-backend?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/kinal-team-1/DAEM-backend?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/kinal-team-1/DAEM-backend?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#overview)
- [ Features](#features)
- [ Repository Structure](#repository-structure)
- [ Modules](#modules)
- [ Getting Started](#getting-started)
  - [ Installation](#installation)
  - [ Usage](#usage)
  - [ Tests](#tests)
- [ Project Roadmap](#project-roadmap)
- [ Contributing](#contributing)
- [ License](#license)
</details>
<hr>

##  Overview

The DAEM-Backend is the server-side component of a Child Exploitation Reporting Application. It provides a robust API for managing public and anonymous case reports, user authentication, and file attachments. The application aims to combat child abuse by offering a platform for reporting incidents, both publicly and anonymously, while maintaining user privacy and data security.

---

##  Features

- User authentication and authorization
- Public case reporting and management
- Anonymous case reporting with unique key generation
- File attachment handling using Supabase
- Location-based case querying and filtering
- Internationalization support
- Custom error handling and logging
- Robust testing setup using Japa

---

##  Repository Structure

```sh
└── DAEM-backend/
    ├── .github/workflows/
    ├── bin/
    ├── eslint-custom-rules/
    ├── i18n/
    │   ├── en/
    │   └── es/
    ├── src/
    │   ├── application/
    │   │   ├── anonymous-case/
    │   │   ├── anonymous-key/
    │   │   ├── attachment/
    │   │   ├── auth/
    │   │   ├── public-case/
    │   │   ├── stale-content/
    │   │   └── user/
    │   ├── db/
    │   ├── middleware/
    │   └── utils/
    └── tests/
        ├── api/
        └── utils/
```

---

##  Modules

<details closed><summary>src.application.anonymous-cases</summary>

| File                                                                                                                                                   | Summary                                                                                             |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [anonymous-case.model.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/anonymous-case/anonymous-case.model.js)             | Defines the MongoDB schema for anonymous cases, including location data and attachment references.  |
| [anonymous-case.controllers.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/anonymous-case/anonymous-case.controllers.js) | Implements controllers for creating, retrieving, and managing anonymous cases.                      |
| [anonymous-case.utils.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/anonymous-case/anonymous-case.utils.js)             | Provides utility functions for anonymous case operations, such as key generation and case querying. |
| [anonymous-case.routes.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/anonymous-case/anonymous-case.routes.js)           | Defines API routes for anonymous case-related operations.                                           |
| [anonymous-case.errors.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/anonymous-case/anonymous-case.errors.js)           | Contains custom error classes for handling anonymous case-specific errors.                          |

</details>

<details closed><summary>src.application.public-case</summary>

| File                                                                                                                                          | Summary                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| [public-case.model.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/public-case/public-case.model.js)             | Defines the MongoDB schema for public cases, including user references and location data. |
| [public-case.controllers.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/public-case/public-case.controllers.js) | Implements controllers for creating, retrieving, and managing public cases.               |
| [public-case.utils.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/public-case/public-case.utils.js)             | Provides utility functions for public case operations, such as filtering and querying.    |
| [public-case.routes.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/public-case/public-case.routes.js)           | Defines API routes for public case-related operations.                                    |
| [public-case.errors.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/public-case/public-case.errors.js)           | Contains custom error classes for handling public case-specific errors.                   |

</details>

<details closed><summary>src.application.auth</summary>

| File                                                                                                                     | Summary                                                                    |
|--------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [auth.controllers.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/auth/auth.controllers.js) | Implements authentication controllers for user registration and login.     |
| [auth.routes.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/auth/auth.routes.js)           | Defines API routes for authentication-related operations.                  |
| [auth.errors.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/auth/auth.errors.js)           | Contains custom error classes for handling authentication-specific errors. |

</details>

<details closed><summary>src.application.attachment</summary>

| File                                                                                                                                       | Summary                                                                         |
|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [attachment.model.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/attachment/attachment.model.js)             | Defines the MongoDB schema for file attachments.                                |
| [attachment.controllers.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/attachment/attachment.controllers.js) | Implements controllers for handling file uploads and retrievals using Supabase. |
| [attachment.routes.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/attachment/attachment.routes.js)           | Defines API routes for attachment-related operations.                           |
| [attachment.errors.js](https://github.com/kinal-team-1/DAEM-backend/blob/master/src/application/attachment/attachment.errors.js)           | Contains custom error classes for handling attachment-specific errors.          |

</details>

---

##  Getting Started

###  Installation

1. Clone the DAEM-backend repository:
```sh
git clone https://github.com/kinal-team-1/DAEM-backend
```

2. Change to the project directory:
```sh
cd DAEM-backend
```

3. Install the dependencies:
```sh
npm install
```

4. Pull the DB mongo replica set enabled image for local development, we recommend using `make` for this:
```sh
make
```

###  Usage

1. Set up environment variables:
   - You can use `.env.example` or create `.env` and set up your own supabase credentials.

2. Start the server:
```sh
npm run dev
```

###  Tests

Run the test suite using the command below:
```sh
npm test
```

---

##  Project Roadmap

- [X] Implement basic CRUD operations for public and anonymous cases
- [X] Set up authentication system
- [X] Integrate file upload functionality with Supabase
- [X] Implement location-based case querying
- [X] Add internationalization support
- [ ] Develop case contribution endpoints

---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

##  License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Contributions

this project was made by students of KINAL, Guatemala.

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/kinal-team-1/DAEM-backend/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=kinal-team-1/DAEM-backend">
   </a>
</p>
</details>

[**Return**](#-overview)

---
