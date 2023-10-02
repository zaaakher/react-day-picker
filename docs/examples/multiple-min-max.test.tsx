import React from 'react';

import { act, render } from '@testing-library/react';
import { addDays } from 'date-fns';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { getDayButton, getTableFooter } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './multiple-min-max';

const today = new Date(2021, 10, 10);
freezeBeforeAll(today);

const days = [
  today,
  addDays(today, 1),
  addDays(today, 2),
  addDays(today, 3),
  addDays(today, 4)
];

let container: HTMLElement;
beforeEach(() => (container = render(<Example />).container));

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

describe('when a day is clicked', () => {
  beforeEach(async () => act(() => user.click(getDayButton(days[0]))));
  test('should appear as selected', () => {
    expect(getDayButton(days[0])).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(getTableFooter()).toHaveTextContent('You selected 1 day(s).');
  });
  test('should be accessible', async () => {
    expect(await axe(container)).toHaveNoViolations();
  });
  describe('when a second day is clicked', () => {
    beforeEach(async () => act(() => user.click(getDayButton(days[1]))));
    test('the first day should appear as selected', () => {
      expect(getDayButton(days[0])).toHaveAttribute('aria-selected', 'true');
    });
    test('the second day should appear as selected', () => {
      expect(getDayButton(days[1])).toHaveAttribute('aria-selected', 'true');
    });
    test('should update the footer', () => {
      expect(getTableFooter()).toHaveTextContent('You selected 2 day(s).');
    });
    test('should be accessible', async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
    describe('when clicked again', () => {
      beforeEach(async () => act(() => user.click(getDayButton(days[1]))));
      test('the first day should still appear as selected', () => {
        expect(getDayButton(days[0])).toHaveAttribute('aria-selected', 'true');
      });
      test('the second day should still appear as selected', () => {
        expect(getDayButton(days[1])).toHaveAttribute('aria-selected', 'true');
      });
      test('should update the footer', () => {
        expect(getTableFooter()).toHaveTextContent('You selected 2 day(s).');
      });
      test('should be accessible', async () => {
        expect(await axe(container)).toHaveNoViolations();
      });
    });
  });
});

describe('when the first 5 days are clicked', () => {
  beforeEach(async () => {
    await act(() => user.click(getDayButton(days[0])));
    await act(() => user.click(getDayButton(days[1])));
    await act(() => user.click(getDayButton(days[2])));
    await act(() => user.click(getDayButton(days[3])));
    await act(() => user.click(getDayButton(days[4])));
  });
  test.each(days)('the %s day should appear as selected', (day) => {
    expect(getDayButton(day)).toHaveAttribute('aria-selected', 'true');
  });
  test('the sixth day should not appear as selected', () => {
    const day6 = addDays(today, 5);
    expect(getDayButton(day6)).not.toHaveAttribute('aria-selected');
  });
});
