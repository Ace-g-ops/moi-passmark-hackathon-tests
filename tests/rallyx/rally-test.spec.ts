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

test("Rally-Voting Test", async ({ page }) => {
  test.setTimeout(120_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Rally-Voting Test",
    steps: [
      { description: "Navigate to https://rallly.co/" },
      { description: "Fill in your name" },
      { description: "Select availability for each date. options"},
      { description: "Click submit or confirm vote" },
      { description: "Submit"}
      
    ],
    assertions: [{
 assertion: "The poll title and date options visible."
assertion: " A submit or confirm vote button is visible after selecting availability."
assertion: "A thank you or confirmation message is shown after voting"
 }],
    test,
    expect
  });
});