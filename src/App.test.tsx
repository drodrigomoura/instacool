import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history'
import { identity } from 'lodash'

import App from './App';

const history = createBrowserHistory()

test('renders learn react link', () => {
  const { getByText } = render(<App loadInitialData={identity} history={history} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
