# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
![](Project%20diagram.png)
#### Products
- Index 
- Show
- Create [token required]
- Update [token required]
- Delete (destroy) [token required]

#### Users
- Index [token required]
- Show [token required]
- Create 
- Update [token required]
- Delete (destroy) [token required]
- Authenticate

#### Orders
- Index [token required]
- Show [token required]
- Create [token required]
- Delete (destroy) [token required]

## Data Shapes
![](Database%20diagram.png)

#### product
| Column Name | Type        |
|-------------|-------------|
| id          | SERIAL PRIMARY  KEY |
| product_name          | VARCHAR(100) |
| price          | numeric(19,4) |


#### user
| Column Name | Type        |
|-------------|-------------|
| id          | SERIAL PRIMARY  KEY |
| full_name          | VARCHAR(150) |
| password          | VARCHAR(450) |


#### orders
| Column Name | Type        |
|-------------|-------------|
| id          | SERIAL PRIMARY  KEY |
| total          | numeric(19,4) |
| user_id          | integer FOREIGN KEY (users) |


#### orders_products
| Column Name | Type        |
|-------------|-------------|
| id          | SERIAL PRIMARY  KEY |
| order_id          | integer FOREIGN KEY (orders) |
| product_id          | integer FOREIGN KEY (products) |
| quantity          | integer |
| price          | numeric(19,4) |
| total_price          | numeric(19,4) |
