import { Component, ComponentInterface, Element, Prop, Watch } from '@stencil/core';


@Component({
  tag: 'highlight-code',
  styleUrl: 'highlight-code.css'
})
export class CustomClock implements ComponentInterface {

  @Element() el!: HTMLElement;
  @Prop() lines?: string;

  componentDidLoad() {
    this.updateCodeLines(this.lines);
  }

  @Watch('lines')
  updateCodeLines(newValue: string) {
    if (newValue != null) {
      const linesToHighlight = newValue.split(',')
        .reduce((all, val) => {
          if (val.indexOf('-') !== -1) {
            const [start, end] = val.split('-').map(v => parseInt(v, 10))
            return all.concat(range(start, end));
          }
          return all.concat(parseInt(val, 10));
        }, [] as Array<number>);

      const highlightElm = `<div class="line-highlight">`;

      const codeEl = this.el.querySelector('code');
      codeEl.innerHTML = codeEl.innerHTML.split('\n')
        .map((line, index) => {
          if (linesToHighlight.indexOf(index + 1) !== -1 && line.indexOf(highlightElm) === -1) {
            return highlightElm + line + '</div>';
          }
          return line;
        })
        .join('\n');
    }
  }
}

const range = (start: number, end: number) => {
  const array = Array(end - start + 1);
  return array.fill('').map((_, idx) => start + idx)
};
