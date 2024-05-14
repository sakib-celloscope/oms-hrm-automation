describe('Login Page Test', () => {
  it('Should Create A New Employee', () => {
    cy.visit('https://oms.celloscope.net/auth/sign-in');

    const testData = {
      user_id: 'hrm',
      password: 'asdfgh',
    };

    cy.get('input[formControlName="user_id"]').type(testData.user_id);

    cy.get('input[formControlName="password"]').type(testData.password);

    cy.get('#submit-button').click();

    cy.wait(1000);

    cy.fixture('data_set').then((data_set) => {
      data_set.data.forEach((item: any) => {
        cy.visit(data_set.create_employee_url);
        cy.wait(1000);
        // employee_code
        cy.get('input[formControlName="employee_code"]').type(
          item.employee_code
        );

        // first_name
        cy.get('input[formControlName="first_name"]').type(item.first_name);

        // last_name
        cy.get('input[formControlName="last_name"]').type(item.last_name);

        // full_name_bn
        cy.get('input[formControlName="full_name_bn"]').type(item.full_name_bn);

        // father_name
        cy.get('input[formControlName="father_name"]').type(item.father_name);

        // mother_name
        cy.get('input[formControlName="mother_name"]').type(item.mother_name);

        // date_of_birth
        cy.get('[formControlName="date_of_birth"]').click();
        cy.get('.ant-picker-header-year-btn').click();
        cy.get('.ant-picker-super-prev-icon').dblclick();
        cy.get('.ant-picker-super-prev-icon').click();
        cy.get(`[title="${item.date_of_birth.year}"]`).click();
        cy.get('.ant-picker-header-month-btn').click();
        cy.get(`[title="${item.date_of_birth.month}"]`).click();
        cy.get(`[title="${item.date_of_birth.date}"]`).click();

        // height
        cy.get('input[formControlName="height"]').type(item.height);

        // blood_group
        cy.get('[formControlName="blood_group"]').click();
        cy.get(`[title="${item.blood_group}"]`).click();

        // religion
        cy.get('[formControlName="religion"]').click();
        cy.get(`[title="${item.religion}"]`).click();

        // sex
        cy.get('[formControlName="sex"]').click();
        cy.get(`[title="${item.sex}"]`).click();

        // marital_status
        cy.get('[formControlName="marital_status"]').click();
        cy.get(`[title="${item.marital_status}"]`).click();

        // nid_no
        cy.get('input[formControlName="nid_no"]').type(item.nid_no);

        // Second tab
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();

        // mobile
        cy.get('input[formControlName="mobile"]').type(item.mobile);

        // emergency_contact_person
        cy.get('input[formControlName="emergency_contact_person"]').type(
          item.emergency_contact_person
        );

        // emergency_contact_division_id
        cy.get('[formControlName="emergency_contact_division_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.emergency_contact_division_id}"]`
        ).click();

        // emergency_contact_district_id
        cy.get('[formControlName="emergency_contact_district_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.emergency_contact_district_id}"]`
        ).click();

        // emergency_contact_thana_id
        cy.get('[formControlName="emergency_contact_thana_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.emergency_contact_thana_id}"]`
        ).click();

        // emergency_contact_mobile
        cy.get('input[formControlName="emergency_contact_mobile"]').type(
          item.emergency_contact_mobile
        );

        // present_address_division_id
        cy.get('[formControlName="present_address_division_id"]').click();
        // cy.get(`[title="${item.present_address_division_id}"]`).click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.present_address_division_id}"]`
        ).click();

        // present_address_district_id
        cy.get('[formControlName="present_address_district_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.present_address_district_id}"]`
        ).click();

        // present_address_thana_id
        cy.get('[formControlName="present_address_thana_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.present_address_thana_id}"]`
        ).click();

        // permanent_address_division_id
        cy.get('[formControlName="permanent_address_division_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.permanent_address_division_id}"]`
        ).click();

        // permanent_address_district_id
        cy.get('[formControlName="permanent_address_district_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.permanent_address_district_id}"]`
        ).click();

        // permanent_address_thana_id
        cy.get('[formControlName="permanent_address_thana_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.permanent_address_thana_id}"]`
        ).click();

        // Third tab
        cy.get('.ant-tabs-nav-list > :nth-child(3)').click();

        // reference_one_name
        cy.get('input[formControlName="reference_one_name"]').type(
          item.reference_one_name
        );

        // reference_one_designation
        cy.get('input[formControlName="reference_one_designation"]').type(
          item.reference_one_designation
        );

        // reference_one_mobile
        cy.get('input[formControlName="reference_one_mobile"]').type(
          item.reference_one_mobile
        );

        // reference_one_division_id
        cy.get('[formControlName="reference_one_division_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.reference_one_division_id}"]`
        ).click();

        // reference_one_district_id
        cy.get('[formControlName="reference_one_district_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.reference_one_district_id}"]`
        ).click();

        // reference_one_thana_id
        cy.get('[formControlName="reference_one_thana_id"]').click();
        cy.get(
          `.cdk-virtual-scroll-content-wrapper > [title="${item.reference_one_thana_id}"]`
        ).click();

        cy.get('button[type="submit"]').click();
        cy.wait(500);
        cy.get('.flex > .primary-button').click();
        cy.wait(3000);
      });
    });
  });
});
