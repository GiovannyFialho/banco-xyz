describe("Transaction", () => {
  const login = (name: string, password: string) => {
    cy.session(name, () => {
      cy.visit("/sign-in");

      cy.get('[data-testid="fiend-email"]').type(name);
      cy.get('[data-testid="fiend-password"]').type(password);

      cy.get('[data-testid="btn-sign-in"]').click();

      cy.url().should("not.include", "/sign-in");
    });
  };

  const transferModal = () => {
    login("gabriel@topaz.com", "1111");

    cy.visit("/");

    cy.get('[data-testid="trigger-transfer"]').click();
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should open transfer modal / drawer ", () => {
    login("gabriel@topaz.com", "1111");

    cy.visit("/");

    cy.get('[data-testid="trigger-transfer"]').click();
  });

  it("should show an errors when trying submit without data", () => {
    transferModal();

    cy.get('[data-testid="submit-transfer"]').click();

    cy.get('[data-testid="value-error"]').should("exist");
    cy.get('[data-testid="currency-error"]').should("exist");
    cy.get('[data-testid="payeerDocument-error"]').should("exist");
    cy.get('[data-testid="transferDate-error"]').should("exist");
  });

  it("should make the transfer", () => {
    transferModal();

    cy.get('[data-testid="field-value"]').type("1000");

    cy.get('[data-testid="field-currency"]').click();
    cy.get('[data-testid="currency-options"]')
      .find("span")
      .contains("Estados Unidos")
      .parent()
      .click();

    cy.get('[data-testid="field-payeerDocument"]').type("21895400408");

    cy.get('[data-testid="field-transferDate"]').click();
    cy.get('[data-testid="calendar"]').find("button").contains(new Date().getDate()).click();

    cy.get('[data-testid="submit-transfer"]').click();
  });
});
