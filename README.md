# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Project Objective

Build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.


# Key Features Scenarios and User Stories

Feature: Filter Events by City

User Story:

"As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city."

Scenario 1: An event element is collapsed by default.

Scenario 2: User can expand an event to see details.

Scenario 3: User can collapse an event to hide details.



Feature: Show/Hide Event Details

User Story: 
"As a user,
I should be able to show/hide event details
So that I can choose whether to display that information"

Scenario 1: An event element is collapsed by default
Given the user is on the events page
When the page loads
Then the event details for all events should be hidden

Scenario 2: User can expand an event to see details
Given the user is on the events page
And event details are hidden
When the user clicks on an event
Then the event details should be displayed

Scenario 3: User can collapse an event to hide details
Given the user is on the events page
And event details are displayed for an event
When the user clicks on the same event
Then the event details should be hidden


Feature: Specify Number of Events

User Story:
"As a user 
I should be able to see how many events are available
So that I don't have to count them"

Scenario 1: When user has not specified a number, 32 events are shown by default
Given the user is on the events page
When the events paged renders
Then the user should see 32 events by default

Scenario 2: User can change the number of events displayed
Given the user is on the events page
When the user selects a number of events to display
Then the events page should render that number of events


Feature: Use the App When Offline

User Story:
"As a user,
I should be able to use the app when offline,
So that I can use the app when I don't have a connection" 

Scenarios:
Given the user has saved an event on the app
When the user goes offline
Then the user should still have access to the event



Feature: Add an App Shortcut to the Home Screen

User Story:
"As a user,
I should be able to access the app via a shortcut on the homescreen
So that I can easily access my app"

Scenarios:
Given the user is viewing the home screen
When the user clicks on the app shortcut
Then the user should immediately be taken to the app



Feature: Display Charts Visualizing Event Details

User Story:
"As a user,
I should be able to see charts visualizing event details,
So that I can see more information at a glance"

Scenarios:
Given the user is viewing an event
When the user expands details
Then the user will see charts visualizing the details