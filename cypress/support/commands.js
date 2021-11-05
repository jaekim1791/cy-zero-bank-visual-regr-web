import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

// Load baseUrl and verify
Cypress.Commands.add("baseUrl", () => {
  cy.visit("/");

  cy.readFile("cypress.json").then((url) => {
    const baseUrl = url.baseUrl;
    cy.url().should("include", baseUrl);
  });

  cy.get("#homeMenu").contains("Home");
});

// Log in
Cypress.Commands.add("logIn", () => {
  cy.get("#signin_button").click();
  cy.fixture("people").then((users) => {
    const username = users.loginId1.username;
    const password = users.loginId1.password;

    cy.get("#user_login").type(username);
    cy.get("#user_password").type(password);
    cy.get("#user_remember_me").check();
    cy.get(".btn.btn-primary").click();
  });
});

// Log out
Cypress.Commands.add("logOut", () => {
  cy.get(".icon-user").click();
  cy.get("#logout_link").contains("Logout").click();
  cy.url().should("include", Cypress.env("url").home);
  cy.get("#signin_button").contains("Signin").click();
  cy.get(".page-header").contains("Log in to ZeroBank");
});

/////////////////////////////////////////////////////////////////////////////////

// "cypress-image-snapshot" plugin settings
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: "percent", // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: "viewport", // capture viewport in screenshot
});

// Custom command to pass in the resolution
Cypress.Commands.add("setResolution", (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1]);
  } else {
    cy.viewport(size);
  }
});
