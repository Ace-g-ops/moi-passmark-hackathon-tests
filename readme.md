# Breaking Apps with Passmark Playwright OpenSource Tool 🤖

> Testing 5 live applications using Passmark — an AI-powered Playwright testing library by Bug0.
> No selectors. No page objects. Just plain English.

## What is this?

This repo contains AI-powered tests written with [Passmark](https://github.com/bug0inc/passmark) 
for 5 live web applications as part of the #BreakingAppsHackathon.

Instead of writing brittle CSS selectors, every test step is described in plain English 
and executed by AI via Playwright.

## Apps Tested

| App | Category | Status |
|-----|----------|--------|
| [Ayo Olopon](https://ayo-game-zeta.vercel.app) | Entertainment / Gaming | ✅ Passed |
| [Hoppscotch](https://hoppscotch.io) | Developer Tools | ✅ Passed |
| [Hashnode](https://hashnode.com) | Content & Community | ✅ Passed |
| [Rallly](https://rallly.co) | Productivity / Collaboration | ✅ Passed |
| [Cal.com](https://cal.com) | Scheduling / Productivity | ⚠️ Partial |

## Project Structure

```bash
tests/
```
```bash
ayo-olopon/
gameplay.spec.ts
```
```bash
hoppscotch/
api-request.spec.ts
```
```bash
hashnode/
feed.spec.ts
search.spec.ts
article.spec.ts
```
```bash
rallly/
create-poll.spec.ts
voting.spec.ts
```
```bash
cal/
booking.spec.ts

```

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/Ace-g-ops/moi-passmark-tests
cd moi-passmark-tests
```

**2. Install dependencies**
```bash
npm install
```

**3. Install Chromium**
```bash
npx playwright install chromium
```

**4. Create your `.env` file**
```env
OPENROUTER_API_KEY=your-key-here
```

**5. Run a test**
```bash
npx playwright test tests/ayo-olopon --project chromium
```

**6. Run all tests**
```bash
npx playwright test --project chromium

## Author

**Ace (Victor Ajibua)** · [@acethegeek](https://hashnode.com/@acethegeek) 
· [@that_LaravelGuy](https://x.com/that_LaravelGuy)
