# InoXoft Task-3

### Create create auth and users endpoints, create file db with users: {name, age, login, password}

1. auth: check login and password for login, return if user created or exist in DB  
2. users: get all users, get one user by login (email), create new user
3. db file: in json format.

``` 

```

### Download PR `inoxoft-course` from git to your PC and unzip folder `inoxoft-task3` !!!

### Install app
```
npm install
```

### Run app
```
npm start or node server.js
```

### Check in Postman
```
1. download postman: https://www.postman.com/downloads/
2. server response: 'http://localhost:5000'
3. auth login: 'http://localhost:5000/auth'  use post method with body { login : login@login.com, password : pass}
4. users (list of all users): 'http://localhost:5000/users' use get method  
5. one user: 'http://localhost:5000/users/user_login' use get method
6. create user: 'http://localhost:5000/users' use post method with json format
```
