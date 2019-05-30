import { Component, Prop, Watch, State, h } from '@stencil/core';

@Component({
  tag: 'blog-component',
  styleUrl: 'blog-component.css'
})
export class BlogIndex {
  @Prop() pageUrl: string;
  @State() postContent: string

  componentWillLoad() {
    if (this.pageUrl) {
      return this.fetchContent();
    }
  }

  @Watch('pageUrl')
  fetchContent() {
    return fetch(`/assets${this.pageUrl}.html`)
      .then(response => response.text())
      .then(data => {
        this.postContent = data;
      });
  }

  POSTS = [
    {
      title: 'Announcing Stencil 1.0.0',
      date: 'June 6, 2019',
      url: '/blog/announcing-stencil-one',
      author: 'Manu Almeida',
      description: 'Today, we’re thrilled to announce the release of Stencil 1.0 final (what we’re calling Stencil One), featuring an all-new compiler architecture. It is not only able to better optimize your components, but is designed to be completely future-proof.'
    }
  ]

  constructor() {
    if (this.pageUrl) {
      const post = this.POSTS.find(o => o.url === this.pageUrl);
      document.title = `Stencil Blog - ${post.title}`;
    } else {
      document.title = `Stencil Blog`;
    }
  }


  render() {
    // if route had a /blog/:post param then render the post, otherwise render the blog index

    if (this.pageUrl) {
      const post = this.POSTS.find(o => o.url === this.pageUrl);
      document.title = `Stencil Blog - ${post.title}`;

      return (
        <div class="blog-content measure-lg">
          <h1>{post.title}</h1>
          <span class="post-meta">
            {post.author}&nbsp;&nbsp;|&nbsp;&nbsp;{post.date}
          </span>
          <div innerHTML={this.postContent}></div>
        </div>
      );
    }

    document.title = `Stencil Blog`;

    return (
      <div class="container">
      {
        this.POSTS.map(post => {
          return (
            <div class="blog-item">
              <h1>{post.title}</h1>
              <span class="post-meta">
                {post.author}&nbsp;&nbsp;|&nbsp;&nbsp;{post.date}
              </span>
              <p>{post.description}</p>
              <stencil-route-link url={post.url}>
                Read more
                <app-icon name="arrow-right"></app-icon>
              </stencil-route-link>
            </div>
          );
        })
      }
      </div>
    );
  }
}
