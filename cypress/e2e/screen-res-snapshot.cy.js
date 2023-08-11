// Snapshot of Home, Online Banking, and Feedback pages in different devices and desktop resolutions

/* 
Required plugins:
"cypress-image-snapshot"
*/

// urls located in cypress.env.json file

const viewports = ["ipad-2", "iphone-6+", [1920, 1080], [1366, 768]];

const urls = [
  Cypress.env("url").home,
  Cypress.env("url").onlineBanking,
  Cypress.env("url").feedback,
];

describe("RESOLUTION", () => {
  viewports.forEach((resolution) => {
    urls.forEach((url) => {
      it(`${resolution} in ${url}`, () => {
        const currentTime = new Date(Date.UTC(2020, 1, 1)).getDate();
        cy.clock(currentTime);
        cy.setResolution(resolution);
        cy.visit(url);
        cy.matchImageSnapshot();
      });
    });
  });
});
