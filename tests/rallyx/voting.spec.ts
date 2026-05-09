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
      { description: "Navigate to //https://rallly.co/invite/uO38fOjM9Vzh" },
      { description: "Click on continue button to join the poll" },
      { description: "fill in your details" },
      {description: "click on submit button"},
    ],

    assertions: [
      { assertion: "your details are submitted" },
      { assertion: "you can see your name on the list of participants" },
    ],  
    test,
    expect
  });
});