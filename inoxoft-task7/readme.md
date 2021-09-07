# InoXoft Task-7

### Use jwt, 2 tokens auth, roles (admin|user), deleting all tokens when delete user || update user, create first Admin when server starting 

1. Methods: 
- create, get all, get one by id/login/email, delete, update;
2. Models/schema:
- users (admin & user role)
- buildings (includs [flats_id's])
- *almost RELISED (no validation by body and delete method)!!! -- > flats (includs [users_id's], [building_id])
- user-model response to user without pass (used custom class Users)
- oauth (tokenization, with user_id)
3. Routes:
- /
- auth/login|loginout|refresh
- users/, users/user_id
- buildings/, buildings/building_id
- flats/, flats/flat_id 

```

```

### Download PR `inoxoft-course` from git to your PC and unzip folder `inoxoft-task7`, rename file `.env.example` to `.env` !!!

```

```

### Install app
```
npm install
```

### Run app
```
npm run start-n || node src/server.js
```

### Run app with pm2 & watch active
```
npm start
```

### Check in Postman (use tokens!!!)
```
1.1. download postman for teesting CRUD methods: https://www.postman.com/downloads/
1.2. server response: 'http://localhost:5000'

*look src/resources/routers for admin or user access below (using tokens), 
**'get user by id' or 'update user' can only Admin or User with the same Id

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
4.1. flats ((list of all flats): 'http://localhost:5000/flats' use get method)
4.2. one flat: 'http://localhost:5000/flats/flat_id' use get method
4.3. create flat: 'http://localhost:5000/flats' use post method with json format
4.4. update flat: 'http://localhost:5000/flats/flat_id' use patch method (if you change owners, leave old(if they still) and/or add/write new some)
// * not relised yet! 3.5. delete building: 'http://localhost:5000/flats/flat_id' use delete method
5.1. login: 'http://localhost:5000/auth/login' use post method (with login as 'email', password)
5.2. loginout: 'http://localhost:5000/auth/login' use post method (with access_token)
5.3. refresh: 'http://localhost:5000/auth/login' use post method (with refresh_token)
5.4. register: 'http://localhost:5000/auth/signup' use post method (with body data)
```
