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
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Rally Voting Test",
    steps: [
      { description: "Navigate to https://rallly.co/" },
      { description: "Click on an existing poll" },
      { description: "Select a date option to vote for" },
    ],

    assertions: [
      { assertion: "Your vote is registered and visible in the poll results" },
    ],  
    test,
    expect
  });
});