# TranscoR Worker Platform

## Development quickstart

Clone the repo and run the following commands:

- `npm install` to install project dependencies
- Make sure you have a `.env` file at the root level (copy `.env.sample`)
- `next dev` to start development server
- Open the app at http://localhost:3000.

Some additional commands that are frequently used in development are:

- `npm test` run all tests and collect the coverage information

## Environment variables

Environment variables can be used to override the default configuration of the application. The list of configurable environment variables is:

| Variable                               |   Values   | Description                                 |
| -------------------------------------- | :--------: | ------------------------------------------- |
| NEXT_PUBLIC_GOOGLE_API_KEY             | `<string>` | Specifies the value of the Firebase API KEY |
| NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN         | `<string>` | Firebase authentication domain URL          |
| NEXT_PUBLIC_GOOGLE_PROJECT_ID          | `<string>` | Firebase project ID                         |
| NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET      | `<string>` | Firebase Bucket Name                        |
| NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID | `<string>` | Firebase Messaging Server ID                |
| NEXT_PUBLIC_GOOGLE_APP_ID              | `<string>` | Firebase App ID                             |

|

## Building for production

- `next build` builds for production
- `next start` start the production server

## Maintainers

- Jared Ortega of Continuity
