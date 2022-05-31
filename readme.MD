# mern-stack-example
Template for building community resource-based web apps with Google Cloud's APIs by [The Holistic Technologist](https://holistictech.io/blog)

Revised code from Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run
Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/<databaseName>?retryWrites=true&w=majority
PORT=5000
```

Add your Google Cloud API Key in `mern/client/.env.development` and `mern/client/.env.production`
```
REACT_APP_GOOGLE_API_KEY = <api key>
```

Start server:
```
cd mern/server
npm install
npm start
```

Start Web server
```
cd mern/client
npm install
npm start
```

## Disclaimer
This is meant as a tutorial for using Google Cloud's APIs. For real-world use, use at your own risk and ensure security for both yourself and the user's data. 