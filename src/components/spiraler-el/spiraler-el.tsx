import { Component, Element } from '@stencil/core';

@Component({
  tag: 'my-spiraler-el',
  styleUrl: 'spiraler-el.scss',
  shadow: true
})
export class SpiralerEl {

  @Element() host;

  render() {
    return (
      <div class="outer-container">
        <slot></slot>
      </div>
    );
  }
}
