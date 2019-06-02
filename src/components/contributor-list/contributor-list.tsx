import { Component, Prop, h } from "@stencil/core";


@Component({
  tag: 'contributor-list',
  styleUrl: 'contributor-list.css'
})
export class ContributorList {

  @Prop() contributors: string[]

  render() {
    if (this.contributors.length === 0) {
      return null;
    }

    return (
      <section>
        <h5>Contributors</h5>
        <div>
          <ul>
          {this.contributors.map(contributor => (
            <li>
              <a href={`https://github.com/${contributor}`} target="_blank">
                <span class="img-wrapper">
                  <img src={`https://github.com/${contributor}.png?size=90`} loading="lazy" title={`Contributor ${contributor}`} importance="low"/>
                </span>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </section>
    );
  }
}
