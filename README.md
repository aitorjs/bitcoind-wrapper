# bitcoincli-wrapper

## Install
- ```git clone https://github.com/aitoribanez/bitcoincli-wrapper```
- ```cd bitcoincli-wrapper```
- ```npm install```
- ```npm run start```

## Make new user and get their JWT token
https://loopback.io/doc/en/lb4/Authentication-Tutorial.html#try-it-out

- POST /users
```
{
  "email": "user1@example.com",
  "password": "thel0ngp@55w0rd",
  "firstName": "User",
  "lastName": "One"
}
```
- POST /users/login
```
{
  "email": "user1@example.com",
  "password": "thel0ngp@55w0rd"
}
```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjdhMmZhNjIyODM3MjEzODI2YWE2YiIsIm5hbWUiOiJVc2VyIE9uZSIsImlhdCI6MTU3NzQ2MDE3MCwiZXhwIjoxNjM3NDYwMTcwfQ.hJko5UGN-TaS58JokZpWkyeeljt9LcuNG1BwRyaaMrU

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
