describe('Employee publication Data Entry', () => {
    it('Should entry data of employee publication', () => {
      cy.fixture('publication').then((data_set) => {
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
          cy.get('.ant-tabs-nav-list > :nth-child(10)').click();
          const data = item.data;
          data.forEach((publication_item: any, index: any) => {
            // type
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).click();
            cy.get('[title="জার্নাল"] > .ant-select-item-option-content').click();

            // title
            if(publication_item.title) {
              cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(publication_item.title)
            }

            // publication_media
            if(publication_item.publication_media) {
              cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(publication_item.publication_media)
            }

            // publication_date
            if(publication_item.publication_date) {
              cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .block`).click();
              cy.get('.ant-picker-header-year-btn').click();let clicksNeeded = 0;
              const year = publication_item.publication_date.year;
  
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
  
              cy.get(`[title="${publication_item.publication_date.year}"]`).click();
              cy.get('.ant-picker-header-month-btn').click();
              let month;
              if (publication_item.publication_date.month === 'Jan') {
                month = 'জানু';
              } else if (publication_item.publication_date.month === 'Feb') {
                month = 'ফেব';
              } else if (publication_item.publication_date.month === 'Mar') {
                month = 'মার্চ';
              } else if (publication_item.publication_date.month === 'Apr') {
                month = 'এপ্রিল';
              } else if (publication_item.publication_date.month === 'May') {
                month = 'মে';
              } else if (publication_item.publication_date.month === 'Jun') {
                month = 'জুন';
              } else if (publication_item.publication_date.month === 'Jul') {
                month = 'জুলাই';
              } else if (publication_item.publication_date.month === 'Aug') {
                month = 'আগস্ট';
              } else if (publication_item.publication_date.month === 'Sep') {
                month = 'সেপ্টেম্বর';
              } else if (publication_item.publication_date.month === 'Oct') {
                month = 'অক্টোবর';
              } else if (publication_item.publication_date.month === 'Nov') {
                month = 'নভেম্বর';
              } else if (publication_item.publication_date.month === 'Dec') {
                month = 'ডিসেম্বর';
              }
              cy.get(`[title="${month}"]`).click();
              cy.get(`[title="${publication_item.publication_date.date}"]`).click();
            }
            cy.wait(500);

            // author
            if(publication_item.role === 'Author') {
              cy.get(`:nth-child(${index + 1 }) > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-radio-group > :nth-child(1) > .ant-radio > .ant-radio-input`).click();
            } else {
              cy.get(`:nth-child(${index + 1 }) > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-radio-group > :nth-child(2) > .ant-radio > .ant-radio-inner`).click();
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
  