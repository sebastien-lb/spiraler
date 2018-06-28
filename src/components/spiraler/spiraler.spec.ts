import { TestWindow } from '@stencil/core/testing';
import { Spiraler } from './spiraler';

describe('my-component', () => {
  it('should build', () => {
    expect(new Spiraler()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMyComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Spiraler],
        html: '<my-spiraler></my-spiraler>'
      });
    });

    it('should render', () => {
      expect(element).toMatchSnapshot();
    });

  });
});
