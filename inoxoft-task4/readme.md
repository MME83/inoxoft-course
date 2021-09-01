# InoXoft Task-4/5

### Create CRUD methods with entities (users & flats) using mongoDB + middlewares, checking requests, using constants and JOI validation

1. Methods: 
- create, get all, get one by id/login/email, delete, update;
2. Models/schema:
- users (admin & user role)
- buildings (includs [flats_id's])
- flats (includs [users_id's], [building_id])
- user-model response to user without pass (used custom class Users)
- auth (login and signUP/register)

```

```

### Download PR `inoxoft-course` from git to your PC and unzip folder `inoxoft-task4` !!!

### Install app
```
npm install
```

### Run app
```
npm start or node src/server.js
```

### Check in Postman
```
1. download postman for teesting CRUD methods: https://www.postman.com/downloads/
2. server response: 'http://localhost:5000'
3. users (list of all users): 'http://localhost:5000/users' use get method  
4. one user: 'http://localhost:5000/users/user_id' use get method
5. create user: 'http://localhost:5000/users' use post method with json format
6. delete user: 'http://localhost:5000/users/user_id' use post method
7. update user: 'http://localhost:5000/users/user_id' use post method
```
