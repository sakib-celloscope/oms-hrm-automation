describe('Employee language Data Entry', () => {
    it('Should entry data of employee language', () => {
      cy.fixture('language').then((data_set) => {
        const user_credentials = data_set.login;
        const login_url = data_set.login_url;
        const others_info_url = data_set.others_info_url;
        const language_data = data_set.language_data;
  
        // visit login page
        cy.visit(login_url);
  
        cy.get('input[formControlName="user_id"]').type(user_credentials.user_id);
  
        cy.get('input[formControlName="password"]').type(
          user_credentials.password
        );
  
        cy.get('#submit-button').click();
  
        cy.wait(1000);
  
        language_data.forEach((item: any) => {
          // visit others info page
          cy.visit(others_info_url);
  
          //   click on language info
          cy.get('#search_box').type(item.employee_name);
          cy.get('.anticon > img').click();
          cy.get(':nth-child(2) > .ant-menu-title-content').click();
          cy.get(
            '.bg-white > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2) > .ant-tabs-tab-btn'
          ).click();
          cy.get('.ant-tabs-nav-list > :nth-child(5)').click();
          const data = item.data;
          data.forEach((language_item: any, index: any) => {
            // language_name
            if(language_item.language_name) {
                cy.get(`.border-\\[0\\.5px\\].ng-untouched > .grid.mb-4 > .col-span-3 > .grid > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).click();
                cy.wait(200);
                cy.get(`[title="${language_item.language_name}"] > .ant-select-item-option-content`).click();
            }

            // reading_level
            if(language_item.reading_level) {
              cy.get(`.border-\\[0\\.5px\\].ng-invalid > .grid.mb-4 > .col-span-3 > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).click();
                cy.wait(200);
                cy.get(`[title="${language_item.reading_level}"] > .ant-select-item-option-content`).click();
            }

            // writing_level
            if(language_item.writing_level) {
              cy.get(`.border-\\[0\\.5px\\].ng-invalid > .grid.mb-4 > .col-span-3 > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
                cy.wait(200);
                cy.get(`[title="${language_item.writing_level}"] > .ant-select-item-option-content`).click();
            }

            // speaking_level
            if(language_item.speaking_level) {
              cy.get(`.border-\\[0\\.5px\\].ng-invalid > .grid.mb-4 > .col-span-3 > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).click();
                cy.wait(200);
                cy.get(`[title="${language_item.speaking_level}"] > .ant-select-item-option-content`).click();
            }

            // listening_level
            if(language_item.listening_level) {
              cy.get(`.border-\\[0\\.5px\\].ng-invalid > .grid.mb-4 > .col-span-3 > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
                cy.wait(200);
                cy.get(`[title="${language_item.listening_level}"] > .ant-select-item-option-content`).click();
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
  