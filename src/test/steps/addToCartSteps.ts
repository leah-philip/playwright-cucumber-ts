import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

When("user search for a {string}", async function (book) {
  fixture.logger.info("Searching for a book: " + book)
  await fixture.page
    .locator(
      `//input[contains(@class,'mat-mdc-autocomplete-trigger searchbox')]`
    )
    .fill(book);
  await fixture.page
    .locator(`//mat-option[contains(@class,'mat-mdc-option mdc-list-item')]`)
    .click();
});

When("user add the book to the cart", async function () {
  await fixture.page
    .locator(`//span[normalize-space(text())='Add to Cart']`)
    .click();
  const toast = fixture.page.locator("simple-snack-bar");
  await expect(toast).toBeVisible();
  await toast.waitFor({ state: "hidden" });
});

Then("the cart badge should get updated", async function () {
  const badgeCount = await fixture.page
    .locator("#mat-badge-content-0")
    .textContent();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
