import React from 'react';

import { gridcell, renderExampleApp, freezeTime } from 'react-day-picker/test';

import Example from './modifiers-classnames';

const days = [
  new Date(2021, 5, 8),
  new Date(2021, 5, 9),
  new Date(2021, 5, 11)
];

const today = new Date(2021, 10, 25);
freezeTime(today);

beforeEach(() => {
  renderExampleApp(<Example />);
});

test.each(days)('the day %s should have the `my-booked-class` class', (day) => {
  expect(gridcell(day)).toHaveClass('my-booked-class');
});
