# URL Shortner API

A minimal URL shortner. feel free to use this as server side of your application.

**API Documentation - [Docs](https://sho-rt-api.herokuapp.com/swagger-ui/)**

You can:
  - shorten urls
  - access shortened urls

 
<!-- 
## ToDO 
  - write tests
  - Deploy
  - swagger-ui for API documentation 
-->

## Built With


* [NodeJS](https://nodejs.org/en/docs/) -  evented I/O for the backend
* [Express](https://expressjs.com/) - framework for backend
* [Mongoose](https://mongoosejs.com/) - ODM
* [MongoDB](https://www.mongodb.com/) - Database
* [Swagger](https://swagger.io/) - API Documentation


## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

you need to have NodeJs and MogoDb installed on your local machine.



### Installation

To install NodeJs 12.xx and MongoDb 4.x

```sh
$ chmod +x install.sh
$ ./install.sh
```

Install dependencies 

```sh
$ npm install
```

Set up environment variables 

```sh
$ cp .env.template .env
```
### Local Run

Provide correct values in .env and proceed with local run 

```sh
$ npm start
```
<!--
## Testing
-->
## Deployment

Heroku Deployment

```sh
$ heroku login -i
$ heroku git:remote -a <your-app-name>
$ git push heroku master
```
Set up environment variables 

```sh
$ heroku config:set ENV_VAR=<value>
```

## Authors

* **Harsh Vardhan** - *Initial work* - [desert3agle](https://github.com/desert3agle)











