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

test("Hashnode Search Test", async ({ page }) => { 
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Hashnode Search Test",
    steps: [
      { description: "Navigate to //https://https://hashnode.com/search" },
      { description: "click on the search bar and type 'Laravel'" },
      {description: "tap enter to click the search button"},
    ],

    assertions: [
      { assertion: "Search results are visible with article titles related to Laravel" }
    ],  
    test,
    expect
  });
});