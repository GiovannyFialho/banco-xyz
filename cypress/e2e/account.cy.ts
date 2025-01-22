describe("Account", () => {
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

    login("gabriel@topaz.com", "1111");
  });

  it("should load balance", () => {
    cy.visit("/");

    cy.get('[data-testid="current-balance"]').should("exist");
  });

  it("should go to profile page", () => {
    cy.visit("/");

    cy.get('[data-testid="trigger-menu"]').click();
    cy.get('[data-testid="trigger-profile"]').click();

    cy.get('[data-testid="profile-name"]').should("exist");
    cy.get('[data-testid="profile-email"]').should("exist");
  });

  it("should go to account page", () => {
    cy.visit("/profile");

    cy.get('[data-testid="trigger-menu"]').click();
    cy.get('[data-testid="trigger-account"]').click();

    cy.get('[data-testid="current-balance"]').should("exist");
  });
});
