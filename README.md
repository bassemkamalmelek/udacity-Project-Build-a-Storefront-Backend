# Storefront Backend Project

## Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Basic Main Informations
1. **Host** : 127.0.0.1
2. **Server Port** : 3000
3. **Database Port** :5432 , change it in **.ENV** file as your PostgreSQL configurations. :wink:
4. **Database Username** : change it in **.ENV** file as your PostgreSQL configurations. :wink:
5. **Database Name** :  change it in **.ENV** file after creating it using **/createdb/{database-name}**. [here how to setup the Database.](#3--create-dev--test-database).
6. **Testing Database Name** : change it in **.ENV** file after creating it using **/createdb/{database-name}**. [here how to setup the Database.](#3--create-dev--test-database).

## Database diagram

![](Database%20diagram.png)

## Project diagram
![](Project%20diagram.png)

## Getting Started
### 1- Install the requird packages
```node
npm install
```
### 2- Run the project
```node
npm run bstart
```
*this command will build and run the Project.*
### 3- Setup and connect the Database
#### First, Set these .env Variables:
* **INIT_USER=postgres** (the default user)
* **INIT_PASSWORD=123** (the Init Password)
* **POSTGRES_PORT=5432**
* **POSTGRES_DB=store** (the Name of the Dev database that we will create it)
* **POSTGRES_TEST_DB=store_test** (the Name of the Test database that we will create it)
* **POSTGRES_USER=magic** (the Name of the User that we will create it)
* **POSTGRES_PASSWORD=123** (the Password that we will create it)

#### Second, Create User and setup the database

create the User, dev and test databases using this request: `{host}:{Server Port}/setupdb`

#### Finally, Create/Migrate the tables
run this command `db-migrate up` to create and migirate the Database tables.



## User Module

### 1. Add new user
`{host}:{Server Port}/users` **[POST]**, Body must have the Full name and Password in Json Content Like
```json
{"full_name": "Jessy Molen", "password": "323"}
```

### 2. Authentication/ Login
`{host}:{Server Port}/authenticate` **[GET]**, Body must have the Full name and Password in Json Content Like
```json
{"full_name": "Jessy Molen", "password": "323"}
```
the response will contains the token like this, 
```json
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg"
```
##### ##----ALL others request must contains this token----##


### 3. Retrieve all user
`{host}:{Server Port}/users` **[GET]**
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
the response will appear in JSON form
```json
[
  {
    "id": 21,
    "full_name": "adf",
    "password": "$2b$10$bE7nNd36zXHtvRXph3xAEefTxwPr7YOialmGPI2VK/mG1CR7SbETW"
  },
  {
    "id": 22,
    "full_name": "Jessy Molen",
    "password": "$2b$10$g1K0Mphgi1FUx18y4ItIfuFMPVBE5b.L1AZYR5plnJBYgslnov6UG"
  },
  {
    "id": 23,
    "full_name": "Bassem",
    "password": "$2b$10$a1uCgTWysby5ffp03SU2h.HiRh9oVqoIKhxjSyLmUlmF0r6LpopuS"
  },
  {
    "id": 24,
    "full_name": "Jessy",
    "password": "$2b$10$o61cLfvVjlMN05.zsAHvC.zZzWNcxM96dky0/GrNzVFcHXiWp5o2y"
  }
]
```

### 4. Get one user data
`{host}:{Server Port}/users/:id` **[GET]**
:id = user id ex: 22, Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
the response will appear in JSON form
```json
{
  "id": 22,
  "full_name": "Jessy Molen",
  "password": "$2b$10$g1K0Mphgi1FUx18y4ItIfuFMPVBE5b.L1AZYR5plnJBYgslnov6UG"
}
```

### 5. Update user data
`{host}:{Server Port}/users/:id` **[POST]**
:id = user id ex:- 22, Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
And also, Body must have the Full name and Password in Json Content Like
```json
{"full_name": "Jessy Molen", "password": "323"}
```

the response will appear in JSON form
```json
{
  "id": 22,
  "full_name": "Jessy Molen",
  "password": "$2b$10$g1K0Mphgi1FUx18y4ItIfuFMPVBE5b.L1AZYR5plnJBYgslnov6UG"
}
```

### 6. Delete user
`{host}:{Server Port}/users/` **[DELETE]**
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

And also, Body must have the ID in Json Content Like
```json
{"id": 22}
```

the response will appear in JSON form
```json
{
  "id": 22,
  "full_name": "Jessy Molen",
  "password": "$2b$10$g1K0Mphgi1FUx18y4ItIfuFMPVBE5b.L1AZYR5plnJBYgslnov6UG"
}
```

## Product Module

### 1. Add new Product
`{host}:{Server Port}/products` **[POST]**, Body must have the Product name and Price in Json Content Like
```json
{  "product_name": "Tea",
    "price": "20.000"
}
```
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

the response will appears like this, 
```json
{
  "id": 25,
  "product_name": "Tea",
  "price": "20.0000"
}
```

### 2. Update Product
`{host}:{Server Port}/products/:id` **[POST]**, :id=> 25 Body must have the Product name and Price in Json Content Like
```json
{  "product_name": "Tea Pack",
    "price": "20.000"
}
```
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

the response will appears like this, 
```json
{
  "id": 25,
  "product_name": "Tea Pack",
  "price": "20.0000"
}
```

### 3. Retrieve all Products
`{host}:{Server Port}/products` **[GET]**
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
the response will appear in JSON form
```json
[
  {
    "id": 24,
    "product_name": "Milk Pack",
    "price": "20.0000"
  },
  {
    "id": 25,
    "product_name": "Tea Pack",
    "price": "20.0000"
  },
]
```

### 4. Get one product data
`{host}:{Server Port}/products/:id` **[GET]**
:id = user id ex: 25, Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
the response will appear in JSON form
```json
{
  "id": 25,
  "product_name": "Tea Pack",
  "price": "20.0000"
}
```

### 5. Delete Product
`{host}:{Server Port}/products/` **[DELETE]**
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

And also, Body must have the ID in Json Content Like
```json
{"id": 22}
```

the response will appear in JSON form
```json
{
  "id": 22,
  "product_name": "Tea",
  "price": "20.0000"
}
```

## Order Module

### 1. Add new Order
`{host}:{Server Port}/orders` **[POST]**, Body must have the Total and Exist User ID in Json Content Like
```json
{
  "total": "20.0000",
  "user_id": "23"
}
```
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

the response will appears like this, 
```json
{
  "id": 2,
  "total": "20.0000",
  "user_id": 23
}
```

### 1. Add Product to Order
`{host}:{Server Port}/orders/2/products` **[POST]**, where order id = 2, Body must have this vars
```json
{
  "quantity": "1",
  "product_id": "25",
  "price": "20",
  "total": "20"
}
```
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

the response will appears like this, 
```json
{
  "id": 3,
  "order_id": 2,
  "product_id": 25,
  "quantity": 1,
  "price": "20",
  "total_price": "20"
}
```

### 3. Retrieve all Orders
`{host}:{Server Port}/orders` **[GET]**
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
the response will appear in JSON form
```json
[
  
  {
    "id": 1,
    "total": "200.0000",
    "user_id": 9
  },
  {
    "id": 2,
    "total": "20.0000",
    "user_id": 23
  }

]
```

### 4. Get one order data
`{host}:{Server Port}/orders/:id` **[GET]**
:id = user id ex: 1, Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```
the response will appear in JSON form
```json
{
  "id": 1,
  "total": "200.0000",
  "user_id": 9
}
```

### 5. Delete order
`{host}:{Server Port}/products/` **[DELETE]**
Auth.Bearer Token must contains the token like this, 
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aCI6eyJpZCI6MjQsImZ1bGxfbmFtZSI6Ikplc3N5IiwicGFzc3dvcmQiOiIkMmIkMTAkbzYxY0xmdlZqbE1OMDUuenNBSHZDLnpaeldOY3hNOTZka3kwL0dyTnpWRmNIWGlXcDVvMnkifSwiaWF0IjoxNjU0MzUxMjYzfQ.Ri1MHQApdyaGXivBxlGXNawMgyj5_lplOf1c79Fy3lg
```

And also, Body must have the ID in Json Content Like
```json
{"id": "1"}
```

the response will appear in JSON form
```json
{
  "id": 1,
  "total": "200.0000",
  "user_id": 9
}
```