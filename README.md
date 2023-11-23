# Getting Started

Clone the repository

```shell
git clone git@github.com:Joshibbotson/Life_manager.git
```

enter directory

```shell
cd Life_manager
```

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

Install Server dependencies and run server

```shell
npm install
```

Install nodemon

```shell
npm i nodemon
```

Setup Postgres server

```shell

```

Run the server

```shell

```

-

# TODO

### Modules:

- Add japanese learning module - []
- Add todo list - []
- Add real time chat that allows users to link tasks with @ sign - []
- Add notification system - []

### General architectural changes

- Add pagination serverside - []
- Add schema validation - []
- Add Users, including simple registration and login - []
- Add luxon library - []
- Add state via NgRx - [x]
- Setup Elastic - []
- Add testing suites - []

### Hosting

- Setup CD/CI pipeline - []
- Setup apache web server on raspberry pi 3 - []
