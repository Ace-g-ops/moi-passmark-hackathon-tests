import { test, expect } from "@playwright/test";
import { runSteps, configure } from "passmark";
configure({
  ai: {
    gateway: "openrouter",
    models: {
      stepExecution: "google/gemini-2.5-flash",
      userFlowLow: "google/gemini-2.5-flash",
      userFlowHigh: "google/gemini-2.5-pro-preview",
      assertionPrimary: "google/gemini-2.5-flash",
      assertionSecondary: "google/gemini-2.5-flash",
      assertionArbiter: "google/gemini-2.5-pro-preview",
      utility: "google/gemini-2.5-flash",
    }
  }
});

test.use({
  headless: !!process.env.CI,
});

test("Rally Platform Test", async ({ page }) => {
  test.setTimeout(120_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Rally Event and Ticket Booking",
    steps: [
      { description: "Navigate to https://rally.co/" },
      { description: "Create an event" },
      { description: "add a title"},
      { description: "add some date options" },
      { description: "Submit"}

    ],
    assertions: [{ assertion: "The event was created and the shareable link is visible" }],
    test,
    expect
  });
});