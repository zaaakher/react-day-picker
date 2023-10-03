import React from 'react';

import { render } from '@testing-library/react';

import { getDayButton } from '../../test/selectors';
import { freezeBeforeAll } from '../../test/utils';
import Example from './modifiers-style';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

beforeEach(() => {
  render(<Example />);
});

const days = [new Date(2021, 5, 23), new Date(2021, 5, 24)];
const style = {
  fontWeight: 900,
  color: 'lightgreen'
};
test.each(days)('The day %s should have the proper inline style', (day) => {
  expect(getDayButton(day)).toHaveStyle(style);
});