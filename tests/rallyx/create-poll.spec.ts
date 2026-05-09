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

test("Rally-Poll Test", async ({ page }) => {
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Rally Poll Test",
    steps: [
      { description: "Navigate to https://rallly.co/" },
      { description: "Click new poll or create new poll" },
      { description: "fill in the event title with 'Team Sync Meeting'" },
      { description: "fill in the description" },
      { description: "Select a particular date" },
      { description: "Click Continue or Next" }
    ],
    assertions: [
      { assertion: "wait for an alert with a shareable poll link or confirmation to be visible" },
      { assertion: "A shareable poll link or confirmation is visible" },
    ],
    test,
    expect
  });
});