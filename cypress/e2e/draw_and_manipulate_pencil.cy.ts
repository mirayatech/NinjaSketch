describe("Interactive Canvas Freehand Drawing Operations", () => {
  it("draws, moves a freehand drawing and performs undo/redo actions", () => {
    cy.visit("/");
    cy.wait(500);

    cy.findByRole("button", { name: "Open information dialog" }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: "Open information dialog" }).click();
    cy.wait(500);
    cy.findByRole("button", { name: "close" }).click();
    cy.wait(500);

    cy.findByLabelText("pencil").click();
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 50, clientY: 100 })
      .trigger("mousemove", { clientX: 100, clientY: 150 })
      .trigger("mousemove", { clientX: 150, clientY: 200 })
      .trigger("mousemove", { clientX: 200, clientY: 250 })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByLabelText("selection").click();
    cy.wait(500);

    // Calculate the center of the canvas
    const canvasWidth = Cypress.config("viewportWidth");
    const canvasHeight = Cypress.config("viewportHeight");

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 125, clientY: 175 })
      .trigger("mousemove", {
        clientX: canvasWidth / 2,
        clientY: canvasHeight / 2,
      })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByRole("button", { name: "Zoom In" }).should("be.visible");
    for (let i = 0; i < 20; i++) {
      cy.findByRole("button", { name: "Zoom In" }).click();
    }
    cy.wait(500);

    cy.findByLabelText("pencil").click();
    cy.get("#canvas")
      .trigger("mousedown", {
        clientX: canvasWidth / 2 + 100,
        clientY: canvasHeight / 2,
      })
      .trigger("mousemove", {
        clientX: canvasWidth / 2 + 150,
        clientY: canvasHeight / 2 + 50,
      })
      .trigger("mousemove", {
        clientX: canvasWidth / 2 + 200,
        clientY: canvasHeight / 2 + 100,
      })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByRole("button", { name: "Zoom Out" }).should("be.visible");
    for (let i = 0; i < 20; i++) {
      cy.findByRole("button", { name: "Zoom Out" }).click();
    }
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { which: 2, button: 1, clientX: 250, clientY: 250 })
      .trigger("mousemove", { which: 2, clientX: 0, clientY: 0 })
      .trigger("mouseup", { which: 2, button: 1 });
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
