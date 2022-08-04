# Project Details
This is an MVP for the blog I’m planning to build. I wanna use this blog to share my stories, experiences and thoughts. This version is just to test the real time functionality of votes.

>**Tech Stack :**<br>
>Hosting: **[Digital Ocean](), [Github Pages]()** <br>
>Backend: **[Node.JS](), [Express.JS](), [Typescript]()**<br>
>Client: **[Vanilla JS](), [SASS](), [React](), [Typescript](), [Vite JS]()**<br>
>Testing: **[Jest]()**<br>
>Database: **[Mongo DB]()**<br>
>CI CD: **[Github actions]()**<br>
>Libraries: **[Axios](), [Mongoose](), [Pusher](), [@slack/web-api]()**<br>
>Version: **1.0**<br>



<!-- GETTING STARTED -->
## Run Locally


### Client Installation

1. Clone the repo
   ```sh
   git clone tsriramaraju/project-spooky
    ```
2. Go to client directory
   ```sh
   cd project-spooky/client
    ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start dev server
   ```sh
   npm run dev
   ```
### Server Installation
To run this project, you will need to add the following environment variables to your .env file in server

`PORT`,   `MONGO_URL`, ` SLACK_SECRET`, `PUSHER_KEY`, `PUSHER_APP_ID`, `PUSHER_SECRET`

1. Clone the repo
   ```sh
   git clone tsriramaraju/project-spooky
    ```
2. Go to server directory
   ```sh
   cd project-spooky/server
    ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Add required environment variables as .env file
   ```sh
   cd project-spooky/server
    ```
5. Start dev server
   ```sh
   npm run dev
   ```
## Running Tests in server

To run tests, run the following command in the server directory

```bash
  npm run test
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>



# Server Documentation


## API       Ref:

The following are the rest api endpoints for the URL
>[storzey.com/api/v1/](https://storzey.com/)

<br>


### **Comments** Related API
|        Name         | Type  | Privacy | End point                     |   Payload    |   Response    |
| :-----------------: | :---: | :-----: | :---------------------------- | :----------: | :-----------: |
|   Create Comment    | POST  | Public  | /comments                     | CommentAttrs |  comment Id   |
|    Get Comments     |  GET  | Public  | /comments                     |              | CommentsDoc[] |
| Toggle Comment Vote |  PUT  | Public  | /comments/:id                 |    userId    |    Boolean    |
|  Toggle Reply Vote  |  PUT  | Public  | /comments/:commentId/:replyId |    userId    |    Boolean    |
|      Add Reply      | POST  | Public  | /comments/:id                 |  ReplyAttrs  |   reply Id    |

<br>


---
---

## Common **Error messages** and **Status codes**

Every error JSON response consists of same format.

```Typescript
{
      msg:string;
      errors?:{field:string,message:string}[]

}

```

| Status codes |        Error Type         |
| :----------: | :-----------------------: |
|     307      |       Temp Redirect       |
|     400      |        Bad Request        |
|     404      |         Not found         |
|     418      |        Validation         |
|     419      |     Tampered Request      |
|     420      |    Resource Not found     |
|     500      |       Server error        |
|     520      | Database Connection error |

>Unfounded routes are redirected to a common error page.


## Feedback

If you have any feedback, please reach out to us at tsriramaraju@gmail.com
