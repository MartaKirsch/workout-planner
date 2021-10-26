import {
  ADD_SET_ROUTE,
  BASE_ROUTE,
  ADD_EXERCISE_ROUTE,
} from "../../src/utils/routes";

describe("Navigation when user is logged in", () => {
  it("renders 5 buttons", () => {
    cy.visit("/")
      .intercept(
        { method: "GET", url: "http://localhost:8080/user" },
        {
          body: {
            username: "cypress",
            isLoggedIn: true,
          },
        }
      )
      .as("checkUser")
      .reload();

    cy.wait("@checkUser").get("nav").children().should("have.length", 5);
  });

  it("redirects after click of navbutton", () => {
    cy.get("nav").children().first().as("menu").children().first().click();

    cy.get("nav").within(() => {
      cy.findByRole("button", { name: /Add routine/i }).click();
      cy.location("pathname").should((loc) => expect(loc).to.eq(ADD_SET_ROUTE));

      cy.findByRole("button", { name: /Add exercise/i }).click();
      cy.location("pathname").should((loc) =>
        expect(loc).to.eq(ADD_EXERCISE_ROUTE)
      );

      cy.findByRole("button", { name: /calendar/i }).click();
      cy.location("pathname").should((loc) => expect(loc).to.eq(BASE_ROUTE));
    });
  });

  it("redirects to login page after log out", () => {
    cy.get("nav").within(() => {
      cy.findByRole("button", { name: /log out/i }).click();
      cy.location("pathname").should((loc) => expect(loc).to.eq(BASE_ROUTE));
    });
  });
});

describe("Navigation", () => {
  before(() => {
    cy.visit("/");
  });

  it("renders 4 buttons", () => {
    cy.get("nav").children().should("have.length", 4);
  });

  it("slides in and out when menu button is clicked", () => {
    cy.get("nav").children().first().as("menu");

    cy.get("nav").should("have.css", "transform").and("eq", "none");
    cy.get("@menu").children().first().click();
    cy.get("nav").should("have.css", "transform").and("not.eq", "none");
    cy.get("@menu").children().first().click();
    cy.get("nav").should("have.css", "transform").and("eq", "none");
  });

  it("hides when clicked outside of it", () => {
    cy.get("nav").children().first().as("menu");

    cy.get("nav").should("have.css", "transform").and("eq", "none");
    cy.get("@menu").children().first().click();
    cy.get("nav").should("have.css", "transform").and("not.eq", "none");
    cy.get("header").click(10, 10);
    cy.get("nav").should("have.css", "transform").and("eq", "none");
  });

  it("redirects to login page after click of navbutton", () => {
    cy.get("nav").children().first().as("menu").children().first().click();

    cy.get("nav").within(() => {
      cy.findByRole("button", { name: /Add routine/i }).click();
      cy.location("pathname").should((loc) => expect(loc).to.eq(BASE_ROUTE));

      cy.findByRole("button", { name: /Add exercise/i }).click();
      cy.location("pathname").should((loc) => expect(loc).to.eq(BASE_ROUTE));

      cy.findByRole("button", { name: /calendar/i }).click();
      cy.location("pathname").should((loc) => expect(loc).to.eq(BASE_ROUTE));
    });
  });
});
