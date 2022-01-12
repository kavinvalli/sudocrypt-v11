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
    - Run Websockets
    ```sh
    php artisan websockets:serve
    ```
    - Run Discord Bot code (you will have to setup the discord api creds for this in .env)
    ```sh
    php artisan discord:run
    ```
- Watch for frontend changes
```sh
npm run watch
```
