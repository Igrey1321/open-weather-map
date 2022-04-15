import React from 'react';
import Home from './index';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Home />
      </Provider>
    </BrowserRouter>,
  );
  const addCity = screen.getByText(/Add city/i);
  expect(addCity).toBeInTheDocument();
});
