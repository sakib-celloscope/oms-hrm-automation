describe('Login Page Test', () => {
  it('Should Create A New Employee', () => {

    cy.fixture('employee').then((data_set) => {
      const employee_data = data_set.employee_data;
      cy.log(employee_data.length)
    });
  });
});
