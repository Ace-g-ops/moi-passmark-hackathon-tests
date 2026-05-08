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

test("Ayo-Olopon Gameplay Test", async ({ page }) => {
  test.setTimeout(120_000); // increase timeout for AI execution
  await runSteps({
    page,
    userFlow: "Play Ayo-Olopon Game",
    steps: [
      { description: "Navigate to https://ayo-game-zeta.vercel.app/" },
      { description: "Choose your Avatar" },
      { description: "Choose either Single Players or Two Players" },
      { description: "Select Difficulty level: Easy || Medium || Hard" },
      { description: "Start the game" },
    ],
    assertions: [{ assertion: "The game board is visible with pits and seeds, and it shows Player 1's turn" }],
    test,
    expect
  });
});