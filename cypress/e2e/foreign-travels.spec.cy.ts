describe('Employee foreign travel Data Entry', () => {
  it('Should entry data of employee foreign travel', () => {
    cy.fixture('foreign_travel').then((data_set) => {
      const user_credentials = data_set.login;
      const login_url = data_set.login_url;
      const others_info_url = data_set.others_info_url;
      const foreign_travel_data = data_set.foreign_travel_data;

      // visit login page
      cy.visit(login_url);

      cy.get('input[formControlName="user_id"]').type(user_credentials.user_id);

      cy.get('input[formControlName="password"]').type(
        user_credentials.password
      );

      cy.get('#submit-button').click();

      cy.wait(1000);

      foreign_travel_data.forEach((item: any) => {
        // visit others info page
        cy.visit(others_info_url);

        // employee search
        cy.get('#search_box').type(item.employee_name);
        cy.get('.anticon > img').click();
        cy.get(':nth-child(2) > .ant-menu-title-content').click();
        cy.get(
          '.bg-white > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2) > .ant-tabs-tab-btn'
        ).click();
        cy.get('.ant-tabs-nav-list > :nth-child(6)').click();
        const data = item.data;
        data.forEach((travel_item: any, index: any) => {
          // office_order_no
          if (travel_item.office_order_no) {
            cy.get(`:nth-child(${ index + 1 }) > .border-\\[0\\.5px\\] > .md\\:grid-cols-3 > .lg\\:col-span-3 > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(
              travel_item.office_order_no
            );
          }

          // country
          if (travel_item.country) {
            cy.get(`.ng-invalid.ng-star-inserted > .border-\\[0\\.5px\\] > .md\\:grid-cols-3 > .lg\\:col-span-3 > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).type(travel_item.country);
            cy.get(
              `[title="${travel_item.country}"] > .ant-select-item-option-content`
            ).click();
          }

          // start_date
          if (travel_item.start_date.year) {
            cy.get(
              ':nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .block > .ant-picker-input > .ng-untouched'
            ).click();
            cy.get('.ant-picker-header-year-btn').click();
            let clicksNeeded = 0;
            const year = travel_item.start_date.year;

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

            cy.get(`[title="${travel_item.start_date.year}"]`).click();
            cy.get('.ant-picker-header-month-btn').click();
            let month;
            if (travel_item.start_date.month === 'Jan') {
              month = 'জানু';
            } else if (travel_item.start_date.month === 'Feb') {
              month = 'ফেব';
            } else if (travel_item.start_date.month === 'Mar') {
              month = 'মার্চ';
            } else if (travel_item.start_date.month === 'Apr') {
              month = 'এপ্রিল';
            } else if (travel_item.start_date.month === 'May') {
              month = 'মে';
            } else if (travel_item.start_date.month === 'Jun') {
              month = 'জুন';
            } else if (travel_item.start_date.month === 'Jul') {
              month = 'জুলাই';
            } else if (travel_item.start_date.month === 'Aug') {
              month = 'আগস্ট';
            } else if (travel_item.start_date.month === 'Sep') {
              month = 'সেপ্টেম্বর';
            } else if (travel_item.start_date.month === 'Oct') {
              month = 'অক্টোবর';
            } else if (travel_item.start_date.month === 'Nov') {
              month = 'নভেম্বর';
            } else if (travel_item.start_date.month === 'Dec') {
              month = 'ডিসেম্বর';
            }
            cy.get(`[title="${month}"]`).click();
            cy.get(`[title="${travel_item.start_date.date}"]`).click();
          }

          cy.wait(500);

          // end_date
          if (travel_item.end_date) {
            cy.get(`.ng-invalid.ng-star-inserted > .border-\\[0\\.5px\\] > .md\\:grid-cols-3 > .lg\\:col-span-3 > .grid > :nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .block`).click();
            cy.get('.ant-picker-header-year-btn').click();
            let clicksNeeded = 0;
            const year = travel_item.end_date.year;

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

            cy.get(`[title="${travel_item.end_date.year}"]`).click();
            cy.get('.ant-picker-header-month-btn').click();
            let month;
            if (travel_item.end_date.month === 'Jan') {
              month = 'জানু';
            } else if (travel_item.end_date.month === 'Feb') {
              month = 'ফেব';
            } else if (travel_item.end_date.month === 'Mar') {
              month = 'মার্চ';
            } else if (travel_item.end_date.month === 'Apr') {
              month = 'এপ্রিল';
            } else if (travel_item.end_date.month === 'May') {
              month = 'মে';
            } else if (travel_item.end_date.month === 'Jun') {
              month = 'জুন';
            } else if (travel_item.end_date.month === 'Jul') {
              month = 'জুলাই';
            } else if (travel_item.end_date.month === 'Aug') {
              month = 'আগস্ট';
            } else if (travel_item.end_date.month === 'Sep') {
              month = 'সেপ্টেম্বর';
            } else if (travel_item.end_date.month === 'Oct') {
              month = 'অক্টোবর';
            } else if (travel_item.end_date.month === 'Nov') {
              month = 'নভেম্বর';
            } else if (travel_item.end_date.month === 'Dec') {
              month = 'ডিসেম্বর';
            }
            cy.get(`[title="${month}"]`).click();
            cy.get(`[title="${travel_item.end_date.date}"]`).click();
          }

          // purpose
          if (travel_item.purpose) {
            cy.get(`.ng-invalid.ng-star-inserted > .border-\\[0\\.5px\\] > .md\\:grid-cols-3 > .lg\\:col-span-3 > .grid > :nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-textarea-show-count > .ant-input`).type(travel_item.purpose);
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
            //   cy.get('.primary-button').click();
            // cy.get('.flex > .primary-button').click();

            cy.wait(1000);
          }
        });
      });
    });
  });
});
