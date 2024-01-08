describe("Interactive Canvas Rectangle Operations", () => {
  it("draws, moves, resizes a rectangle and performs undo/redo actions", () => {
    cy.visit("/");
    cy.wait(500);

    cy.findByRole("button", { name: "Open information dialog" }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: "Open information dialog" }).click();
    cy.wait(500);
    cy.findByRole("button", { name: "close" }).click();
    cy.wait(500);

    cy.findByLabelText("rectangle").click();
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 50, clientY: 60 })
      .trigger("mousemove", { clientX: 200, clientY: 200 })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByLabelText("selection").click();
    cy.wait(500);

    // Caculate the center of the canvas
    const canvasWidth = Cypress.config("viewportWidth");
    const canvasHeight = Cypress.config("viewportHeight");

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 125, clientY: 130 })
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

    cy.findByLabelText("rectangle").click();
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { clientX: 300, clientY: 300 })
      .trigger("mousemove", { clientX: 450, clientY: 450 })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByRole("button", { name: "Zoom Out" }).should("be.visible");
    for (let i = 0; i < 20; i++) {
      cy.findByRole("button", { name: "Zoom Out" }).click();
    }
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { which: 2, button: 1, clientX: 250, clientY: 250 })
      .trigger("mousemove", { which: 2, clientX: 500, clientY: 250 })
      .trigger("mouseup", { which: 2, button: 1 });
    cy.wait(500);

    cy.get("#canvas")
      .trigger("mousedown", { which: 2, button: 1, clientX: 250, clientY: 250 })
      .trigger("mousemove", { which: 2, clientX: 0, clientY: 250 })
      .trigger("mouseup", { which: 2, button: 1 });
    cy.wait(500);

    cy.findByLabelText("selection").click();
    cy.wait(500);

    // Caculate the top-right corner of the first rectangle
    const assumedTopRightX = canvasWidth / 2 + 75;
    const assumedTopRightY = canvasHeight / 2 - 70;

    cy.get("#canvas")
      .trigger("mousedown", {
        clientX: assumedTopRightX,
        clientY: assumedTopRightY,
      })
      .wait(100)
      .trigger("mousemove", {
        clientX: assumedTopRightX + 50,
        clientY: assumedTopRightY - 50,
      })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByRole("button", { name: "Undo last action" }).should("be.visible");
    for (let i = 0; i < 2; i++) {
      cy.findByRole("button", { name: "Undo last action" }).click();
    }
    cy.wait(500);

    cy.findByRole("button", { name: "Redo last action" }).should("be.visible");
    for (let i = 0; i < 2; i++) {
      cy.findByRole("button", { name: "Redo last action" }).click();
    }
    cy.wait(500);
  });
});
