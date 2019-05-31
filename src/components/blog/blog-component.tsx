import { Component, Prop, Watch, State, h } from '@stencil/core';

@Component({
  tag: 'blog-component',
  styleUrl: 'blog-component.css'
})
export class BlogIndex {
  @Prop() pageUrl: string;
  @State() postContent: string

  POSTS = [
    {
      title: 'Announcing Stencil 1.0.0',
      date: 'June 6, 2019',
      url: '/blog/announcing-stencil-one',
      author: 'Manu Almeida',
      description: 'Today, we’re thrilled to announce the release of Stencil 1.0 final (what we’re calling Stencil One), featuring an all-new compiler architecture. It is not only able to better optimize your components, but is designed to be completely future-proof.',
      img:'/assets/img/blog/og/stencil-one.png'
    }
  ]

  componentWillLoad() {
    if (this.pageUrl) {
      const post = this.POSTS.find(o => o.url === this.pageUrl);
      insertOgTags(post);
      document.title = `Stencil Blog - ${post.title}`;
      return this.fetchContent();
    } else {
      cleanOgTags();
      document.title = `Stencil Blog`;
    }
  }

  componentDidUnload(){
    cleanOgTags();
  }


  @Watch('pageUrl')
  fetchContent() {
    return fetch(`/assets${this.pageUrl}.html`)
      .then(response => response.text())
      .then(data => {
        this.postContent = data;
      });
  }

  render() {
    // if route had a /blog/:post param then render the post, otherwise render the blog index

    if (this.pageUrl) {
      const post = this.POSTS.find(o => o.url === this.pageUrl);
      const authorSlug = post.author.toLowerCase().replace(' ', '-');
      document.title = `Stencil Blog - ${post.title}`;

      return (
        <div class="container">

        <div class="share-links">
          <div class="sticky">
            <a href={`http://twitter.com/home?status=${post.title}`} class="twitter" onClick={ function(ev){
              ev.preventDefault();
              window.open(this.href, 'Share via Twitter', 'width=400, height=300');}}>
              <app-icon name="twitter"></app-icon>
            </a>
            <a href={`http://www.facebook.com/share.php?u=${window.location.href}&title=${post.title}`} class="facebook" onClick={ function(ev){
              ev.preventDefault();
              window.open(this.href, 'Share via Facebook', 'width=555, height=656');}}>
              <app-icon name="facebook"></app-icon>
            </a>
            <a href={`http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`} class="linkedin" onClick={ function(ev){
              ev.preventDefault();
              window.open(this.href, 'Share via LinkedIn', 'width=500, height=600');}}>
              <app-icon name="linkedin"></app-icon>
            </a>
          </div>
        </div>

          <div class="blog-content">
            <h1>{post.title}</h1>
            <span class="post-meta">
              <img class="post-author-image" src={`/assets/img/blog/authors/${authorSlug}.png`}/> {post.author}&nbsp;&nbsp;|&nbsp;&nbsp;{post.date}
            </span>
            <div innerHTML={this.postContent}></div>
          </div>
        </div>
      );
    }

    return (
      <div class="container blog-index">
      {
        this.POSTS.map(post => {
          const authorSlug = post.author.toLowerCase().replace(' ', '-');
          return (
            <div class="blog-item">
              <h1>{post.title}</h1>
              <span class="post-meta">
                <img class="post-author-image" src={`/assets/img/blog/authors/${authorSlug}.png`}/> {post.author}&nbsp;&nbsp;|&nbsp;&nbsp;{post.date}
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


function insertOgTags(post) {
  cleanOgTags();
  const ogTitle = createOgTag('og:title', `Stencil Blog - ${post.title}`);
  const ogDescription = createOgTag('og:description', post.description);
  const ogUrl = createOgTag('og:url', window.location.href);
  const ogImage = createOgTag('og:image', `${window.location.origin}${post.img}`);
  document.head.appendChild(ogTitle);
  document.head.appendChild(ogDescription);
  document.head.appendChild(ogUrl);
  document.head.appendChild(ogImage);
}

function cleanOgTags() {
  const tags = document.querySelectorAll('meta[property^="og:"]');
  for (var i = 0; i < tags.length; i++) {
    tags[i].remove();
  }
}

function createOgTag(type, content) {
  const el = document.createElement('meta');
    el.setAttribute('property', type);
    el.content = content;
  return el;
}
