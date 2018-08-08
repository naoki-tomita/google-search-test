const { browser, element, by, ExpectedConditions } = require("protractor");

class YahooTop {
  async visit() {
    await browser.get("https://www.yahoo.co.jp/");
  }

  async inputSearchText(text) {
    const searchText = element(by.xpath(`//*[@id="srchtxt"]`));
    await browser.wait(ExpectedConditions.visibilityOf(searchText), 2000);
    await searchText.sendKeys(text);
  }

  async search() {
    const searchButton = element(by.xpath(`//*[@id="srchbtn"]`));
    await browser.wait(ExpectedConditions.visibilityOf(searchButton), 2000);
    await searchButton.click();

    const searchResult = new YahooSearchResult();
    await searchResult.waitUntilSearchEnd();
    return searchResult;
  }
}

class YahooSearchResult {
  async waitUntilSearchEnd() {
    await browser.wait(
      ExpectedConditions.visibilityOf(
        element(by.xpath(`//*[@id="WS2m"]`)),
      ),
    );
  }

  async getSearchResults() {
    const searchResults = element.all(by.css(`#WS2m > div`));
    const results = [];
    await searchResults.each(r => results.push(new YahooSearchResultItem(r)));
    return results;
  }
}

class YahooSearchResultItem {
  constructor(elementFinder) {
    this.elementFinder = elementFinder;
  }

  async linkText() {
    await browser.wait(ExpectedConditions.visibilityOf(this.elementFinder), 2000);
    return await this.elementFinder.$$("a").first().getText();
  }
}

exports.YahooTop = YahooTop;
exports.YahooSearchResult = YahooSearchResult;
exports.YahooSearchResultItem = YahooSearchResultItem;