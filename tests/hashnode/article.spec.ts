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

test("Hashnode Article Search Test", async ({ page }) => { 
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Hashnode Article Search Test",
    steps: [
      { description: "Navigate to //https://https://hashnode.com/" },
      { description: "click on the search section on the sidebar" },
    ],

    assertions: [
      { assertion: "the search results are displayed" },
      { assertion: "the search results contain Laravel-related content" },
    ],  
    test,
    expect
  });
});