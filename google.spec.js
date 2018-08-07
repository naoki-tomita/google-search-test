const { browser } = require("protractor");
const { GoogleTop } = require("./pages/google");

describe("Google", () => {
  it("should search RICOH IT SOLUTIONS", async () => {
    browser.ignoreSynchronization = true;
    const topPage = new GoogleTop();
    await topPage.visit();
    await topPage.inputSearchText("RICOH IT SOLUTIONS");
    const searchResultPage = await topPage.search();

    const searchResults = await searchResultPage.getSearchResults();
    const firstText = await searchResults[0].getText();
    expect(firstText.indexOf("ホーム｜リコーITソリューションズ株式会社")).toBe(0);
  });
});


