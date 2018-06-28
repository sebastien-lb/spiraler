import { TestWindow } from '@stencil/core/testing';
import { SpiralerEl } from './spiraler-el';

describe('my-component', () => {
  it('should build', () => {
    expect(new SpiralerEl()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMyComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [SpiralerEl],
        html: '<my-spiraler-el></my-spiraler-el>'
      });
    });

    it('should render', () => {
      expect(element).toMatchSnapshot();
    });

  });
});
