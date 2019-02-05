# Choice of Container Management

Docker

# Status: accepted

# Context: 

In order to better manage each part of the App, Docker Compose allows for the three separate parts to exist individually in containers that link/communicate with each other.

# Decision:

Docker containers are great because:

- Provides an easy way to store, organize, and share code during development.
- Lightweight compared to Virtual Machines.
- Makes deployment and shipping code a breeze with cloud container hosting. 



# Consequences: 

Because Docker is lightweight and doesn't provide an entire operating system, it is more limited than a virtual machine.