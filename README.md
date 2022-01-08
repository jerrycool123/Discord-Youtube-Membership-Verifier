# Discord Youtube Membership Verifier

## Required settings

- Download Google OAuth 2.0 client credentials, rename it to `client_secret.json` and place it under the root directory.
- Create `./.env` and put environment variables into it. You can refer to `./.env.defaults`.
- Provide `key.pem` and `cert.pem` under `./ssl` for HTTPS support.
- Provide `./configs/membership.json` as the following format:
```
[
  {
    "alias": "★THE かなた★",
    "channelId": "AmaneKanataCh",
    "memberOnlyVideoId": "ufoW2kNaXSM",
    "emoji": {
      "name": "💫",
      "id": null
    },
    "roleId": "929325067702259732"
  },
  {
    "alias": "Nekomata Okazu",
    "channelId": "UCvaTdHTWBGv3MKj3KVqJVCw",
    "memberOnlyVideoId": "0BqfCI_XZ6M",
    "emoji": {
      "name": "🐱",
      "id": null
    },
    "roleId": "929325344610201600"
  }
]
```

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