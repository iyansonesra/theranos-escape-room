import { test, expect, Page } from "@playwright/test";
async function openEntry(page: Page, name: string) {
  await page.locator(".directory-row").filter({ hasText: name }).click();
}
async function login(page: Page, team: string) {
  await page.getByLabel("TEAM NAME").fill(team);
  await page.getByRole("button", { name: "Enter database / start" }).click();
  await expect(
    page.getByRole("dialog", { name: "You’re in. Look closer." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close channel" }).click();
  await expect(
    page.getByRole("region", { name: "Archive root directory" }),
  ).toBeVisible();
}
async function dismissDebrief(page: Page, finding: string) {
  const note = page
    .getByRole("dialog")
    .filter({ has: page.locator("#evidence-note-title") });
  await expect(note).toBeVisible();
  await expect(note.locator("#evidence-note-explanation")).toContainText(
    finding,
  );
  await page
    .getByRole("button", { name: "Return to files", exact: true })
    .click();
  await expect(note).not.toBeVisible();
}
test("teams explore directories, unlock files manually, and escape", async ({
  page,
}) => {
  await page.goto("/?duration=12");
  await login(page, "Audit Trail");
  await expect(
    page.locator(".directory-row").filter({ hasText: "02_the_warning" }),
  ).toBeDisabled();
  await expect(
    page.getByLabel("Your evidence answer", { exact: true }),
  ).toHaveCount(0);
  await page.screenshot({
    path: "test-results/archive-root.png",
    fullPage: true,
  });
  await openEntry(page, "01_the_claim");
  await expect(
    page
      .locator(".directory-row")
      .filter({ hasText: "march_elisa_qc_2014.csv" }),
  ).toBeDisabled();
  await openEntry(page, "website_comments_2013.eml");
  const answer = async (value: string, dismiss = true) => {
    await page.getByLabel("Your evidence answer", { exact: true }).fill(value);
    await page.getByRole("button", { name: "Verify finding" }).click();
    if (dismiss) await dismissDebrief(page, value.toUpperCase());
  };
  await answer("all");
  // A successful finding unlocks a record; it never opens that record for the team.
  await expect(
    page.getByRole("heading", { name: "Website comments", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "March ELISA QC failures", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "← Folder contents" }).click();
  await expect(
    page
      .locator(".directory-row")
      .filter({ hasText: "march_elisa_qc_2014.csv" }),
  ).toBeEnabled();
  await openEntry(page, "march_elisa_qc_2014.csv");
  await answer("TT3");
  await page.getByRole("button", { name: "Return to archive root" }).click();
  await openEntry(page, "02_the_warning");
  await openEntry(page, "forwarded_website_comments_2013.eml");
  await page.locator(".scan").last().click();
  await expect(page.locator(".zoom-dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close document preview" }).click();
  await answer("several", false);
  await expect(page.locator(".evidence-debrief")).toBeVisible();
  await page.reload();
  await page
    .getByRole("button", { name: "Continue existing investigation" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "You’re in. Look closer." }),
  ).not.toBeVisible();
  await dismissDebrief(page, "SEVERAL");
  await openEntry(page, "03_the_money_story");
  await openEntry(page, "revenue_model_2015.csv");
  await expect(page.locator(".financial-table")).toHaveCount(2);
  await expect(
    page.locator(".financial-table").first().locator("tbody tr"),
  ).toHaveCount(4);
  await expect(
    page.locator(".financial-table").last().locator("tbody tr"),
  ).toHaveCount(4);
  await expect(page.locator(".financial-table").first()).toContainText("$153M");
  await expect(page.locator(".financial-table").last()).toContainText("$323M");
  await expect(page.locator(".financial-table").first()).toContainText(
    "39,409",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(
    await page
      .getByRole("region", { name: "Financial model from July 16, 2015" })
      .evaluate((el) => el.scrollWidth > el.clientWidth),
  ).toBeTruthy();
  await page.screenshot({
    path: "test-results/financial-model-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.getByRole("tab", { name: "sec_complaint_2018.record" }).click();
  await page
    .getByLabel(
      "Projection reduction and historical revenue, separated by a hyphen",
    )
    .fill("60 - 108");
  await page.getByRole("button", { name: "Verify finding" }).click();
  await dismissDebrief(page, "$60 million");
  await page.getByRole("button", { name: "Yes", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Finding not verified");
  await expect(page.locator(".evidence-debrief")).not.toBeVisible();
  await page.getByRole("button", { name: "No", exact: true }).click();
  await dismissDebrief(page, "“No.”");
  await page.getByRole("button", { name: "Return to archive root" }).click();
  await openEntry(page, "04_the_transfer");
  await openEntry(page, "superseding_information_2020.record");
  await page.getByLabel("Transfer count", { exact: true }).fill("6");
  await page.getByRole("checkbox", { name: /payment was prompted/ }).check();
  await page.getByRole("checkbox", { name: /payment came after/ }).check();
  await page.getByRole("button", { name: "Verify finding" }).click();
  await expect(page.getByRole("status")).toContainText("Finding not verified");
  await expect(page.locator(".evidence-debrief")).not.toBeVisible();
  await page.getByRole("checkbox", { name: /payment was prompted/ }).uncheck();
  await page
    .getByRole("checkbox", { name: /charging paragraph places/ })
    .check();
  await page.getByRole("checkbox", { name: /bank entry identifies/ }).check();
  await page.getByRole("button", { name: "Verify finding" }).click();
  await expect(page.getByRole("status")).toContainText("Finding not verified");
  await page.getByRole("checkbox", { name: /bank entry identifies/ }).uncheck();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: "test-results/wire-reasoning-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.getByRole("button", { name: "Verify finding" }).click();
  await dismissDebrief(page, "$38,336,632");
  await page.getByRole("button", { name: "Return to archive root" }).click();
  await openEntry(page, "executive_override");
  await expect(page.getByText("K7Q", { exact: true })).toHaveCount(0);
  await page
    .getByLabel("Complete executive credential")
    .fill("K7Q-51-108-7-38");
  await page.getByRole("button", { name: "Unlock archive" }).click();
  await expect(page.getByRole("status")).toContainText("ACCESS DENIED");
  await page
    .getByLabel("Complete executive credential")
    .fill("k7q - 51 - 108 - 07 - 38");
  await page.getByRole("button", { name: "Unlock archive" }).click();
  await expect(
    page.getByRole("heading", { name: /You escaped/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show evidence worksheet" }).click();
  await page
    .getByText("How the evidence fits together", { exact: true })
    .click();
  await expect(page.locator(".completed-case-context")).toContainText(
    "beyond a reasonable doubt",
  );
  await expect(page.locator("#full-worksheet")).toContainText("Audit Trail");
  await page.getByRole("button", { name: /CASE FILE 01/ }).click();
  await openEntry(page, "website_comments_2013.eml");
  await expect(
    page.getByRole("heading", { name: "Website comments", exact: true }),
  ).toBeVisible();
});
test("mobile exploration, briefing persistence, hints, expiry, and presenter printing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await login(page, "Mobile investigators");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await openEntry(page, "01_the_claim");
  await openEntry(page, "website_comments_2013.eml");
  await page.getByRole("button", { name: "Request hint (2 left)" }).click();
  await expect(
    page.getByRole("button", { name: "Request hint (1 left)" }),
  ).toBeVisible();
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.evaluate(() => {
    const g = JSON.parse(localStorage.getItem("theranos-vault-v1")!);
    g.startedAt = Date.now() - 16 * 60000;
    localStorage.setItem("theranos-vault-v1", JSON.stringify(g));
  });
  await page.reload();
  await page
    .getByRole("button", { name: "Continue existing investigation" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "You’re in. Look closer." }),
  ).not.toBeVisible();
  await expect(page.locator(".security-alert")).toContainText(
    "AUDIT WINDOW EXPIRED",
  );
  await openEntry(page, "01_the_claim");
  await openEntry(page, "website_comments_2013.eml");
  await expect(
    page.getByRole("button", { name: "Verify finding" }),
  ).toBeEnabled();
  await page.goto("/#/presenter");
  await expect(page.getByText("K7Q", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: /I’m the presenter/ }).click();
  await expect(page.getByText("K7Q", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Print override card" }),
  ).toBeVisible();
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => {
    window.print = () => {
      const clone = document.querySelector("#print-root");
      (window as unknown as { printCheck: unknown }).printCheck = {
        text: clone?.textContent,
        appHidden:
          getComputedStyle(document.querySelector("#root")!).display === "none",
        cardVisible: !!clone && getComputedStyle(clone).display === "block",
      };
    };
  });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    buttons
      .find((b) => b.textContent?.includes("Print override card"))!
      .click();
  });
  const printCheck = await page.evaluate(
    () =>
      (
        window as unknown as {
          printCheck: {
            text: string;
            appHidden: boolean;
            cardVisible: boolean;
          };
        }
      ).printCheck,
  );
  expect(printCheck.text).toContain("K7Q");
  expect(printCheck.appHidden).toBeTruthy();
  expect(printCheck.cardVisible).toBeTruthy();
});
