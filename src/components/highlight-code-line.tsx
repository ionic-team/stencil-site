import { Component, ComponentInterface, Element, Prop, Watch } from '@stencil/core';

function range(start, end) {
  const array = Array(end - start + 1);
  return array.fill('').map((_, idx) => start + idx)
}

@Component({
  tag: 'highlight-code-line'
})
export class CustomClock implements ComponentInterface {

  @Element() el!: HTMLStencilElement;
  @Prop() lines?: string;

  componentDidLoad() {
    this.updateCodeLines(this.lines);
  }

  @Watch('lines')
  updateCodeLines(newValue: string) {
    const linesToHighlight = newValue.split(',')
      .reduce((all, val) => {
        if (val.indexOf('-') !== -1) {
          const [start, end] = val.split('-');
          return all.concat(range(start, end));
        }
        return all.concat(parseInt(val, 10));
      }, [] as Array<number>);

    const codeEl = this.el.querySelector('code');
    codeEl.innerHTML = codeEl.innerHTML.split('\n')
      .map((line, index) => {
        if (linesToHighlight.indexOf(index + 1) !== -1) {
          return `<span class="line-highlight">${line}</span>`;
        }
        return line;
      })
      .join('\n');
  }
}