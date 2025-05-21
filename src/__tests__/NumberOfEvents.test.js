import React from 'react';
import { render, within, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />);
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default number is 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });

  test('number of events text box value changes when the user types in it', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberTextBox, "123")

    // 32 (the default value already written) + 123
    expect(numberTextBox).toHaveValue("32123");
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