# Choice of Database Management System

NodeJS/Express/Angular

# Status: accepted

# Context: 

Express is a library of sequential middlewares that run on a NodeJS server. This allows you to define your own API for the client to interface with. Mongoose is a node dependency that makes it very easy to add CRUD features that interact with MongoDB.

# Decision:

The NodeJs server and express are an extremely important part of the MEAN stack because they allow developers to easily define the API routes for the client to access. When the client makes a request at the specified route, a function happens based on the request and mongoose handles the database interaction from there.


# Consequences: 

Express, NodeJs, and Mongoose are all separate things that take time to learn, and then more time to learn how they interact in the overall picture. However, once it is running and you understand why, it's smooth sailing.