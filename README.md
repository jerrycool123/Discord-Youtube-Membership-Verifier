# Discord Youtube Membership Verifier

## Required settings

- Download Google OAuth 2.0 client credentials, rename it to `./client_secret.json`.
- Create `./.env` and put environment variables into it. You can refer to `./.env.defaults`.
- Provide `key.pem` and `cert.pem` under `./ssl` directory for HTTPS support.

## Install

- You should have `yarn` package manager.

```
yarn install
```

## Usage

```
yarn start
```