describe("Interactive Canvas Line Operations", () => {
  it("draws, moves a line and performs undo/redo actions", () => {
    cy.visit("/");
    cy.wait(500);

    cy.findByRole("button", { name: "Open information dialog" }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: "Open information dialog" }).click();
    cy.wait(500);
    cy.findByRole("button", { name: "close" }).click();
    cy.wait(500);

    cy.findByLabelText("line").click();
    cy.wait(500);

    const startX = 50;
    const startY = 100;
    const endX = 300;
    const endY = 350;

    cy.get("#canvas")
      .trigger("mousedown", { clientX: startX, clientY: startY })
      .trigger("mousemove", { clientX: endX, clientY: endY })
      .trigger("mouseup");
    cy.wait(500);

    cy.findByLabelText("selection").click();
    cy.wait(500);

    // Calculate the midpoint of the line
    const midpointX = (startX + endX) / 2;
    const midpointY = (startY + endY) / 2;

    // Calculate the center of the canvas
    const canvasWidth = Cypress.config("viewportWidth");
    const canvasHeight = Cypress.config("viewportHeight");

    // Calculate the distance to move the midpoint of the line to the center of the canvas
    const moveX = canvasWidth / 2 - midpointX;
    const moveY = canvasHeight / 2 - midpointY;

    cy.get("#canvas")
      .trigger("mousedown", { clientX: midpointX, clientY: midpointY })
      .trigger("mousemove", {
        clientX: midpointX + moveX,
        clientY: midpointY + moveY,
      })
      .trigger("mouseup");
    cy.wait(500);

    // Zoom in
    cy.findByRole("button", { name: "Zoom In" }).should("be.visible");
    for (let i = 0; i < 20; i++) {
      cy.findByRole("button", { name: "Zoom In" }).click();
    }
    cy.wait(500);

    cy.findByLabelText("line").click();
    cy.wait(500);

    // Calculate new coordinates for the line
    const newStartX = midpointX + moveX + 50;
    const newStartY = midpointY + moveY;
    const newEndX = newStartX + 150;
    const newEndY = newStartY + 150;

    cy.get("#canvas")
      .trigger("mousedown", { clientX: newStartX, clientY: newStartY })
      .trigger("mousemove", { clientX: newEndX, clientY: newEndY })
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

    // Calculate new positions to resize the line
    const resizedLineEndX = canvasWidth / 2 + moveX + 100;
    const resizedLineEndY = canvasHeight / 2 + moveY - 50;

    cy.get("#canvas")
      .trigger("mousedown", { clientX: endX + moveX, clientY: endY + moveY })
      .trigger("mousemove", {
        clientX: resizedLineEndX,
        clientY: resizedLineEndY,
      })
      .trigger("mouseup");
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
