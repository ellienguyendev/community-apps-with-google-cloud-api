# MERN & Google Maps API Template

Template for building community resource web-apps with Google Maps APIs by [The Holistic Technologist](https://holistictech.io/building-community-resource-web-applications-with-google-maps-api)

Revised code from Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## Description of App
![alt tag](app-gif.gif)
Users can enter their location and see resources in their area / within a specified radius pinned on a map. They can click on each pin to view the resource and also filter by resource type / categories.

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
