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

        //   click on education info
        cy.get(':nth-child(3) > .ant-tabs-tab-btn').click();
        // employee search
        cy.get(
          '.mb-2 > .ant-form-item > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector'
        ).type(item.employee_name);
        cy.get('.ant-select-item-option-content').click();
        const data = item.data;
        data.forEach((education_item: any, index: any) => {
          //   type
          if (education_item.type !== 'বিশ্ববিদ্যালয়/শিক্ষা-প্রতিষ্ঠান') {
            cy.get(
              '.flex > .ant-radio-group > :nth-child(1) > :nth-child(2)'
            ).click({ multiple: true });
          }
          //   exam_name
          cy.get(
            '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
          ).click();
          cy.get(
            `[title="${education_item.exam_name}"] > .ant-select-item-option-content`
          ).click();
          // group_name
          if (education_item.group_name) {
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
            );
            cy.get(
              `[title="${education_item.group_name}"] > .ant-select-item-option-content`
            ).click();
          }
          // subject name
          if (education_item.subject_name) {
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input'
            ).type(education_item.subject_name);
          }
          // board_or_university
          if (education_item.board_or_university) {
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > .ant-form-item.ng-star-inserted > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
            ).click();
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > .ant-form-item.ng-star-inserted > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
            ).type(education_item.board_or_university);
            cy.get(
              `[title="${education_item.board_or_university}"] > .ant-select-item-option-content`
            ).click();
          }
          // passing_year
          cy.get(
            '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .w-full > .ant-picker-input > .ng-untouched'
          ).click();
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
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(8) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
            ).click();
            cy.get(
              `[title="${education_item.class_or_division}"] > .ant-select-item-option-content`
            ).click();
          }

          // cgpa_scale
          if (education_item.cgpa_scale) {
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(9) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
            ).click();
            cy.get(
              `[title="${education_item.cgpa_scale}"] > .ant-select-item-option-content`
            ).click();
          }

          // cgpa
          if (education_item.cgpa) {
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(10) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input'
            ).type(education_item.cgpa);
          }

          // remarks
          if (education_item.remarks) {
            cy.get(
              '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(11) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input'
            ).type(education_item.remarks);
          }

          // checking index
          cy.log('index' + index);
          if (index !== data.length - 1) {
            cy.log('more than one');
            if(index === 0) {
              cy.get('.bg-green-600 > .anticon > svg').click();
            } else {
              cy.get(`:nth-child(${index+1}) > .justify-end > .flex > .bg-green-600 > .anticon`).click();
            }
          } else {
            cy.log('last one');
            // submit
            cy.get('.primary-button').click();
            // cy.get('.flex > .primary-button').click();

            cy.wait(1000);
          }
        });
      });

      /* cy.get(
        ':nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
      ).then(($input) => {
        cy.log('Element :' + $input.length);
        if ($input.length) {
          // Element does not exist, so click the button
          cy.get('.bg-green-600 > .anticon').click();
        } else {
          cy.log('Element exists, no action taken');
        }
      }); */

      // if 1 item is there
      /* if (
        cy.get(
          ':nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item'
        )
      ) {
        // input exist
        cy.get('.bg-green-600 > .anticon').click();
        // cy.get('.bg-green-600').click({ multiple: true });
      }
      // if 2 item is there
      if (
        cy.get(
          ':nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item'
        )
      ) {
        // input exist
        cy.get(':nth-child(2) > .justify-end > .flex > .bg-green-600').click();
        // cy.get('.bg-green-600').click({ multiple: true });
      } */

      //   type
      /* if (education_data[0].type !== 'বিশ্ববিদ্যালয়/শিক্ষা-প্রতিষ্ঠান') {
        cy.get(
          '.flex > .ant-radio-group > :nth-child(1) > :nth-child(2)'
        ).click({ multiple: true });
      }
      //   exam_name
      cy.get(
        '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
      ).click();
      // cy.get(
      //   `[title="${education_data[0].exam_name}"] > .ant-select-item-option-content`
      // ).click();
      cy.get(`[title="${education_data[0].exam_name}"] > .ant-select-item-option-content`).click();

      if (education_data[0].group_name) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
        );
        cy.get(
          `[title="${education_data[0].group_name}"] > .ant-select-item-option-content`
        ).click();
      }

      // subject name
      if (education_data[0].subject_name) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input'
        ).type(education_data[0].subject_name);
      }

      if (education_data[0].board_or_university) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > .ant-form-item.ng-star-inserted > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
        ).click();
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > .ant-form-item.ng-star-inserted > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
        ).type(education_data[0].board_or_university);
        cy.get(
          `[title="${education_data[0].board_or_university}"] > .ant-select-item-option-content`
        ).click();
      }

      // passing_year
      cy.get(
        '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .w-full > .ant-picker-input > .ng-untouched'
      ).click();
      let clicksNeeded = 0;
      const year = education_data[0].passing_year;

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
      if (education_data[0].class_or_division) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(8) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
        ).click();
        cy.get(
          `[title="${education_data[0].class_or_division}"] > .ant-select-item-option-content`
        ).click();
      }

      // cgpa_scale
      if (education_data[0].cgpa_scale) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(9) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input'
        ).click();
        cy.get(
          `[title="${education_data[0].cgpa_scale}"] > .ant-select-item-option-content`
        ).click();
      }

      // cgpa
      if (education_data[0].cgpa) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(10) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input'
        ).type(education_data[0].cgpa);
      }

      // remarks
      if (education_data[0].remarks) {
        cy.get(
          '.border-\\[0\\.5px\\].ng-invalid > .grid > :nth-child(11) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input'
        ).type(education_data[0].remarks);
      } */

      // submit
      // cy.get('.primary-button').click();
      // cy.get('.flex > .primary-button').click();

      // cy.wait(1000);
    });
  });
});
