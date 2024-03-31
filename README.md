# Testing React Apps

This is the starter project for my Reacting testing course where you'll learn everything you need to know to effectively test React apps. You can find the full course at: 

https://codewithmosh.com 

## About this Project 

This is a React app built with the following technologies and libraries: 

- Auth0 
- Tailwind 
- RadixUI
- React Router 
- React Query  
- Redux Toolkit
- React Hook Form 
- React Tables Flowbite

Please follow these instructions carefully to setup this project on your machine. 

## Install Test libraries

```bash
npm i -D vite vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
```bash
"scripts": {
   "test": "vitest",
   "test:ui": "vitest --ui --api 9527"
}
```
Create vitest.config.ts at root with the next content
```bash
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: 'tests/setup.ts'
  },
});
```
## Test Improovements
To not import in every test file (expect, it, describe) ...
In tsconfig.json add
```bash
"types": ["vitest/globals"]
```
To not import in every test file import '@testing-library/jest-dom/vitest';
add a file setup.ts in Test folder and add import '@testing-library/jest-dom/vitest';

To not import in every test file import { render, screen } from '@testing-library/react'
install the deinsoftware.testing-library-snippets extension and in test file type itr.

Testing snippets ... it... qt...

[Test Queries Documentation](https://testing-library.com/docs/)

## Database (db.json)

if database file db.json does not exist in src/data folder create it and add...
```bash
{
  "users": [
    {
      "id": 1,
      "name": "Guest",
      "isAdmin": false
    },
    {
      "id": 2,
      "name": "Admin",
      "isAdmin": true
    }
  ],
  "categories": [],
  "records": []
}

```

## Setting up Auth0 for Authentication

1. **Sign up for an Auth0 Account:**

   If you don't already have an Auth0 account, you can sign up for one at [https://auth0.com/](https://auth0.com/). Auth0 offers a free tier that you can use for your project.

2. **Create a New Application:**

   - Log in to your Auth0 account.
   - Go to the Auth0 Dashboard.
   - Click on "Applications" in the left sidebar.
   - Click the "Create Application" button.
   - Give your application a name (e.g., "My React App").
   - Select "Single Page Web Applications" as the application type.

3. **Configure Application Settings:**

   - On the application settings page, configure the following settings:
     - Allowed Callback URLs: `http://localhost:5173` 
     - Allowed Logout URLs: `http://localhost:5173` 
     - Allowed Web Origins: `http://localhost:5173`
   - Save the changes.

4. **Obtain Auth0 Domain and ClientID:**

   - On the application settings page, you will find your Auth0 Domain and Client ID near the top of the page.
   - Copy the Auth0 Domain (e.g., `your-auth0-domain.auth0.com`) and Client ID (e.g., `your-client-id`).

5. **Create a `.env.local` File:**

   - In the root directory of the project, you'll find a sample `.env` file. Make a copy and save it as `.env.local`.
   - Replace the Auth0 Domain and Client ID with the actual values you obtained from Auth0.

6. **Examples**
   
   - [Auth0 github](https://github.com/auth0/auth0-react/?tab=readme-ov-file)



## Running the App

Now that you have set up Auth0 and configured your environment variables, you can run the React app using the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

This will start the back-end process at `http://localhost:3000`. If port 3000 is in use on your machine, update the port number in the following files and run `npm start` again: 

- json-server.json
- src/main.tsx
