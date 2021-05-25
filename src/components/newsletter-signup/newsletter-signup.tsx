import { Component, h, State } from '@stencil/core';
import { ResponsiveContainer } from '@ionic-internal/ionic-ds';

@Component({
  tag: 'newsletter-signup',
  styleUrl: 'newsletter-signup.css',
})
export class NewsletterSignup {
  @State() email: string = '';
  @State() isLoading: boolean = false;
  @State() hasSubmitted: boolean = false;
  @State() isValid: boolean = true;
  @State() inlineMessage: string = '';

  handleEmailChange(ev: any) {
    this.email = ev.target.value;
    this.isValid = true;
  }

  handleSubmit(ev: any) {
    ev.preventDefault();
    // const email = this.email;
    this.isLoading = true;

    // const _hsq = (window as any)['_hsq'] = (window as any)['_hsq'] || [];
    // _hsq.push(["identify",{
    //   email: email
    // }]);
    //  _hsq.push(["trackEvent", {
    //     id: "Signed up for Stencil newsletter",
    //     value: true
    // }]);

    // Send
    var xhr = new XMLHttpRequest();
    var url = ['https://api.hsforms.com/submissions/v3/integration/submit', '3776657', '2d5d92d3-d3e5-4d7e-ac77-aac0ac59c1f1'].join('/');
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        this.inlineMessage = json.inlineMessage;
        this.isLoading = false;
        this.hasSubmitted = true;
        this.isValid = true;
      } else if (xhr.readyState == 4 && xhr.status == 400) {
        this.inlineMessage = 'Please enter a valid email address.';
        this.isLoading = false;
        this.isValid = false;
      }
    };
    const hutkMatch = document.cookie.match && document.cookie.match(/hubspotutk=(.*?);/);
    const hutk = hutkMatch ? hutkMatch[1] : undefined;

    xhr.send(
      JSON.stringify({
        fields: [
          {
            name: 'email',
            value: this.email,
          },
        ],
        context: {
          hutk,
          pageUri: window.location.href,
          pageName: document.title,
        },
      }),
    );
  }

  render() {
    return (
      <ResponsiveContainer>
        <div class="header">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
              <circle cx="32" cy="32" r="32" fill="#F3F3FC" />
            </mask>
            <g mask="url(#mask0)">
              <g opacity="0.2">
                <path
                  d="M-8 51C-3 51 -3 54 2 54C7 54 7 51 12 51C17 51 17 54 22 54C27 54 27 51 32 51C37 51 37 54 42 54C47 54 47 51 52 51C57 51 57 54 62 54C67 54 67 51 72 51"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 58C-3 58 -3 61 2 61C7 61 7 58 12 58C17 58 17 61 22 61C27 61 27 58 32 58C37 58 37 61 42 61C47 61 47 58 52 58C57 58 57 61 62 61C67 61 67 58 72 58"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 30C-3 30 -3 33 2 33C7 33 7 30 12 30C17 30 17 33 22 33C27 33 27 30 32 30C37 30 37 33 42 33C47 33 47 30 52 30C57 30 57 33 62 33C67 33 67 30 72 30"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 37C-3 37 -3 40 2 40C7 40 7 37 12 37C17 37 17 40 22 40C27 40 27 37 32 37C37 37 37 40 42 40C47 40 47 37 52 37C57 37 57 40 62 40C67 40 67 37 72 37"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 44C-3 44 -3 47 2 47C7 47 7 44 12 44C17 44 17 47 22 47C27 47 27 44 32 44C37 44 37 47 42 47C47 47 47 44 52 44C57 44 57 47 62 47C67 47 67 44 72 44"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 9C-3 9 -3 12 2 12C7 12 7 9 12 9C17 9 17 12 22 12C27 12 27 9 32 9C37 9 37 12 42 12C47 12 47 9 52 9C57 9 57 12 62 12C67 12 67 9 72 9"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 16C-3 16 -3 19 2 19C7 19 7 16 12 16C17 16 17 19 22 19C27 19 27 16 32 16C37 16 37 19 42 19C47 19 47 16 52 16C57 16 57 19 62 19C67 19 67 16 72 16"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 23C-3 23 -3 26 2 26C7 26 7 23 12 23C17 23 17 26 22 26C27 26 27 23 32 23C37 23 37 26 42 26C47 26 47 23 52 23C57 23 57 26 62 26C67 26 67 23 72 23"
                  stroke="#7875FC"
                  stroke-width="2"
                />
                <path
                  d="M-8 2C-3 2 -3 5 2 5C7 5 7 2 12 2C17 2 17 5 22 5C27 5 27 2 32 2C37 2 37 5 42 5C47 5 47 2 52 2C57 2 57 5 62 5C67 5 67 2 72 2"
                  stroke="#7875FC"
                  stroke-width="2"
                />
              </g>
              <path
                d="M47.6923 23.7501L39.4615 32.0688C39.4 32.13 39.4 32.2216 39.4615 32.2827L45.2538 38.4091C45.6462 38.7987 45.6462 39.425 45.2538 39.8146C45.0615 40.0056 44.8 40.1049 44.5462 40.1049C44.2923 40.1049 44.0308 40.0056 43.8385 39.8146L38.0692 33.7112C38.0077 33.6501 37.9077 33.6501 37.8462 33.7112L36.4385 35.132C35.2615 36.316 33.7 36.973 32.0231 36.9806C30.3231 36.9882 28.7077 36.2778 27.5154 35.0785L26.1615 33.7112C26.1 33.6501 26 33.6501 25.9385 33.7112L20.1692 39.8146C19.9769 40.0056 19.7154 40.1049 19.4615 40.1049C19.2077 40.1049 18.9462 40.0056 18.7538 39.8146C18.3615 39.425 18.3615 38.7987 18.7538 38.4091L24.5462 32.2827C24.6 32.2216 24.6 32.13 24.5462 32.0688L16.3462 23.7883C16.2308 23.6738 16 23.7501 16 23.9411V40.5556C16 41.9 17.1077 43 18.4615 43H45.5385C46.8923 43 48 41.9 48 40.5556V23.88C48 23.6738 47.8077 23.6356 47.6923 23.7501Z"
                fill="#5755F6"
              />
              <path
                d="M32.0003 34.9867C33.1388 34.9867 34.208 34.5437 35.008 33.7339L47.0772 21.5347C46.6542 21.1986 46.1311 21 45.5542 21H18.4542C17.8773 21 17.3465 21.1986 16.9311 21.5347L29.0003 33.7339C29.7926 34.536 30.8619 34.9867 32.0003 34.9867Z"
                fill="#5755F6"
              />
            </g>
          </svg>
          <hgroup>
            <h3>The Stencil Newsletter</h3>
            <p>Keep up to date with all the latest Stencil news and updates.</p>
          </hgroup>
        </div>

        <div class="form">
          {this.hasSubmitted ? (
            <div class="form-message">
              <app-icon name="checkmark" />
              <div innerHTML={this.inlineMessage}></div>
            </div>
          ) : (
            <form onSubmit={e => this.handleSubmit(e)}>
              <div class="form-group">
                <input
                  name="email"
                  type="email"
                  value={this.email}
                  onInput={() => this.handleEmailChange(event)}
                  disabled={this.isLoading}
                  placeholder="Email address"
                  class={this.isValid ? '' : 'error'}
                  aria-label="Email"
                  required
                />
                <button class="btn btn--primary" type="submit" disabled={this.isLoading || this.hasSubmitted}>
                  Subscribe
                </button>
              </div>
              {!this.isValid && <p class="error-message">{this.inlineMessage}</p>}
            </form>
          )}
        </div>
      </ResponsiveContainer>
    );
  }
}
