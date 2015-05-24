A protoype of an AngularJS application using a nodeJS proxy-server

How it works :

1. App send request to the proxy server
2. The proxy server handle the request and send another request to the Google API servers
3. The proxy server receive the response from the Google servers
4. The proxy server respond to the original request from the App and send the answer with the data

How to use :

-clone this repository
-navigate to the repository folder
-install nodeJS and npm
-install express module for Node :  npm install express --save
-open the browser and navigate to address : http://localhost:8080