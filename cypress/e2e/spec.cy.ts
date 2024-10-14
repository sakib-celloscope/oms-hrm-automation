describe('Login Page Test', () => {
  it('Should Create A New Employee', () => {

    cy.fixture('employee').then((data_set) => {
      const employee_data = data_set.employee_data;
      cy.log(employee_data.length)
      let employee_id_arr = employee_data.map((item: any) => item.employee_id);
      cy.log(employee_id_arr);
      console.log(employee_id_arr);
      
    });
  });
});
