describe("Unknown page", () => {
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

  it("should show 404 component", () => {
    cy.visit("/unknown");

    cy.get('[data-testid="unknown-component"]').should("exist");
  });

  it("should send back to the sign-in page when there is no session", () => {
    cy.visit("/unknown");

    cy.get('[data-testid="trigger-back"]').click();

    cy.url().should("contain", "/sign-in");
  });

  it("should send back to the dashboard page when there is session", () => {
    login("gabriel@topaz.com", "1111");

    cy.visit("/unknown");

    cy.get('[data-testid="trigger-back"]').click();

    cy.url().should("not.include", "/sign-in");
  });
});
