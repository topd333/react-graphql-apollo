# GraphQL Todo APP

Mutation example request
```
mutation {
  signup(
    email: "admin@admin.com"
    password: "password"
    username: "admin"
  ) {
    token
  }
}```

```
mutation {
  login(
    email: "admin@admin.com"
    password: "password"
  ) {
    token
    user {
      id
      username
      email
    }
  }
}```