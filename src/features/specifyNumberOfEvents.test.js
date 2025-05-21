import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user has not specified a number, 32 events are shown by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user is on the events page', () => {
            AppComponent = render(<App />);


        });

        when('the user has not specified a number', () => {

        });

        then(/^the user should see (\d+) events by default$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;
        given('the user is on the events page', () => {
            AppComponent = render(<App />);

        });

        when('the user selects a number of events to display', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const numberInputBox = within(AppDOM.querySelector('#number-of-events')).getByRole('spinbutton');
            await user.clear(numberInputBox);
            await user.type(numberInputBox, '5');
        });

        then('the events page should render that number of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(5);
            });

        });
    });
});