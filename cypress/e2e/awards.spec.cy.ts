describe('Employee awards Data Entry', () => {
    it('Should entry data of employee awards', () => {
      cy.fixture('awards').then((data_set) => {
        const user_credentials = data_set.login;
        const login_url = data_set.login_url;
        const others_info_url = data_set.others_info_url;
        const awards_data = data_set.awards_data;
  
        // visit login page
        cy.visit(login_url);
  
        cy.get('input[formControlName="user_id"]').type(user_credentials.user_id);
  
        cy.get('input[formControlName="password"]').type(
          user_credentials.password
        );
  
        cy.get('#submit-button').click();
  
        cy.wait(1000);
  
        awards_data.forEach((item: any) => {
          // visit others info page
          cy.visit(others_info_url);
  
          //   click on awards info
          cy.get('.ant-dropdown-trigger').click();
          cy.get(':nth-child(6) > .ant-menu-title-content').click();

          // employee search
          cy.get(
            '.mb-2 > .ant-form-item > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector'
          ).type(item.employee_name);
          cy.get('.ant-select-item-option-content').click();
          const data = item.data;
          data.forEach((award_item: any, index: any) => {
            // award_name
            if(award_item.award_name) {
                cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(award_item.award_name)
            }

            // awarded_for
            if(award_item.awarded_for) {
                cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(award_item.awarded_for)
            }

            // awarded_by
            if(award_item.awarded_by) {
                cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(award_item.awarded_by)
            }

            // award_date
            if(award_item.award_date) {
                cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(4) > .ant-form-item-control`).click();
                cy.get('.ant-picker-header-year-btn').click();
            let clicksNeeded = 0;
            const year = award_item.award_date.year;

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

            cy.get(`[title="${award_item.award_date.year}"]`).click();
            cy.get('.ant-picker-header-month-btn').click();
            cy.get(`[title="${award_item.award_date.month}"]`).click();
            cy.get(`[title="${award_item.award_date.date}"]`).click();
            }

            // remarks
            if(award_item.remarks) {
                cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(award_item.remarks)
            }

  
            // checking index
            cy.log('index' + index);
            if (index !== data.length - 1) {
              if (index === 0) {
                cy.get('.bg-green-600 > .anticon > svg').click();
              } else {
                cy.get(`:nth-child(${index + 1}) > .justify-end > .flex > .bg-green-600 > .anticon`).click();
                // return;
              }
            } else {
              cy.log('last one');
              // submit
            //   cy.get('.primary-button').click();
              // todo: enable this line when we want to submit data
              // cy.get('.flex > .primary-button').click();
  
              cy.wait(1000);
            }
          });
        });
      });
    });
  });
  