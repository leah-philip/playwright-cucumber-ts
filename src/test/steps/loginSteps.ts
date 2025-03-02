import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the application", async function () {
  await fixture.page.goto(process.env.BASEURL);
  fixture.logger.info("Navigated to the application");
});

Given("User click on the login link", async function () {
  await fixture.page
    .locator("(//span[@class='mdc-button__label'])[2]")
    .click();
});

Given("User enter the username as {string}", async function (username) {
  await fixture.page
    .locator("input[formcontrolname='username']")
    .fill(username);
});

Given("User enter the password as {string}", async function (password) {
  await fixture.page
    .locator("input[formcontrolname='password']")
    .fill(password);
});

When("User click on the login button", async function () {
  await fixture.page
    .locator("(//span[text()='Login']/following-sibling::span)[2]")
    .click();
});

Then("Login should be success for {string}", async function (username) {
  await fixture.page.waitForTimeout(2000);
  const user = fixture.page.locator(
    `//span[normalize-space(text())='${username}']`
  );
  const userName = await user.textContent();
  console.log("Username: " + userName);
  fixture.logger.info("Username: " + userName);
});

When("Login should fail", async function () {
  const failureMesssage = fixture.page.locator(
    "(//span[text()='Login']/following-sibling::span)[2]"
  );
  await expect(failureMesssage).toBeVisible();
});
