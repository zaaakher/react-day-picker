import React from 'react';

import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import { act } from 'react-dom/test-utils';

import { axe } from '../../test/axe';
import { getDayButton } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './date-picker-dialog';

const today = new Date(2022, 5, 10);
const tomorrow = new Date(2022, 5, 11);
freezeBeforeAll(today);

const getDialogButton = () => {
  return screen.getByRole('button', { name: 'Pick a date' });
};

const getInput = () => {
  return screen.getByRole('textbox');
};

/** Fixes popper warnings, see https://github.com/floating-ui/floating-ui/issues/1520. */
async function waitPopper() {
  await act(async () => await null);
}

let container: HTMLElement;
beforeEach(() => {
  container = render(<Example />).container;
});

test('should not have AXE violations', async () => {
  expect(await axe(container)).toHaveNoViolations();
});

describe('when clicking the dialog button', () => {
  beforeEach(async () => {
    await act(() => user.click(getDialogButton()));
    await waitPopper();
  });
  test('should not have AXE violations', async () => {
    expect(await axe(container)).toHaveNoViolations();
  });
  test('the dialog should be visible', () => {
    expect(screen.getByRole('dialog')).toBeVisible();
  });
  test('the today button should have focus', () => {
    expect(getDayButton(today)).toHaveFocus();
  });
  describe('when clicking a day', () => {
    const date = today;
    beforeEach(async () => {
      await act(() => user.click(getDayButton(date)));
      await waitPopper();
    });
    test('should not have AXE violations', async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
    test('the dialog should be closed', () => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
    test('the input should have the selected date as value', () => {
      expect(getInput()).toHaveValue(format(today, 'y-MM-dd'));
    });
    describe('when typing a new date into the input', () => {
      const newDate = tomorrow;
      beforeEach(async () => {
        await act(() => user.clear(getInput()));
        await act(() => user.type(getInput(), format(newDate, 'y-MM-dd')));
        await waitPopper();
      });
      test('should not have AXE violations', async () => {
        expect(await axe(container)).toHaveNoViolations();
      });
      test('the input should have the new date', () => {
        expect(getInput()).toHaveValue(format(newDate, 'y-MM-dd'));
      });
      describe('when clicking the dialog button', () => {
        beforeEach(async () => {
          await act(() => user.click(getDialogButton()));
          await waitPopper();
        });
        test('the new date should be selected', () => {
          expect(getDayButton(newDate)).toHaveAttribute(
            'aria-selected',
            'true'
          );
        });
        test('the new date button should have focus', () => {
          expect(getDayButton(newDate)).toHaveFocus();
        });
        test('should not have AXE violations', async () => {
          expect(await axe(container)).toHaveNoViolations();
        });
      });
    });
  });
});