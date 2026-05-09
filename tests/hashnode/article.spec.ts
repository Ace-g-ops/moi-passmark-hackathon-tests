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
      { description: "click on any articles on the feed" },
    ],

    assertions: [
      { assertion: "an article cover image or thumbnail is visible at the top" },
      { assertion: "the author name is visible on the page" },
      { assertion: "the contents of the article is visible below the cover image or thumbnail"}
    ],  
    test,
    expect
  });
});