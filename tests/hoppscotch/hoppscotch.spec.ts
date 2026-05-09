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

test("HoppSCotch Test", async ({ page }) => {
  test.setTimeout(400_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "HoppScotch Test",
    steps: [
      { description: "Navigate to https://https://hoppscotch.io/" },
      { description: "clear the url bar and type https://openlibrary.org/search/authors.json?q=twain" },
      { description: "make sure the GET is selected as the method"},
      { description: "click on the send button"},    
    ],
    assertions: [
        { assertion: "A response is visible with status 200" },
        { assertion: "the response body contains Mark Twain's author details" },
        { assertion: "the response body contains the name 'Mark Twain'" },
    ],

    test,
    expect
  });
});