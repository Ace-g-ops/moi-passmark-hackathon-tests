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
  test.setTimeout(400_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Hashnode Article Search Test",
    steps: [
      { description: "Navigate to //https://https://hashnode.com/" },
      { description: "click on just one articles on the feed" },
    ],

    assertions: [
      { assertion: "the author profile picture is visible on the page" },
      { assertion: "the author name is visible on the page" },
      { assertion: "the content of the article is visible on the page" },
    ],  
    test,
    expect
  });
});