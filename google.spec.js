const { browser } = require("protractor");
const { GoogleTop } = require("./pages/google");

describe("Google", () => {
  it("should search RICOH IT SOLUTIONS", async () => {
    // This parameter must be true if Non Angular app testing.
    browser.ignoreSynchronization = true;

    const topPage = new GoogleTop();
    // Visit function is means show page.
    await topPage.visit();
    await topPage.inputSearchText("RICOH IT SOLUTIONS");
    // Generally, Page object returns other page object when page transition has occurring.
    // Executeing search returns search result page.
    const searchResultPage = await topPage.search();

    const searchResults = await searchResultPage.getSearchResults();
    const firstText = await searchResults[0].getText();
    expect(firstText.indexOf("ホーム｜リコーITソリューションズ株式会社")).toBe(0);
  });
});


