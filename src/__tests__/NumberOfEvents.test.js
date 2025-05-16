import React from 'react';
import { render, within, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('contains an element with the role of textbox', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const inputElement = getByRole('textbox');
    expect(inputElement).toHaveValue('32');
  });

  test('value of the textbox changes when user types in it', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<NumberOfEvents />);
    const inputElement = getByRole('textbox');

    await user.type(inputElement, '{backspace}{backspace}10');
    expect(inputElement).toHaveValue('10');
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('integration: number of events rendered matches user input', async () => {
    const { container, getByRole } = render(<App />);
    const appRootNode = container.firstChild;
    const numberInputBox = within(appRootNode.querySelector('#number-of-events')).getByRole('spinbutton');
    // Change the value to 5
    await userEvent.clear(numberInputBox);
    await userEvent.type(numberInputBox, '5');
    // Wait for the event list to update
    const eventListNode = appRootNode.querySelector('#event-list');
    await waitFor(() => {
      const renderedEventItems = within(eventListNode).queryAllByRole('listitem');
      expect(renderedEventItems.length).toBe(5);
    });
  });  


});