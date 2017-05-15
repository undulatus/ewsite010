import { EwSitePage } from './app.po';

describe('ew-site App', () => {
  let page: EwSitePage;

  beforeEach(() => {
    page = new EwSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
