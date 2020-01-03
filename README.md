# contact-everywhere
Contact Everywhere, simple app for keep your contact list

# Link Deploy
* backend: https://afternoon-plains-30936.herokuapp.com
* frontend: http://contact-everywhere.didadadida93.xyz.s3-website-ap-southeast-1.amazonaws.com
> it is recommended to open frontend link with your smartphone or smaller display.

## Base URL
By default, base url is at `http://localhost:3000`

## Setting up environment
Make a file called `.env` and fill it with necessary environment such as:
* PORT
* JWT_SECRET

and put it on server folder

---
# Routes
#### `POST /login`

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `email type: String` **required**
* `password type: String` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>
}

// error
{
    "errors": [
        "Email or password is wrong"
    ]
}
```

#### `POST /register`

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `username type: String` **required**
* `email type: String` **required**
* `password type: String mininum 6 character` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>
}

// error
{
    "errors": [
        "Email already registered"
    ]
}
```

#### `GET /contacts`

Authenticate | Authorized
------- | ----------------
Yes  | No

response:
```js
// success
[
    {
        "id": <id>,
        "name": <name>,
        "phoneNumber": <phone number>,
        "UserId": <user id>,
        "createdAt": <created at>,
        "updatedAt": <updated at>
    }
]

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `POST /contacts`

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

body request :
* `name type: String` **required**
* `phoneNumber type: String` **required**

response :
```js
// success
{
  "id": <id>,
  "name": <name>,
  "phoneNumber": <phone number>,
  "UserId": <user id>,
  "createdAt": <created at>,
  "updatedAt": <updated at>
}

// error
{
    "errors": [
        "Contact name is required"
    ]
}
```

#### `PATCH /contacts/<:contactId>`

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `contactId type: String` **required**

body request:
* `name type: String`
* `phoneNumber type: String`

response :
```js
// success
{
  "id": <id>,
  "name": <name>,
  "phoneNumber": <phone number>,
  "UserId": <user id>,
  "createdAt": <created at>,
  "updatedAt": <updated at>
}

// error
{
    "errors": [
        "Contact not found"
    ]
}
```

#### `DELETE /contacts/<:contactId>`

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `contactId type: String` **required**

response :
```js
// success
{
    "message": "Success delete contact"
}

// error
{
    "errors": [
        "Contact not found"
    ]
}
```
