# Getting Started

Clone the repository

```shell
git clone git@github.com:Joshibbotson/Life_manager.git
```

Enter directory

```shell
cd Life_manager
```

Install dependencies

```shell
npm install
```

Install Angular if not already installed

```shell
npm i @angular/cli
```

### Install API dependencies and build distribution folder

Enter API directory from root

```shell
cd app/api
```

Install API dependencies

```shell
npm install
```

Build API distribution, this builds shared types and validation files.

```shell
npm run build
```

### Run Angular clientside

Enter user directory from root

```shell
cd app/user
```

Install User dependencies and run Angular development server

```shell
npm install
```

Serve Angular development server, if all is well it will be running on http://localhost:4200/

```shell
npm run start
```

### Run backend server

Note: Ensure you have Postgres installed.

Install Server dependencies

```shell
npm install
```

Install nodemon

```shell
npm i nodemon
```

Setup .env file:

- Create .env file in Life_manager/app/server
- use the following Environment names:\
  DB_HOST\
  DB_PORT\
  DB_USERNAME\
  DB_PASSWORD\
  DB_DATABASE\
  EXPRESS_PORT\
  SECRET_WEBTKNKEY\
  NODE_ENV

an example may look like:

```shell
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
EXPRESS_PORT=8080
SECRET_WEBTKNKEY=a-long-hexadecimal-number-perhaps
NODE_ENV=development
```

Run the server

```shell
npm run server
```

If all is well you should be good to go!

---

# TODO

### Modules:

- Add todo list - [x]
- Add real time chat that allows users to link tasks with @ sign - []
- Add notification system - []

### General architectural changes

- Add pagination serverside - [x]
- Add schema validation - [x]
- Add Users, including simple registration and login - [x]
- Add luxon library - [x]
- Update clientside to follow angular 17 updates - []
- Add state via NgRx - [x]

### Testing

Add end to end testing via Playwright - []

### Hosting

- Setup CD/CI pipeline - []
- Deploy via digital ocean droplet - [x]
