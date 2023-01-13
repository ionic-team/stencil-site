import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'feature-pill',
  styleUrl: 'feature-pill.css',
})
export class FeaturePill {
@Prop() link = '';

render() {
  return (
    <a href={this.link} target="_blank" rel="noopener" class="feature-pill">
      <slot />
      <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Forward</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M268 112l144 144-144 144M392 256H100'/></svg>
    </a>
  )
}
}