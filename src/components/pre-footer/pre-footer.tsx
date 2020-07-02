import { Component, h } from '@stencil/core';
import { ResponsiveContainer } from '@ionic-internal/sites-shared';

@Component({
  tag: 'pre-footer',
  styleUrl: 'pre-footer.css'
})
export class PreFooter {

  render() {
    return (
      <ResponsiveContainer>
        <stencil-route-link anchorClass="link" url="/docs/introduction">
          <hgroup>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33333 32H32V28.8C31.0182 28.8 30.2222 28.0837 30.2222 27.2C30.2222 26.3163 31.0182 25.6 32 25.6V0H5.33333C2.38781 0 0 2.14903 0 4.8V27.2C0 29.851 2.38781 32 5.33333 32ZM26.9704 25.5996C26.7738 26.1001 26.6669 26.6386 26.6669 27.1996C26.6669 27.7606 26.7738 28.2992 26.9704 28.7996H5.33355C4.35171 28.7996 3.55577 28.0833 3.55577 27.1996C3.55577 26.316 4.35171 25.5996 5.33355 25.5996H26.9704Z" fill="#100F22" />
            </svg>
            <h3>Show me more <app-icon name="arrow-right"/></h3>
            <p>Install Stencil and learn how to build your first component.</p>
          </hgroup>
        </stencil-route-link>

        <stencil-route-link anchorClass="link" url="/design-systems">
          <hgroup>
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M38.6829 0H19.7692L10.4323 10.2542H10.414L0 21.7459H18.6135L9.35204 32H28.2309L37.5705 21.7459H37.586L48 10.2542H29.3575L38.6829 0ZM14.8551 10.2103L21.2509 3.18612H31.405L25.0171 10.2103H14.8551ZM7.26103 18.5598L11.9004 13.4404H40.739L36.0996 18.5598H7.26103ZM16.5971 28.8139L19.043 26.1058L32.6638 22.3205L26.7495 28.8139H16.5971Z" fill="#100F22"/>
            </svg>
            <h3>Learn about Stencil DS <app-icon name="arrow-right"/></h3>
            <p>Start building cross-framework design systems at scale.</p>
          </hgroup>
        </stencil-route-link>
      </ResponsiveContainer>
    );
  }

}
