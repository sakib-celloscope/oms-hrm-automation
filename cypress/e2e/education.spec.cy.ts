describe('Employee Education Data Entry', () => {
  it('Should entry data of employee education', () => {
    cy.fixture('education').then((data_set) => {
      const user_credentials = data_set.login;
      const login_url = data_set.login_url;
      const others_info_url = data_set.others_info_url;
      const education_data = data_set.education_data;

      // visit login page
      cy.visit(login_url);

      cy.get('input[formControlName="user_id"]').type(user_credentials.user_id);

      cy.get('input[formControlName="password"]').type(
        user_credentials.password
      );

      cy.get('#submit-button').click();

      cy.wait(1000);

      education_data.forEach((item: any) => {
        // visit others info page
        cy.visit(others_info_url);

        // employee search
        cy.get('#search_box').type(item.employee_name);
        cy.get('.anticon > img').click();
        cy.get(':nth-child(2) > .ant-menu-title-content').click();
        cy.get('.bg-white > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2) > .ant-tabs-tab-btn').click();
        cy.get('app-others-info-form.ng-star-inserted > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(3)').click();
        const data = item.data;
        data.forEach((education_item: any, index: any) => {
          // type
          // cy.log('education type' + education_item.type)
          // if (education_item.type !== 'বিশ্ববিদ্যালয়/শিক্ষা-প্রতিষ্ঠান') {
          //   cy.get(`:nth-child(${index + 1}) > .grid > .flex > .ant-radio-group > :nth-child(1) > :nth-child(2)`).click();
          // }

          // exam_name
          cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
          cy.wait(500)
          cy.get(`[title="${education_item.exam_name}"] > .ant-select-item-option-content`).click();

          // group_name
          if(education_item.group_name) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
            cy.get(`[title="${education_item.group_name}"] > .ant-select-item-option-content`).click();
          }

          // subject name
          if(education_item.subject_name) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(education_item.subject_name);
          }

          // institute
          if(education_item.institute) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(education_item.institute);
          }

          // board_or_university
          cy.get(`:nth-child(${index + 1}) > .grid > .ant-form-item.ng-star-inserted > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
          // checking whether it should select board or type university
          if(education_item.type !== 'বিশ্ববিদ্যালয়/শিক্ষা-প্রতিষ্ঠান') {
            cy.get(`[title="${education_item.board_or_university}"] > .ant-select-item-option-content`).click();
          } else {
            cy.get(`:nth-child(${index + 1}) > .grid > .ant-form-item.ng-star-inserted > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).type(education_item.board_or_university);
            cy.get(`[title="${education_item.board_or_university}"] > .ant-select-item-option-content`).click();
          }


          // passing_year
          cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .w-full`).click();
          let clicksNeeded = 0;
          const year = education_item.passing_year;

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
          cy.get(`[title="${year}"]`).click();


          // class_or_division
          if (education_item.class_or_division) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input`).click();
            cy.get(`[title="${education_item.class_or_division}"] > .ant-select-item-option-content`).click();
          }


          // cgpa_scale
          if(education_item.cgpa_scale) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(8) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector`).click();
          cy.get(`[title="${education_item.cgpa_scale}"] > .ant-select-item-option-content`).click();
          }


          // cgpa
          if(education_item.cgpa) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(9) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(education_item.cgpa);
          }


          // remarks
          if(education_item.remarks) {
            cy.get(`:nth-child(${index + 1}) > .grid > :nth-child(10) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`).type(education_item.remarks)
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
            cy.get('.primary-button').click();
            // todo: enable this line when we want to submit data
            // cy.get('.flex > .primary-button').click();

            cy.wait(1000);
          }
        });
      });
    });
  });
});
