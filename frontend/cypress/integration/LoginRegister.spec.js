import BASE_ROUTE from "../../src/utils/routes";
import { allFormInputErrors } from "../tools/allFormInputErrors";
import { isInputErrorByLabel } from "../tools/isInputErrorByLabel";

describe("Login/Register page", () => {
  it("displays calendar if you are logged in", () => {
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
      .as("checkUser");

    cy.wait("@checkUser").get("main").should("not.exist");
  });

  describe("renders properly", () => {
    before(() => {
      cy.visit("/");
    });

    it("has logo link", () => {
      cy.findByRole("link", { name: "workout planner" }).should("exist");
    });

    it("has navbar with 4 buttons/links", () => {
      cy.findByRole("navigation").as("nav").should("exist");
      cy.get("@nav").children().should("have.length", 4);
    });

    it("has a welcoming header and a paragraph", () => {
      cy.get('[aria-label="welcome-header"]')
        .should("exist")
        .and("have.length", 1)
        .next()
        .should("have.attr", "aria-label", "welcome-paragraph")
        .and("have.length", 1);
    });

    it("has two login button and one register", () => {
      cy.findAllByRole("button", { name: "Register" })
        .should("exist")
        .and("have.length", 1);

      cy.findAllByRole("button", { name: "Log in" })
        .should("exist")
        .and("have.length", 2);
    });
  });

  describe("Login form", () => {
    it("has two inputs - username and password", () => {
      cy.findAllByLabelText("Username")
        .should("exist")
        .and("have.length", 1)
        .invoke("attr", "placeholder")
        .should("match", /username/i);

      cy.findAllByLabelText("Password")
        .should("exist")
        .and("have.length", 1)
        .invoke("attr", "placeholder")
        .should("match", /password/i);
    });

    it("doesn't display any error message by default", () => {
      allFormInputErrors(false);
    });

    it("displays error message when submitted empty form", () => {
      cy.get("form").findByRole("button", { name: "Log in" }).click();

      allFormInputErrors(true);
    });

    it("doesn't display any error message when values of proper length are passed", () => {
      cy.findByLabelText("Username").type("test_username");
      cy.findByLabelText("Password").type("test_passwd");

      allFormInputErrors(false);
    });

    it("displays error message when values of improper length are passed", () => {
      cy.findByLabelText("Username").type("{selectall}te");
      cy.findByLabelText("Password").type("{selectall}te");

      allFormInputErrors(true);
    });

    it("displays error message when a non-existing user signs in", () => {
      cy.findByLabelText("Username").type("{selectall}testrandomusercypress");
      cy.findByLabelText("Password").type("{selectall}testrandompasswdcypress");
      cy.get("form").findByRole("button", { name: "Log in" }).click();

      allFormInputErrors([true, false]);
    });

    it("displays toast when some other than axios error happens and closes it when clicked close button", () => {
      cy.intercept(
        { method: "POST", url: "http://localhost:8080/user" },
        {
          statusCode: 404,
          body: {
            message: "An error occured",
          },
        }
      ).as("login");

      cy.get("form").findByRole("button", { name: "Log in" }).click();

      cy.wait("@login").get(".Toastify").as("toast");

      cy.get("@toast")
        .children()
        .should("have.length.above", 0)
        .get(".Toastify__close-button")
        .click();

      cy.get("@toast").children().should("have.length", 0);
    });

    it("changes form to register form", () => {
      cy.visit("" + BASE_ROUTE);
      cy.findByRole("button", { name: "Register" }).click();

      cy.get("input").should("have.length", 3);
      cy.findAllByRole("button", { name: "Register" }).should("have.length", 2);
      cy.findAllByRole("button", { name: "Log in" }).should("have.length", 1);
    });
  });

  describe("Register form", () => {
    it("has 3 inputs - username, email and password", () => {
      cy.findAllByLabelText("Username")
        .should("exist")
        .and("have.length", 1)
        .invoke("attr", "placeholder")
        .should("match", /username/i);

      cy.findAllByLabelText("Email")
        .should("exist")
        .and("have.length", 1)
        .invoke("attr", "placeholder")
        .should("match", /email/i);

      cy.findAllByLabelText("Password")
        .should("exist")
        .and("have.length", 1)
        .invoke("attr", "placeholder")
        .should("match", /password/i);
    });

    it("doesn't display any error message by default", () => {
      allFormInputErrors(false);
    });

    it("displays error message when submitted empty form", () => {
      cy.get("form").findByRole("button", { name: "Register" }).click();

      allFormInputErrors(true);
    });

    it("doesn't display any error message when values of proper length are passed", () => {
      cy.findByLabelText("Username").type("test_username");
      cy.findByLabelText("Password").type("test_passwd");
      cy.findByLabelText("Email").type("email@gmail.com");

      allFormInputErrors(false);
    });

    it("displays error message when values of improper length are passed", () => {
      cy.findByLabelText("Username").type("{selectall}te");
      cy.findByLabelText("Password").type("{selectall}te");
      cy.findByLabelText("Email").type("{selectall}email");

      allFormInputErrors(true);
    });

    it("displays toast when some other than axios error happens and closes it when clicked close button", () => {
      cy.intercept(
        { method: "POST", url: "http://localhost:8080/user/register" },
        {
          statusCode: 404,
          body: {
            message: "An error occured",
          },
        }
      ).as("register");

      cy.findByLabelText("Username").type("{selectall}test_username");
      cy.findByLabelText("Password").type("{selectall}test_passwd");
      cy.findByLabelText("Email").type("{selectall}test_email@gmail.com");
      cy.get("form").findByRole("button", { name: "Register" }).click();

      cy.wait("@register").get(".Toastify").as("toast");

      cy.get("@toast")
        .children()
        .should("have.length.above", 0)
        .get(".Toastify__close-button")
        .click();

      cy.get("@toast").children().should("have.length", 0);
    });
  });
});
