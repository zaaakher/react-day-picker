import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../test/axe';
import { freezeBeforeAll } from '../../test/utils';
import Example from './container-attributes';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

let firstChild: HTMLDivElement;
beforeEach(
  () =>
    (firstChild = render(<Example />).container.firstChild as HTMLDivElement)
);

test('should not have AXE violations', async () => {
  expect(await axe(firstChild)).toHaveNoViolations();
});

test('should have the specified id', () => {
  expect(firstChild.id).toBe('testId');
});

test('should have the DataSet attribute', () => {
  expect(firstChild).toHaveAttribute('data-test', 'testData');
});