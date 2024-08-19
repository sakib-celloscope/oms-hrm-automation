describe('Login Page Test', () => {
  it('Should Create A New Employee', () => {
    cy.fixture('uat_emp').then((data_set) => {
      const user_credentials = data_set.login;
      const login_url = data_set.login_url;
      const create_employee_url = data_set.create_employee_url;
      const employee_data = data_set.employee_data;

      // visit login page
      cy.visit(login_url);

      cy.get('input[formControlName="user_id"]').type(user_credentials.user_id);

      cy.get('input[formControlName="password"]').type(
        user_credentials.password
      );

      cy.get('#submit-button').click();

      cy.wait(1000);

      let count = 0;
      employee_data.forEach((item: any) => {
        cy.visit(create_employee_url);
        cy.wait(1000);

        // employee_code
        cy.get('input[formControlName="employee_code"]').type(item.employee_id);

        // first_name
        cy.get('input[formControlName="first_name"]').type(item.first_name);
        // middle_name
        if(item.middle_name){
          cy.get('input[formControlName="middle_name"]').type(item.middle_name);
        }
        // last_name
        cy.get('input[formControlName="last_name"]').type(item.last_name);

        // full_name_bn
        cy.get(':nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.full_name_bn);

        // father_name
        cy.get(':nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.father_name);

        // mother_name
        cy.get(':nth-child(8) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.mother_name);

        // nid
        cy.get(':nth-child(10) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.nid_no);

        // email
        if(item.email) {
          cy.get(':nth-child(11) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.email);
        }

        // mobile
        cy.get(':nth-child(12) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.mobile);

        // date_of_birth
        // date_of_birth
        cy.get('[formControlName="date_of_birth"]').click();
        cy.get('.ant-picker-header-year-btn').click();
        let clicksNeeded = 0;
        const year = item.date_of_birth.year;

        if (year >= 2010 && year <= 2019) {
          clicksNeeded = 1;
        } else if (year >= 2000 && year <= 2009) {
          clicksNeeded = 2;
        } else if (year >= 1990 && year <= 1999) {
          clicksNeeded = 3;
        } else if (year >= 1980 && year <= 1989) {
          clicksNeeded = 4;
        } else if (year >= 1970 && year <= 1979) {
          clicksNeeded = 5;
        } else if (year >= 1960 && year <= 1969) {
          clicksNeeded = 6;
        } else if (year >= 1950 && year <= 1959) {
          clicksNeeded = 7;
        }

        for (let i = 0; i < clicksNeeded; i++) {
          cy.get('.ant-picker-super-prev-icon').click();
        }

        cy.get(`[title="${item.date_of_birth.year}"]`).click();
        cy.get('.ant-picker-header-month-btn').click();
        cy.get(`[title="${item.date_of_birth.month}"]`).click();
        cy.get(`[title="${item.date_of_birth.date}"]`).click();

        // organogram
        cy.get('.ant-btn').click();
        cy.wait(1000);
        // cy.get(':nth-child(1) > .ant-tree-node-content-wrapper > .ng-star-inserted').click();
        cy.contains(`${item.division}`).click();
        cy.get(':nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input').click();
        cy.get(`[title="${item.designation}"] > .ant-select-item-option-content`).click();

        cy.get('.mt-4 > .primary-button').click();

        // user_id
        cy.get(':nth-child(2) > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type(item.user_id);

        // password
        cy.get('.ng-tns-c630436078-18 > .ant-input').type(item.password);

        // re password
        cy.get('.ng-tns-c630436078-19 > .ant-input').type(item.password);

        // submit
        cy.get('.primary-button').click();
        cy.get('.flex > .primary-button').click();
        count++;
        if(count === 10) {
          count = 0;
          cy.wait(3000);
        }
      });
    });
  });
});
