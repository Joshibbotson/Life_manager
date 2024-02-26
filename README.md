# Why Life Manager was created

Life_manager was created after a discussion with my wife on setting up a rota for doing household chores. Initially I thought lets just use a whiteboard, but then after I missed bin day one too many times I realised there had to be a software solution for this. So here it is, Life_manager.

# What Life Manager does

A modular web app for handling household/life problems, such as the todo module. Which allows users to create a simple personal todo and assign todos to other users.

# What Life Manager plans to do

The plan for Life Manager is to provide a personal todo list, repeating chore calendar that follows 'iCalendar' format and allow users to open chat rooms with one another linking chores/todos within said chat.

For more info please see the wiki!

# Getting Started

Clone the repository

```shell
git clone git@github.com:Joshibbotson/Life_manager.git
```

Enter directory

```shell
cd Life_manager
```

Setup .env file using the .env.example file:
```shell
cp .env.example .env
```

Install dependencies

```shell
npm install
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

Open a fresh terminal and enter the user directory

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

OPTIONAL: Open a fresh terminal, enter the user directory and run test suite.

```shell
cd app/user && npm run test
```

### Run backend server

Note: Ensure you have Postgres installed.

Install Server dependencies

```shell
npm install
```

Run the server

```shell
npm run server
```

If all is well you should be good to go!

---
