import { Provider } from 'react-redux';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../../src/store/store'
import Search from '../../src/components/search';

describe('flight search', () => {

  
  it.only('shows one way flights when searched', () => {
    cy.visit('http://localhost:3000/');
    
    cy.findByPlaceholderText('From').clear().type('ORIGIN');
    cy.findByPlaceholderText('To').clear().type('DESTINATION');
    cy.get('[data-cy=departureDate]').clear().type("2025-07-10");
    cy.findByPlaceholderText('Members').clear().type('1');
    cy.findByRole('button', { name: /search/i }).click();
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:5000/flight/filter/ORIGIN/DESTINATION/2025-07-10/1/',
    }, {fixture: 'flights.json'}).then(() => {
      cy.get("li")
      .contains("TEST AIRLINE")
      .should('be.visible');
    })
  });

  it('second test', () => {
    cy.get('[data-cy="onewayCheck"]').should('be.checked');
    cy.get('[data-cy="returnDate"]').should('be.disabled');
  });

})
