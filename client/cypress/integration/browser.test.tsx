import { Provider } from 'react-redux';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../../src/store/store'
import Search from '../../src/components/search';

describe('flight search',{
    browser:'firefox'
} ,() => {

  beforeEach(() => {
    mount(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>);
  })

  it('second test', () => {
    cy.get('[data-cy="onewayCheck"]').should('be.checked');
    cy.get('[data-cy="returnDate"]').should('be.disabled');
  });

})

describe('flight search',() => {

  beforeEach(() => {
    mount(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>);
  })

  it('second test', () => {
    cy.get('[data-cy="onewayCheck"]').should('be.checked');
    cy.get('[data-cy="returnDate"]').should('be.disabled');
  });

})