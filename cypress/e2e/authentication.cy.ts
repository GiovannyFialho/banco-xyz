describe("Authentication page", () => {
  const login = (name: string, password: string) => {
    cy.session(name, () => {
      cy.visit("/sign-in");

      cy.get('[data-testid="fiend-email"]').type(name);
      cy.get('[data-testid="fiend-password"]').type(password);

      cy.get('[data-testid="btn-sign-in"]').click();

      cy.url().should("not.include", "/sign-in");
    });
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should redirect to the sign-in page if there is no authentication", () => {
    cy.visit("/");

    cy.url().should("include", "/sign-in");
  });

  it("should show an error when trying to submit without email and password", () => {
    cy.visit("/sign-in");

    cy.get('[data-testid="btn-sign-in"]').click();

    cy.get('[data-testid="fiend-error-email"]').should("exist");
    cy.get('[data-testid="fiend-error-password"]').should("exist");
  });

  it("should redirect to dashboard after sign-in", () => {
    login("gabriel@topaz.com", "1111");

    cy.visit("/");
    cy.get('[data-testid="header-component"]').should("exist");
  });

  it("should sign-out", () => {
    login("gabriel@topaz.com", "1111");

    cy.visit("/");

    cy.get('[data-testid="trigger-menu"] > .text-lg').click();
    cy.get('[data-testid="trigger-signOut"]').click();

    cy.url().should("contain", "/sign-in");
  });
});
