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
      { description: "Navigate to https://cal.com" },
      { description: "Click on 'Book a Demo' button" },
      { description: "Fill out the booking form with name, email, and company details" },
      { description: "Submit the booking form" },
      { description: "Wait for the confirmation message or redirection to the calendar scheduling page" },
    ],
    assertions: [{ assertion: "Confirmation message or calendar scheduling page is visible" }],
    test,
    expect
  });
});
