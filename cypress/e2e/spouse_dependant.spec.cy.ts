describe('Employee spouse dependant Data Entry', () => {
    it('Should entry data of employee spouse dependant', () => {
      cy.fixture('spouse_dependant').then((data_set) => {
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

          // employee search
          cy.get('#search_box').type(item.employee_name);
          cy.get('.anticon > img').click();
          cy.get(':nth-child(2) > .ant-menu-title-content').click();
          cy.get('.bg-white > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2) > .ant-tabs-tab-btn').click();
          cy.get(':nth-child(1) > .ant-tabs-tab-btn > .flex > .block').click();
          const data = item.data;
          data.forEach((spouse_item: any, index: any) => {
            // name_en
            if(spouse_item.name_en) {
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(spouse_item.name_en)
            }

            // name_bn
            if(spouse_item.name_bn) {
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(spouse_item.name_bn)
            }

            // mobile
            if(spouse_item.mobile) {
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(spouse_item.mobile);
            }

            // relationship
            if(spouse_item.relationship) {
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
              // cy.get(`[title="${spouse_item.relationship}"]`).click();
              cy.get(`.cdk-virtual-scroll-content-wrapper > [title="${spouse_item.relationship}"]`).click();
            }

            // date_of_birth
            if(spouse_item.date_of_birth) {
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .block`).click();
              cy.get('.ant-picker-header-year-btn').click();
              let clicksNeeded = 0;
              const year = spouse_item.date_of_birth.year;
  
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
  
              cy.get(`[title="${spouse_item.date_of_birth.year}"]`).click();
              cy.get('.ant-picker-header-month-btn').click();
              let month;
              if (spouse_item.date_of_birth.month === 'Jan') {
                month = 'জানু';
              } else if (spouse_item.date_of_birth.month === 'Feb') {
                month = 'ফেব';
              } else if (spouse_item.date_of_birth.month === 'Mar') {
                month = 'মার্চ';
              } else if (spouse_item.date_of_birth.month === 'Apr') {
                month = 'এপ্রিল';
              } else if (spouse_item.date_of_birth.month === 'May') {
                month = 'মে';
              } else if (spouse_item.date_of_birth.month === 'Jun') {
                month = 'জুন';
              } else if (spouse_item.date_of_birth.month === 'Jul') {
                month = 'জুলাই';
              } else if (spouse_item.date_of_birth.month === 'Aug') {
                month = 'আগস্ট';
              } else if (spouse_item.date_of_birth.month === 'Sep') {
                month = 'সেপ্টেম্বর';
              } else if (spouse_item.date_of_birth.month === 'Oct') {
                month = 'অক্টোবর';
              } else if (spouse_item.date_of_birth.month === 'Nov') {
                month = 'নভেম্বর';
              } else if (spouse_item.date_of_birth.month === 'Dec') {
                month = 'ডিসেম্বর';
              }
              cy.get(`[title="${month}"]`).click();
              cy.get(`[title="${spouse_item.date_of_birth.date}"]`).click();
            }
            cy.wait(500);

            // sex
            if(spouse_item.sex){
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).click();
              cy.get(`.cdk-virtual-scroll-content-wrapper > [title="${spouse_item.sex}"]`).click();
            }

            // occupation
            if(spouse_item.occupation){
              cy.get(`:nth-child(${index + 1}) > :nth-child(3) > .grid > :nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(spouse_item.occupation)
            }
  
            // checking index
            cy.log('index' + index);
            if (index !== data.length - 1) {
              if (index === 0) {
                cy.get('.bg-green-600 > .anticon > svg').click();
              } else {
                cy.get(`:nth-child(${index + 1}) > .justify-end > .bg-green-600`).click();
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
  