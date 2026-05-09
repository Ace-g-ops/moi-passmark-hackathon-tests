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

test("Rally-Poll Test", async ({ page }) => {
  test.setTimeout(300_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Rally Poll Test",
    steps: [
  { description: "Navigate to https://rallly.co" },
  { description: "Click New Poll or Create a poll" },
  { description: "Fill in the event title with 'Team Sync Meeting'" },
  { description: "Fill in the description" },
  { description: "Select a few date options" },
  { description: "Click Continue or Next" },
],
assertions: [
  { assertion: "A shareable poll link or confirmation is visible" },
  { assertion: "The poll title 'Team Sync Meeting' is displayed" }
]