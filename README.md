# app_RangDong

RangdongIot is a friendly application which can fix RangDong's database. This database have all equipment saved and their state. 

You can use the link to get the application : 

## Features 

    - Get all datas 
    - Modifie datas 
    - Delete datas 
    - Create new data 
    - Change state of led in breadbord 

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

