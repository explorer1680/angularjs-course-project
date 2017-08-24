import { AngularjsCourseProjectPage } from './app.po';

describe('angularjs-course-project App', () => {
  let page: AngularjsCourseProjectPage;

  beforeEach(() => {
    page = new AngularjsCourseProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
