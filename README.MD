# Nodejs & mongodb machine test
    create two api's in node js to insert and update user info. 
    Add Validation in API so that user cannot upload large image, MAX 2MB allowed.




# roughts:

## fetchuser            GET http://localhost:9001/api/fetchuser
    funtion             : fetch all users data
    input filds         : nothing
    output              : all user data 
## insertuser           POST http://localhost:9001/api/insertuser
    funtion             : insert user info with profile picture
    input filds         : name (str), email(str), phone_number (num), password (num), profileimage (JPGE,PNG,JPG file)
    output              : db result of insert document
## updateuser           PUT http://localhost:9001/api/updateuser
    funtion             : update user information
    input filds         : _id (objid str), name (str), email(str), phone_number (num), password (num),
    output              : success msg / error 
## updateprofuleimage   PUT http://localhost:9001/api/updateprofuleimage
    funtion             : update profile image
    input filds         : _id (objid str),  profileimage (JPGE,PNG,JPG file)
    output              : success msg / error 

