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

test("Hashnode Feed Test", async ({ page }) => { 
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Hashnode Feed Test",
    steps: [
      { description: "Navigate to //https://https://hashnode.com/" },
      { description: "scroll down to view the feed" },
    ],

    assertions: [
      { assertion: "the sidebar with hashnode sections is visible" },
      { assertion: "the feed is displayed" },
      { assertion: "the feed contains relevant contents" },
    ],  
    test,
    expect
  });
});