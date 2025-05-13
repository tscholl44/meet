import React from 'react';
import { render } from '@testing-library/react';
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

    await user.type(inputElement, '10');
    expect(inputElement).toHaveValue('10');
  });
});