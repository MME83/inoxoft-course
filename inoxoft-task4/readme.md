# InoXoft Task-4/5

### Create CRUD methods with entities (users & flats) using mongoDB + middlewares, checking requests, using constants and JOI validation

1. Methods: 
- create, get all, get one by id/login/email, delete, update;
2. Models/schema:
- users (admin & user role)
- buildings (includs [flats_id's])
- NOT RELISED YET!!! -- > flats (includs [users_id's], [building_id])
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
1.1. download postman for teesting CRUD methods: https://www.postman.com/downloads/
1.2. server response: 'http://localhost:5000'

2.1. users (list of all users): 'http://localhost:5000/users' use get method  
2.2. one user: 'http://localhost:5000/users/user_id' use get method
2.3. create user: 'http://localhost:5000/users' use post method with json format
2.4. delete user: 'http://localhost:5000/users/user_id' use delete method
2.5. update user: 'http://localhost:5000/users/user_id' use patch method

3.1. buildings ((list of all buildings): 'http://localhost:5000/buildings' use get method)
3.2. one building: 'http://localhost:5000/buildings/building_id' use get method
3.3. create building: 'http://localhost:5000/buildings' use post method with json format
3.4. update building: 'http://localhost:5000/buildings/building_id' use patch method
3.5. delete building: 'http://localhost:5000/buildings/building_id' use delete method

4.1. login: 'http://localhost:5000/auth/login' use post method (us login as 'email', password)
4.2. register: 'http://localhost:5000/auth/signup' use post method
```



