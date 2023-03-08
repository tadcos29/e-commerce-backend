# E-Commerce Back End - Object Relational Mapping

## Introduction and Purpose:

With a view to the ubiquity and commercial importance of e-commerce, I used this bootcamp exercise as an opportunity to familiarise myself with the typical architecture of the back-end for retail website. I used Sequelize to construct the classes corresponding to database tables and configured Express.js routes to enable interaction with a database of information related to a collection of merchandise. 

## Scenario:

A fictional manager at an internet retail company desires a back end for their e-commerce website that uses the latest technologies, so that their company can compete with other e-commerce companies.

## Results and Technical Overview:

### Usage Video 

[Google drive link](https://drive.google.com/file/d/1jZASIwjyZur547EZy7F78M9Dp87rDZEF/view). Please view at full screen for best results.

## Installation

`npm i` to install the application.

Please modify the environment variables in .env as appropriate to access the ecommerce_db database.

`db/schema.sql` initialises the database in the MySQL shell if required.

`npm run seed` will seed the database with product data.

`npm start` will sync Sequelise with the database and launch the server.

## Functionality

The backend is constructed around four classes extending the Sequelize Model class. The classes represent: product categories, which have a one-to-many relationship with products; products, each of which belongs to only one category but  can be linked to multiple tags; and tags, each of which can be associated with multiple products. The class ProductTag acts as a bridging class between products and tags, enabling a smooth many-to-many relationship.

![image](https://user-images.githubusercontent.com/121476474/221408267-0e23424d-9563-4b55-a942-861146e8d0eb.png)

Categories, products and tags have API routes set up in order to enable RESTful CRUD Operations. Each of the routers for the three models has been fitted with endpoints for retrieval of all entries, single entries by id, creation of new entries, modification of existing entries by id, and deletion of existing entries by id.

### Example: Product creation in Insomnia.

![image](https://user-images.githubusercontent.com/121476474/221408447-126f2c95-ac7a-4c9a-be0b-d1ed9e59345d.png)


## Testing and Dependencies

This project uses dotenv for environmental variable control. If cloning, please modify and rename the supplied .env.GENERIC file.

This project uses [Express.js](https://expressjs.com/) for connectivity, [mysql2](https://www.npmjs.com/package/mysql2) for node.js access to the MySQL database, and [Sequelize](https://sequelize.org/) as the Object Relational Mapping tool.
