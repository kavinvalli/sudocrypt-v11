# Sudocrypt v11.0

Using [_Laravel Inertia REact TypeScript_](https://github.com/dotangad/liret) made by @dotangad

## Setup
- Clone the repository
```sh
git clone https://github.com/kavinvalli/sudocrypt-v11.git
```
- Install dependencies
```sh
composer install && npm i
```
- Fill out .env
```sh
cp .env.example .env
```
- Run the app
  - Using Docker (Sail)
  ```sh
  ./vendor/bin/sail up -d
  ./vendor/bin/sail artisan websockets:serve # FOR REALTIME NOTIFICATIONS
  ./vendor/bin/sail artisan discord:run # FOR DISCORD BOT
  ```
  - Using Laravel Valet
    - Follow [the docs](https://laravel.com/docs/8.x/valet)
- Watch for frontend changes
```sh
npm run watch
```
