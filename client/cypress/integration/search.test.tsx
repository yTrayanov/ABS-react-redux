import { Provider } from 'react-redux';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../../src/store/store'
import Search from '../../src/components/search';

describe('flight search', () => {

  it('shows one way flights when searched', () => {
    mount(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>);

    cy.findByPlaceholderText('From').clear().type('ORIGIN');
    cy.findByPlaceholderText('To').clear().type('DESTINATION');
    cy.findByLabelText(/departure date/i).clear().type("2025-07-10");
    cy.findByPlaceholderText('Members').clear().type('1');
    cy.findByRole('button', { name: /search/i }).click();
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:5000/flight/filter/ORIGIN/DESTINATION/2025-07-10/1/'
    }, {
      fixture: 'flights.json'
    }).as('filter flights')
  })
})
