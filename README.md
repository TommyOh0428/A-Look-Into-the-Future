# A Look Into the Future

## Project Website
Our project has been deployed through Netlify and can be accessed through the following link:

https://656c055da033a5000997fc59--a-look-into-the-future-project.netlify.app/

## Table of Contents
### Collaborators
### Overview of the project
### General technologies used
### How to run the project locally
### API Reference
### Testing


## Collaborators

- Tommy Oh : koa18@sfu.ca
- Navid Ahmed: naa54@sfu.ca
- Abdurisaq Heban: Ahh8@sfu.ca
- Uros: kka143@sfu.ca

## Overview of the project

This project is designed to be a valuable tool for individuals seeking to schedule events in their calendar, particularly those dependent on weather conditions. The application offers the capability to view weather forecasts for specific dates, thereby assisting in the planning of such events. Additionally, it caters to preferences for conducting activities during daylight by providing information on sunrise and sunset times. A unique feature of this application is its ability to retrieve historical weather data, offering insights into weather conditions for past events. Moreover, it enhances user experience by enabling the setting of reminders for forthcoming events, ensuring efficient and effective event management.


## General technologies used
For this project, our group has used React.js as the main framework for the front-end development and used Jest for unit testing and integration testing. For our deployment, we used Netlify to deploy our project.
## How to run the project locally

1. Clone the repository
2. Install the dependencies and compile the project
```bash
//to install the dependencies
npm install

//to run the project
npm start
```

## API Reference
For the weather data, we used openweather API to receive the current weather data and displayed in weather component.
For Calender component, we used Google Calendar API to create events and display them in the calendar both in the website and Google Calendar itself. We also used Supabase to manage Login and Logout and integrate with the calendar component.

## Testing