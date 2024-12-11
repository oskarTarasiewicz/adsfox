# AdsFox - aplikacja testowa (CRUD kanałów)


## Konfiguracja:

##### Baza danych:

| .env var  | value |
| ------------- |:-------------:|
| DB_CONNECTION      | mysql     |
| DB_HOST      | 127.0.0.1     |
| DB_PORT      | 3306     |
| DB_DATABASE      | test-app     |
| DB_USERNAME      | test-app-user     |
| DB_PASSWORD      | root     |

### Uruchamianie:

1. `> cd ./test-app`
2. `> npm install`
3. `> php artisan serve`
4. Otwórz https://localhost:8000

### Testy

##### Frontend:
- `> npm run test`
./resources/tests/Edit.test.tsx

##### Backend
- `> ./vendor/bin/pest`
./tests/Feature/ChannelTest.php

### Wykorzystano:

##### Frontend:
- Typescript
- "react": "^19.0.0",
- "vite": "^5.0",
- "axios": "^1.7.9",
- "tailwindcss": "^3.4.16",
- "@testing-library/react": "^16.1.0",
- "vitest": "^2.1.8"

##### Backend:
- "php": "^8.2",
- "laravel/framework": "^11.31",
- mysql,
- "pestphp/pest",




#### Aplikacja została stworzona przez:

**Imię i Nazwisko**
[OskarTarasiewicz](https://github.com/oskarTarasiewicz)
Email: oskar.tarasiewicz40@gmail.com