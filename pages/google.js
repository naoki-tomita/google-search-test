const { browser, element, by, ExpectedConditions } = require("protractor");

class GoogleTop {
  async visit() {
    await browser.get("https://www.google.com");
  }

  async inputSearchText(text) {
    const searchBox = element(by.xpath(`//*[@id="lst-ib"]`));
    await browser.wait(ExpectedConditions.visibilityOf(searchBox), 2000);
    await searchBox.sendKeys(text);
    // HACK: Google shows suggest.
    // So, search button could not click.
    // We send tab key for removing focus from text input.
    await searchBox.sendKeys("\t");
  }

  async search() {
    const searchButton = element(by.xpath(`//*[@id="tsf"]/div[2]/div[3]/center/input[1]`));
    await browser.wait(ExpectedConditions.visibilityOf(searchButton), 2000);
    await searchButton.click();

    const searchResult = new GoogleSearchResult();
    await searchResult.waitUntilSearchEnd();
    return searchResult;
  }
}

class GoogleSearchResult {
  async waitUntilSearchEnd() {
    await browser.wait(
      ExpectedConditions.visibilityOf(
        element(by.xpath(`//*[@id="logo"]`))),
      2000,
    );
  }

  async getSearchResults() {
    const searchResults = element.all(by.css(`#rso > div`));
    const results = [];
    await searchResults.each(r => results.push(new GoogleSearchResultItem(r)));
    return results;
  }
}

class GoogleSearchResultItem {
  constructor(elementFinder) {
    this.elementFinder = elementFinder;
  }

  async linkText() {
    await browser.wait(ExpectedConditions.visibilityOf(this.elementFinder), 2000);
    return await this.elementFinder.$$("a").first().getText();
  }
}

exports.GoogleTop = GoogleTop;
exports.GoogleSearchResult = GoogleSearchResult;
exports.GoogleSearchResultItem = GoogleSearchResultItem