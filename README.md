## API endpoints:

`/api` - API endpoint for server
   
   - `/auth` - Auth Endpoints
   
     - `/register` - [POST] Registration endpoint (`/api/auth/register`)
     - `/login` - [POST] Login Endpoint (`/api/auth/login`)
     - `/refresh` - [POST] Refresh Token endpoint (`/api/auth/refresh`)
     - `/send-password-reset` - [POST] Password request send to email endpoint (`/api/auth/send-password-reset`)
     - `/reset-password` - [POST] Password reset endpoint (`/api/auth/reset-password`)

   - `/user` User level endpoints
     
     - `/blog` - All blog level routing (`/api/user/blog`)
        
        - GET = See all blogs that belongs to the user
        - POST = Add new blog
        - DELETE = Remove a blog 

   - `/admin` Admin level endpoints
     
     - `/blog` - All blog level routing (`/api/admin/blog`)
        
        - GET = See all blogs
        - POST = Add new blog
        - DELETE = Remove a blog 




## Used Libraries:

1. Express - Express Node App
2. body-parser - Used to **parse the express request** and put that in req.body
3. compression - Used to compress the response to **gzip**
4. cors - Used to enable the **Cross Origin Resourse sharing (CORS)**
5. helmet - Used to add the **proper html headers**
6. dotenv-safe - Used to safly use the **.env file** for Environemtn variables
7. mongoose - Used as the ***Mongo-DB*** client
8. morgan - Used to **log the http requests**
9. passport - Used as the **Authentication library**
10. passport-jwt - Used to add the **passport JWT stategy**
11. passport-local - Used to add the  **passport local stategy**
12. winston - Used as the **log provider**
13. http-status - Used to response **http status easily**
14. express-validation - Used to **validate http request data**
15. joi - Used to **Validate data**
16. argon2 - Used to **hash passwords**
17. moment - Used to **manipulate dates**
18. jwt-simple - Used for **JWT**
19. lodash - Used to **manipulate array and objects**
20. crypto - Used to **genarate crypto keys**
21. bluebild - Used to **make *Promise* more powerful**

## Dev library:
1. nodemon - Used to track the changes and refresh the dev