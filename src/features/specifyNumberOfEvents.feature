Feature: Specify Number of Events
    Scenario: When user has not specified a number, 32 events are shown by default
        Given the user is on the events page
        When the user has not specified a number
        Then the user should see 32 events by default

    Scenario: User can change the number of events displayed
        Given the user is on the events page
        When the user selects a number of events to display
        Then the events page should render that number of events