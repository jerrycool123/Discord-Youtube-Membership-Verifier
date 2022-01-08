# Discord Youtube Membership Verifier

## Required settings

- Download Google OAuth 2.0 client credentials, rename it to `client_secret.json` and place it under `nodejs` directory.
- Create `./nodejs/.env` and put environment variables into it. You can refer to `./nodejs/.env.defaults`.
- Provide `key.pem` and `cert.pem` under `./nodejs/src/ssl` for HTTPS support.

## Install

- You should have `yarn` package manager.

```
cd nodejs
yarn install
```

## Usage

```
cd nodejs
yarn start
```