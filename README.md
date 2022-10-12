# BookSpace

Web app uses Google-books API  allow users to search their books and categorize their Books and keep tracks of their readings , By putting books into 3 diffrent categories which are :
- Read
- Want to Read
- Currently reading

# Screenshots

![App Screenshot](/screenshots/homepage.png)




![App Screenshot](/screenshots/search.png)


![App Screenshot](/screenshots/shelve.png)

![App Screenshot](/screenshots/bookView.png)





# Distinctiveness and Complexity
In an attempt to distinguish this project from the previous course PSETS,  I had to take another Course to learn  React. the course is [FullStackOpen](https://fullstackopen.com/en/about) Which took a couple of weeks , then I had to study RESTFUL API so I used books to learn [Django-Rest-Framework](https://www.django-rest-framework.org/)


and at the end the Tech Stack is :

**Client:**  React, Redux, ReduxToolKit

**Server:**  Django, Django-rest-framework







# Server
the project has 2 apps on the backend and they are:
- users
- books

# Users

## Users API

#### Login users and genrate Tokens

```http
  POST /users/login
```

#### Register new users

```http
  POST /users/register
```

#### Logout and Destroy the token


```http
  POST /users/logout
```



## Users Models.py
 the project used Django built-in model to handle users



# Books
## Books API
List all the books in the DB
```http
  GET  /books-api/books
```
Add a new book to the DB
```http
  POST  /books-api/books
```
List  info  about one book 
```http
  GET  /books-api/books/{book_id}
```
Delete  one book 
```http
  DELETE  /books-api/books/{book_id}
```

CRUD of Comments for each Book
```http
    /v1-comments/{book_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `book_id`      | `string` | **Required**. Id of book to fetch |

## Books Models.py
The books app used two models: 
- BooksAdded 
- Comments

## BooksAdded 
Keep track of each Book and the user who added it , and prevent the user from adding the book twice , this model save some data that was sent  from Google-books-API

## Comments 
Keep track of each book comments, Though the project dose not save the nested comments, the neseted comments were made in the frontend


## Books Views.py
The project used Class based views and functions based views, the function based views gave more flexibility and was needed for hanlding errors in the nested models


# Client
The frontend used React framework and handled the state management of the app using Redux and Redux toolkit

## Frontend Style

The style was made with [React-Bootstrap](https://react-bootstrap.github.io/) and [MUI](https://mui.com/system/flexbox/)

## Folders of the client
- Componets : Which has 17 files that are used to render the data
- hooks
-  Reducers: That handle the dispatching calls to the server and fetching the data
- Services: Folder that contain all the API that are used in this project

## Features

- Add/Delete/update your Books into diffrent categories
- Add review to books and share your thought with diffrent users
- Reply to other users comment


# Run locally
Clone the project

```bash
  git clone https://github.com/Zayd123mouses/bookspace-django-backend.git
```

Go to the project directory

```bash
  cd bookspace-django-backend
```

Install requirements

```bash
  pip3 install -r requirements.txt 
```
Install dependencies

```bash
cd src
npm install
```

Start the server

```bash
  cd .. 
  python3 manage.py runserver
```

# contributors
This project was made by a 2 developers, [Zayd](https://github.com/Zayd123mouses) and [Pablo](https://github.com/pablo-maff)

Because [Pablo](https://github.com/pablo-maff)  Have no experience in Python and django 
The contribution was as follows:

- Zayd would make the backend 
- Zayd and Pablo would do the frontend functions and state management
- Pablo would take care of  styling  the project

# Demo

https://django-api-bookspace.herokuapp.com/




# Inspired by

This is project was inspired by :
- [GoodReads](https://www.goodreads.com/)



