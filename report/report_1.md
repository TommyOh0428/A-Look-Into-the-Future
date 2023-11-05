# CMPT 276 Project report 1

## Overview of the project
- This project is designed to be a valuable tool for individuals seeking to schedule events in their calendar, particularly those dependent on weather conditions. The application offers the capability to view weather forecasts for specific dates, thereby assisting in the planning of such events. Additionally, it caters to preferences for conducting activities during daylight by providing information on sunrise and sunset times. A unique feature of this application is its ability to retrieve historical weather data, offering insights into weather conditions for past events. Moreover, it enhances user experience by enabling the setting of reminders for forthcoming events, ensuring efficient and effective event management.
## SDLC model
- Our group chose to use Agile (Kanban) as our SDLC model. Our group will use GitHub Kanban for our workflow and since we do not have any feedback from the customer, it will be beneficial for us to use Agile as our SDLC model. Also most of the industry standard uses Agile as their SDLC model, it will be great practice for us to adapt agile SDLC features.
## General tech stack
- Frontend
    - HTML
    - CSS
    - JavaScript
    - React.js

- Testing framework
    - Jest

- CI/CD
    - GitHub Actions (Node.js CI)

- Hosting
    - Not decided yet
## Chosen APIs / User Stories
- **Google Calender API**
    - Create a new event
    - Set reminder for upcoming events
    - Return instances of recurring events

- **Weather API**
    - For a picked day, return the predicted weather of that day
    - Be able to look at the weather in the past (possibly 1 week ago)
    - Track sunrise and sunset time based on the time of the day

**User stories for Google Calender API:**

- Case 1:
    Age: 30
    Education: University Graduate with a bachelor’s degree
    Occupation: Marketing Manager
    Family: Married with two children
    Background:
    ·       Busy manager who juggles meetings and deadlines daily
    ·       Needs a reliable way to manage her schedule more effectively
    Characteristics:
    ·       Caring mother, however, wants to spend more time with children
    ·       Tends to be forgetful of many deadlines that occur
    Goals: 
    ·       Wants to create and manage events in her life efficiently for her work and personal life
    ·       Wants to attend more of her sons sports matches and play bigger role in his life.
    Challenges:  
    ·       Keeping track of her appointments and deadlines
    ·       Has a large team which rely on her leadership to meet requirements and targets
    Behaviors:
    ·       Tends to log deadlines on her physical notebook
    ·       Often forgets to check and update it with new tasks
    Quotes & motivations:
    ·       “I rely on my physical planner which I take everywhere to remind me of things I need to do both at work and home, however, I tend to be a bit forgetful to open and update it when I need to”

- Case 2:
    Age: 45
    Education: Highschool Graduate
    Occupation: Small business owner
    Family: Single with one child
    Background:
    ·       Runs a small retail business remotely from home  
    ·       Needs to effectively plan tasks for the business while at the same time taking care of child
    Characteristics:
    ·       Determined to make ends meet
    ·       May sometimes put the business over the child when it comes to dividing up time
    Goals:    	
    ·       Wants to easily manage her business appointments and family time in the same location.
    Challenges:  
    ·       Juggling work-related meetings which are important for the development of business while also spending a good amount of quality time with child.
    ·       Difficult to prioritize one over the other as business is the main source of revenue
    Behaviors:
    ·   	Relies on phone reminders to keep track of important deadlines and events coming up
    ·   	Uses her cellular device for nearly all tasks if possible
    Quotes & motivations:
    ·       “I want to be able to plan my future schedules chunks at a time. With phone reminders it is quite tedious planning the same event at the same time every week; if only there was a way I could have it done with a single step along with reminders for it- it would make my life so much simpler.”

**User stories for Weather API:**

- Case 1:
    Age: 19
    Education: College Student 
    Occupation: Student
    Family: 2 loving parents
    Background:
    ·       Very ambitious and hard-working student.
    ·       Spends most of his time studying in the library so his posture isn’t the best. 
    Characteristics:
    ·       Not physically active
    ·       Free time spent studying or gaming on the weekends
    Goals: 
    ·       He wants to start doing something for his health, so he decides to go on runs.
    ·       He isn’t all that committed so he decides he will run first thing in the morning, but only if the
            sun is out, so it’s less miserable.
    Challenges:  
    ·       Lack of commitment to running regularly
    Behaviors:
    ·       Is quite lazy, so needs information readily available; will not go to great lengths to find it
    Quotes & motivations:
    ·       “I want to start putting my health first, but I need the motivation of a sunny morning to get me started” 

- Case 2: 
    Age: 27
    Education:  Highschool Graduate
    Occupation: Soccer Coach
    Family: Single
    Background:  
    ·       Former aspiring soccer player who left school to pursue coaching and his passion for working with the next generation of soccer talent
    Characteristics:
    ·   	Cares greatly about his player’s development and well-being  
    ·   	Needs to plan outdoor practices and games based on weather conditions.
    Goals:
    ·   	To provide effective coaching/training to his players in order to improve their skills.
    ·   	Play as many matches as possible with his team so that his players get the most out of the season.
    Challenges:
    ·   	Has to deal with unpredictable weather conditions
    Behaviors:
    ·   	Relies heavily on weather forecast apps to plan schedule for training and games
    Quotes & motivations:
    ·       “Poor weather can increase my kids’ risk of getting injured. I need to easily be able to plan practices with good weather with great accuracy.”

## Work Breakdown Structure / Project schedule

## Wireframe and prototype

## Data Flow Diagrams 