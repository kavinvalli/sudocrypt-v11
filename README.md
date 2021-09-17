# Sudocrypt v11.0

Using _Laravel Inertia REact TypeScript_ made by @dotangad

## Setup

```sh
git clone https://github.com/kavin25/sudocrypt-v11.git
composer && npm i
cp .env.example .env
./vendor/bin/sail up -d
./vendor/bin/sail artisan websockets:serve # FOR REALTIME NOTIFICATIONS
./vendor/bin/sail artisan discord:run # FOR DISCORD BOT
npm run watch
```
