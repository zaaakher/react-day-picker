import React from 'react';

import { act, render } from '@testing-library/react';
import { addDays } from 'date-fns';

import { getDayButton, getTableFooter } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './modifiers-today';

const today = new Date(2022, 5, 10);
freezeBeforeAll(today);

let container: HTMLElement;
beforeEach(() => {
  container = render(<Example />).container;
});

describe('when rendering a month that contains today', () => {
  test('it should add the default class name for today', () => {
    expect(getDayButton(today)).toHaveClass('rdp-day_today');
  });
  test('it should have exactly one ".rdp-day_today" class', () => {
    const todays = container.querySelectorAll('.rdp-day_today');
    expect(todays).toHaveLength(1);
  });
});

describe('when the today date is clicked', () => {
  beforeEach(async () => act(() => user.click(getDayButton(today))));
  test('should update the footer', () => {
    expect(getTableFooter()).toHaveTextContent('You clicked the today’s date');
  });
});

describe('when another date is clicked', () => {
  const date = addDays(today, 1);
  beforeEach(async () => act(() => user.click(getDayButton(date))));
  test('should update the footer', () => {
    expect(getTableFooter()).toHaveTextContent(
      'Try clicking the today’s date.'
    );
  });
});