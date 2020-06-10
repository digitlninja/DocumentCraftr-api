
## Description

The Api for Keenious ReCraftr Application.

## Running the app

Run these commands from the project root folder.

1 - Build the docker image. 
```
$ docker build -t api .
```
2 - Run docker compose.
```
$ docker-compose build
```
3 - Spin up the container
```
$ docker-compose up
```

(Built with NestJS)

# NestJS Summary (and why I love it)
If you've not heard of it, NestJS is a Javascript and TypeScript framework which aims to make NodeJS application development significantly more powerful, secure, and cleaner.
I'd definitely suggest it for your upcoming apps.

Here's a few reasons.
- It better allows for many great principles SOLID principles without hacking away and "breaking it to work".
- Everything is abstracted, and it has many powerful features that allow loose coupling and many other powerful patterns that most JS developers aren't aware of, or don't put the effort into implementing.
- It has an extremely powerful CLI which enhances backend JS development.
- It helps developers to keep things more tidy if they choose (I've noticed many JS devs in my years don't know good patterns, practice or concepts of writing clean, elegant and maintainable code)
- It encourages TypeScript, which has become the standard for many top JS based startup's and companies who are wanting to build maintainable, scalable, clean and long-lasting software with JS.
- It allows for bleeding edge JS features.
- It allows for great OOP and FP.
- With my many years experience building microservices, I feel, it is MADE for microservices. Or any app of any size generally :D

Here's a good article on NEST : https://blog.logrocket.com/node-back-end-next-level-nestjs/

# * Note on Controllers
By default, NestJS Controllers (which receive requests), will catch any errors thrown and return a 500 or other error status code
They have a built in exception handling middleware.
So you may see in some instances I've not added any error handling. This is why.

# Other notes
- I've organised the code into domain-specific folders. (documents for documents and so forth)
- main.ts is the entry point that bootstraps the server.
- I've used interfaces to type and document all methods, data shapes and properties.
- DTOs are used to send only the data we want across the wire (for security).
- I'm using mongo with mongoose (it also supports postgres/sql).

Please shout if you have any questions :)