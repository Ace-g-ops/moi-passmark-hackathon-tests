import { test, expect} from "@playwright/test";
import { configure, runSteps } from "passmark";

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

test("Cal Booking Test", async ({ page }) => {
  test.setTimeout(120_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Cal Booking Test",
        steps: [
      { description: "Navigate to https://cal.com/rick" },
      { description: "Select a date 3 days from now" },
      { description: "Select the first available time slot" },
      { description: "Fill in the booking form with name, email, and any required information" },
      { description: "Submit the booking form" },
      { description: "Wait for confirmation message or calendar scheduling page to be visible" },
    ],
    assertions: [{ assertion: "Confirmation message or calendar scheduling page is visible" }],
    test,
    expect
  });
});
