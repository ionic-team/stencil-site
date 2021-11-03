import { Component, h, Host, State } from '@stencil/core';
import { ResponsiveContainer } from '@ionic-internal/ionic-ds';
import integrations from '../../assets/integrations.json';

type CategoryT = {
    title: string,
    rating: number | null,
}

type FilterT = {
  uid: string,
  rating: number | null,
}

type IntegrationsT = {
  id: string,
  uid: string,
  name: string,
  categories: CategoryT[],
  meta: {
    title: string
    description: string
    image: {
      dimensions: {
        width: number
        height: number
      },
      alt: string | null,
      copyright: null,
      url: string,
    }
  }
}

@Component({
  tag: 'integrations-page',
  styleUrl: 'integrations-page.css',
})
export class IntegrationsPage {
  @State() categories = integrations.reduce((acc, { uid, categories }: IntegrationsT) => {
    categories.forEach(({ title, rating }) => {
      const entry = acc.get(title) || [];

      acc.set(title, [...entry, { uid, rating }])
    });

    return acc;
  }, new Map<string, FilterT[]>());

  @State() filteredBy: string[] = [];

  render() {
    console.log(this.filteredBy);

    return (
      <Host>
        <ResponsiveContainer>
          <ul class="sidebar">
            {Array.from(this.categories.keys()).map(key => (
              <li onClick={() => this.filteredBy = new Array(key) } key={key}>
                {key}
              </li>
            ))}
          </ul>
          <div>
            
          </div>
        </ResponsiveContainer>
      </Host>
    );
  }
}
