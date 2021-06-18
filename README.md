# clothes-api
# Nodejs Expressjs MongoDB Ready-to-use API Project Structure

A ready-to-use clothe-management for REST API Development with Node.js, Express, and MongoDB

## Getting started

Very useful to building a RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, etc).

This project will run on **NodeJs** using **MongoDB** as database.s.

## Features

- Basic Authentication (Register/Login with hashed password)
- JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
- Pre-defined response structures with proper status codes.
- **Clothes operation** example with **CRUD** operations.
- Validations added.
- Included API collection for Postman.
- Light-weight project.

## Software Requirements

- Node.js **8+**
- MongoDB **3.6+** (Recommended **4+**)

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "clothes-management" to your project name.

```bash
git clone https://github.com/shatrup/clothes-api.git ./clothes-management
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd clothes-management
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## Project structure

```sh
.
├── index.js
├── package.json
├── config
    └── connect.js
    └── key_path.js
    └── key_prod.js
    └── passport.js
├── images
├── routes
    └──api
       ├── lothesDetails.js
       └── user.js
├── schemans
     ├── Clothes.js
     ├── Users.js


```

## How to run

### Running API server locally

```bash
node index.js
```

```bash
DB Connected!
Server running at http://localhost:5000/

Press CTRL + C to stop the process.
```

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.

