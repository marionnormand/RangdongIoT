# app_RangDong

RangdongIot is a friendly application which can manage Led of ESP32. 

You can use the link to get the application : 

## Features 

Each Leds are save in a database with his name, an id (from 1 to 8) and his status (on or off). The user can manage this database by doing several things : 
    - Get all datas in a scroll view 
    - Filter datas with all field 
    - Modifie datas 
    - Delete datas 
    - Create new data 
    - Change state of led in breadbord 

In this app, you have to log in, or sign up if you don't have an account. When you sign up, you have to create an account with a unique email and username, if they are already use your account won't be validate. 
When you create a new user, an email will be sent with a code of 6 numbers and you have to fill it in the app. This is the same thing when you forget your password. 

An edit page is here to inform some informations about you like your gender or your birthdate, these are stocked in database. Then, you can choose a picture for your app but this one won't be in the database. 

Each Leds can be manage by socket.io and we have used API to manage database. 


## Installation 

To clone this repository : 
```
git clone https://github.com/marionnormand/RangdongIoT.git
```

Then, enter in the app development's folder : 
```
cd RangdongIot 
```
 
To install depedencies : 
```
npm install
```

To start application : 
```
npx expo start
```

To deploy app in your android : 
```
eas build --platform android
eas build:configure
eas build -p android --profile preview
```

