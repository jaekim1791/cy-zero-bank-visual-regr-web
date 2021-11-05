// Snapshot of username after signing in and and disclaimer on Online Banking and Feedback pages.

/*
Custom commands: 
		baseUrl
		logIn
		logOut
*/

/* 
Required plugins:
"cypress-image-snapshot"
*/

// urls located in cypress.env.json file

const loggedInUrls = [
  Cypress.env("url").onlineBanking,
  Cypress.env("url").feedback,
];

describe("SNAPSHOT OF LOGGED IN USER NAME", () => {
  Cypress.Cookies.debug(true, { verbose: false });

  beforeEach(() => {
    // Site deletes cookie after signed in
    Cypress.Cookies.preserveOnce("JSESSIONID");
  });

  it("load base url", () => {
    cy.baseUrl();
  });

  it("log in", () => {
    cy.logIn();
  });

  it("take snapshot of username", () => {
    cy.get(".dropdown-toggle").contains("username").matchImageSnapshot();
  });
});

describe("SNAPSHOT OF DISCLAIMER", () => {
  loggedInUrls.forEach((loggedInUrls) => {
    it(`${loggedInUrls}`, () => {
      const currentTime = new Date(Date.UTC(2020, 1, 1)).getDate();
      cy.clock(currentTime);
      cy.visit(loggedInUrls);
      cy.get(".disclaimer.span12")
        .contains(
          "Copyright © 2012-2018, Micro Focus Development Company. All rights reserved."
        )
        .matchImageSnapshot();
    });
  });
});
