import React from 'react';

import { po } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './default-month';

const today = new Date(2022, 5, 10);
freezeBeforeAll(today);

test('should display September 1979', () => {
  renderExampleApp(<Example />);
  expect(po.grid('September 1979')).toBeInTheDocument();
});