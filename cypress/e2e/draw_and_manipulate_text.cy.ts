describe("Interactive Canvas Text Operations", () => {
  it("adds, moves text and changes its content", () => {
    cy.visit("/");
    cy.wait(500);

    cy.findByRole("button", { name: "Open information dialog" }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: "Open information dialog" }).click();
    cy.wait(500);
    cy.findByRole("button", { name: "close" }).click();
    cy.wait(500);

    cy.findByLabelText("text").click();
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 100, clientY: 100 })
      .trigger("mouseup");
    cy.get(".textArea").type("Hello, World!").blur();
    cy.wait(500);

    cy.findByLabelText("selection").click();
    cy.wait(500);

    // Calculate the center of the canvas
    const canvasWidth = Cypress.config("viewportWidth");
    const canvasHeight = Cypress.config("viewportHeight");

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 100, clientY: 100 })
      .trigger("mousemove", {
        clientX: canvasWidth / 2,
        clientY: canvasHeight / 2,
      })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByRole("button", { name: "Zoom In" }).should("be.visible");
    for (let i = 0; i < 10; i++) {
      cy.findByRole("button", { name: "Zoom In" }).click();
    }
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", {
        clientX: canvasWidth / 2,
        clientY: canvasHeight / 2,
      })
      .trigger("mouseup");
    cy.get(".textArea").clear().type("Miraya is here!").blur();
    cy.wait(500);

    cy.findByRole("button", { name: "Undo last action" })
      .should("be.visible")
      .click();
    cy.wait(500);

    cy.findByRole("button", { name: "Redo last action" })
      .should("be.visible")
      .click();
    cy.wait(500);
  });
});
