import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user is on the events page', async () => {
            AppComponent = render(<App />);

        });

        when('the events page loads', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });

        then('the event details for all events should be hidden', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            EventListItems.forEach((item) => {
                const eventDetails = within(item).queryByText(/Event Details/i);
                expect(eventDetails).not.toBeInTheDocument();
            });

        });
    });

    test('User can expand an event to see details', ({ given, and, when, then }) => {
        let AppComponent;
        given('the user is on the events page', () => {
            AppComponent = render(<App />);

        });

        and('event details are hidden', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });

        when('the user clicks on an event', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');

            // Assuming the first event is clicked
            const eventToClick = within(EventListItems[0]).queryByText('show details');
            const user = userEvent.setup();
            user.click(eventToClick);


        });

        then('the event details should be displayed', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            await waitFor(() => {

                EventListItems.forEach((item) => {
                    const eventDetails = within(item).queryByText(/show details/i);
                    expect(eventDetails).toBeInTheDocument();
                });
            });
        });
    });

    test('User can collapse an event to hide details', ({ given, and, when, then }) => {
        let AppComponent;
        given('the user is on the events page', () => {
            AppComponent = render(<App />);

        });

        and('event details are displayed for an event', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');

            EventListItems.forEach((item) => {
                const eventDetails = within(item).queryByText(/show details/i);
                expect(eventDetails).toBeInTheDocument();
            });

        });

        when('the user clicks on the same event', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            // Assuming the first event is clicked
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
                const eventToClick = within(EventListItems[0]).queryByText('hide details');
                const user = userEvent.setup();
                user.click(eventToClick);
            });
        });

        then('the event details should be hidden', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                EventListItems.forEach((item) => {
                    const eventDetails = within(item).queryByText(/show details/i);
                    expect(eventDetails).toBeInTheDocument();
                });
            });
        });
    });
});