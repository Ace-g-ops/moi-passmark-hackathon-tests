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

test("Cal Sign-UP Page Test", async ({ page }) => {
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Cal Sign-Up Page Test",
    steps: [
      { description: "Navigate to https://app.cal.com/signup" },
      { description: "click on continue with email" },
      { description: "choose a data region"},
      { description: "enter a username"},
      { description: "enter a random email address", data: { value: "{{run.email}}" } },
      { description: "enter a password"},
      { description: "click on Get Started"},
      { description: "wait for the Choose Plan page to be visible" },
      { description: "select the free plan"},
      
    ],
    assertions: [
      { assertion: "Wait for the add your details page to be visible." },
    ],
    test,
    expect
  });
});