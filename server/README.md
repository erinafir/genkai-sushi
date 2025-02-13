[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15319394&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Genkai Sushi API Documentation

## Endpoints

List of available endpoints:

- `POST /login`
- `GET /pub/cuisines`
- `GET /pub/cuisines/:id`

And routes below need authentication

- `POST /cuisines`
- `GET /cuisines`
- `GET /cuisines/:id`
- `POST /categories`
- `GET /categories`

And routes below need authorization

> The request user role should be 'admin' or should match with Cuisine.authorId

- `PUT /cuisines/:id/edit`
- `DELETE /cuisines/:id/edit`
- `PATCH /cuisines/:id/changeImg`
- `PUT /categories/:id/edit`
- `DELETE /categories/:id/delete`

> The request user role should be 'admin'

- `POST /add-user`

## 1. POST /cuisines

Request:

- body:

```json
{
  "name": "string (required)",
  "description": "string (required)",
  "price": "integer (required)",
  "imgUrl": "string (required)",
  "categoryId": "integer (required)",
  "authorId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Cuisine name cannot be empty"
}
OR
{
  "message": "Description cannot be empty"
}
OR
{
  "message": "Price cannot be empty"
}
OR
{
  "message": "Minimum price is 10000"
}
OR
{
  "message": "Image URL cannot be empty"
}
OR
{
  "message": "Category ID cannot be empty"
}
OR
{
  "message": "User ID cannot be empty"
}
```

&nbsp;

## 2. GET /cuisines

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
      "name": "string",
      "description": "string",
      "price": "integer",
      "imgUrl":
        "string",
      "categoryId": "integer",
      "authorId": "integer"
    },
    {
      "name": "string",
      "description": "string",
      "price": "integer",
      "imgUrl":
        "string",
      "categoryId": "integer",
      "authorId": "integer"
    }
  ...,
]
```

&nbsp;

## 3. GET /cuisines/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 4. PUT /cuisines/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Cuisine name cannot be empty"
}
OR
{
  "message": "Description cannot be empty"
}
OR
{
  "message": "Price cannot be empty"
}
OR
{
  "message": "Minimum price is 10000"
}
OR
{
  "message": "Image URL cannot be empty"
}
OR
{
  "message": "Category ID cannot be empty"
}
OR
{
  "message": "User ID cannot be empty"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. DELETE /cuisines/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 6. POST /categories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "name": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Category name cannot be empty"
}
```

&nbsp;

## 7. GET /categories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
      "name": "string"
    },
    {
      "name": "string"
    }
  ...,
]
```

&nbsp;

## 8. PUT /categories/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Category name cannot be empty"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 9. DELETE /categories/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 10. GET /pub/cuisines

- query:

```json
{
  "filter": "integer"
}
OR
{
  "search": "string"
}
OR
{
  "sort": "string"
}
OR
{
  "page": {
    "size": "integer",
    "number": "integer"
  }
}
```

_Response (200 - OK)_

```json
{
  "count": 20,
  "rows": [
  {
      "name": "string",
      "description": "string",
      "price": "integer",
      "imgUrl":
        "string",
      "categoryId": "integer",
      "authorId": "integer"
    },
    {
      "name": "string",
      "description": "string",
      "price": "integer",
      "imgUrl":
        "string",
      "categoryId": "integer",
      "authorId": "integer"
    }
  ...,
  ]
}
```

&nbsp;

## 11. GET /pub/cuisines/:id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 12. PATCH /cuisines/:id/changeImg

Request:

- headers:

```json
{
  "access_token": "string",
  "Content-Type": "multipart/form-data"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "imgUrl": "image file"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Image URL cannot be empty"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
