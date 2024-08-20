describe('Employee training Data Entry', () => {
  it('Should entry data of employee training', () => {
    cy.fixture('training').then((data_set) => {
      const user_credentials = data_set.login;
      const login_url = data_set.login_url;
      const others_info_url = data_set.others_info_url;
      const training_data = data_set.training_data;

      // visit login page
      cy.visit(login_url);

      cy.get('input[formControlName="user_id"]').type(user_credentials.user_id);

      cy.get('input[formControlName="password"]').type(
        user_credentials.password
      );

      cy.get('#submit-button').click();

      cy.wait(1000);

      training_data.forEach((item: any) => {
        // visit others info page
        cy.visit(others_info_url);

        //   click on training info
        cy.get(':nth-child(4) > .ant-tabs-tab-btn').click();
        // employee search
        cy.get(
          '.mb-2 > .ant-form-item > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector'
        ).type(item.employee_name);
        cy.get('.ant-select-item-option-content').click();
        const data = item.data;
        data.forEach((training_item: any, index: any) => {
          // training_type
          if (training_item.training_type) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`
            ).click();
            cy.get(
              `[title="${training_item.training_type}"] > .ant-select-item-option-content`
            ).click();
          }

          // training_location
          if (training_item.training_location) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`
            ).click();
            cy.get(
              `[title="${training_item.training_location}"] > .ant-select-item-option-content`
            ).click();
          }

          // country
          if (training_item.country) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`
            ).type(training_item.country);
            cy.get(
              `[title="${training_item.country}"] > .ant-select-item-option-content`
            ).click();
          }

          // course_title
          if (training_item.course_title) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`
            ).type(training_item.course_title);
          }

          // name_of_institute
          if (training_item.name_of_institute) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`
            ).type(training_item.name_of_institute);
          }

          // location_of_institute
          if (training_item.location_of_institute) {
            cy.get(
              `:nth-child(${index + 1}) > .grid > :nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`
            ).type(training_item.location_of_institute);
          }

          // start_date
          if (training_item.start_date) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .block`
            ).click();
            cy.get('.ant-picker-header-year-btn').click();
            let clicksNeeded = 0;
            const year = training_item.start_date.year;

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

            cy.get(`[title="${training_item.start_date.year}"]`).click();
            cy.get('.ant-picker-header-month-btn').click();
            cy.get(`[title="${training_item.start_date.month}"]`).click();
            cy.get(`[title="${training_item.start_date.date}"]`).click();
          }

          // end_date
          if (training_item.end_date) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(8) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .block`
            ).click();
            cy.get('.ant-picker-header-year-btn').click();
            let clicksNeeded = 0;
            const year = training_item.end_date.year;

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

            cy.get(`[title="${training_item.end_date.year}"]`).click();
            cy.get('.ant-picker-header-month-btn').click();
            cy.get(`[title="${training_item.end_date.month}"]`).click();
            cy.get(`[title="${training_item.end_date.date}"]`).click();
          }

          //   grade_position
          if (training_item.grade_position) {
            cy.get(
              `:nth-child(${
                index + 1
              }) > .grid > :nth-child(9) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`
            ).type(training_item.grade_position);
          }

          // role
          if (training_item.role) {
            if (training_item.role === 'প্রশিক্ষক') {
              cy.get(
                `:nth-child(${
                  index + 1
                }) > .grid > :nth-child(10) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-radio-group > :nth-child(1) > :nth-child(2)`
              ).click();
            } else {
              cy.get(
                `:nth-child(${
                  index + 1
                }) > .grid > :nth-child(10) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-radio-group > :nth-child(2) > :nth-child(2)`
              ).click();
            }
          }
          // checking index
          cy.log('index' + index);
          if (index !== data.length - 1) {
            if (index === 0) {
              cy.get('.bg-green-600 > .anticon > svg').click();
            } else {
              cy.get(
                `:nth-child(${
                  index + 1
                }) > .justify-end > .flex > .bg-green-600 > .anticon`
              ).click();
              // return;
            }
          } else {
            cy.log('last one');
            // submit
            // todo: enable these 2 line when we want to submit data
            cy.get('.primary-button').click();
            // cy.get('.flex > .primary-button').click();

            cy.wait(1000);
          }
        });
      });
    });
  });
});
