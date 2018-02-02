# phoneparser-js
Using Google libphonenumber with JS

This is a Node.js app that uses libhphonenumber library to parse phone numbers.  
Before you proceed, please ensure that you have downloaded and installed Node.js from nodejs.org.

# How to use

  - Download this repo
  - Navigate inside it with command-line, and install all the packages:
```ch
npm install
```  
- Run the server by typing:
```ch
npm run dev
```  
It should show you the following:  
![LAUNCH](https://i.imgur.com/iFG1uWI.png)


Now you can access the API endpoints. To do that, you can use Fiddler or Postman.
The screenshots below capture work process on Postman and results.

### GET
As of now, GET works only with one number.  
Url to test: localhost:8000/api/phonenumbers/parse/text/testparser+14445556677  
Make sure you have GET as request method and included "application/json" for "Content-Type" before sending request:
![GET](https://i.imgur.com/yYacb2t.png)

### POST
Url to test: localhost:8000/api/phonenumbers/parse/file  
Make POST as request method, change "Content-Type" to "multipart/form-data", and include the file before sending request:  
##### Header

![POST1](https://i.imgur.com/NOw0LGb.png)

##### Entity body
![POST2](https://i.imgur.com/JUkbvub.png)

### PDF Post Request
As of now, PDF POST works only with one number.  
Url to test: localhost:8000/api/phonenumbers/parse/pdf
Make sure to set POST as request method and included "multipart/form-data" for "Content-Type" before sending request:
![POST](https://i.imgur.com/Feqiwqf.png)


### TESTING
First, make sure your server is not running because it will prevent tests from running.  
Assuming you are still in the root of project, run this command:
```ch
npm test
```  
It will show you the following in the command-line:  
![TESTS](https://i.imgur.com/slSFfSf.png)

### ISSUES
Please navigate to Issues page at the top of repo.  
