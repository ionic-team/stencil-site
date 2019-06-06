import { Component, Prop, Watch, State, h } from '@stencil/core';

interface PostInterface {
  title: string;
  date: string;
  url: string;
  author: string;
  description: string;
  img: string;
}


@Component({
  tag: 'blog-component',
  styleUrl: 'blog-component.css'
})
export class BlogIndex {

  @Prop() pageUrl?: string;
  @State() postContent?: string

  componentWillLoad() {
    const post = this.getPost();
    if (post) {
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

  private getPost() {
    if (this.pageUrl) {
      return POSTS.find(o => o.url === this.pageUrl);
    }
    return undefined;
  }

  render() {
    // if route had a /blog/:post param then render the post, otherwise render the blog index
    const post = this.getPost();
    if (post) {
      const authorSlug = post.author.toLowerCase().replace(' ', '-');
      document.title = `Stencil Blog - ${post.title}`;

      return (
        <div class="container">

        <div class="share-links">
          <div class="sticky">
            <a href={`http://twitter.com/home?status=${post.title}`} class="twitter" onClick={ function(this: HTMLAnchorElement, ev){
              ev.preventDefault();
              window.open(this.href, 'Share via Twitter', 'width=400, height=300');}}>
              <app-icon name="twitter"></app-icon>
            </a>
            <a href={`http://www.facebook.com/share.php?u=${window.location.href}&title=${post.title}`} class="facebook" onClick={ function(this: HTMLAnchorElement, ev){
              ev.preventDefault();
              window.open(this.href, 'Share via Facebook', 'width=555, height=656');}}>
              <app-icon name="facebook"></app-icon>
            </a>
            <a href={`http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`} class="linkedin" onClick={ function(this: HTMLAnchorElement, ev){
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
      <div class="container">
        <div class="blog-index">
        {
          POSTS.map(post => {
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
      </div>
    );
  }
}


function insertOgTags(post: PostInterface) {
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

const cleanOgTags = () => {
  const tags = document.querySelectorAll('meta[property^="og:"]');
  for (var i = 0; i < tags.length; i++) {
    tags[i].remove();
  }
}

const createOgTag = (type: string, content: string) => {
  const el = document.createElement('meta');
    el.setAttribute('property', type);
    el.content = content;
  return el;
};

const POSTS: PostInterface[] = [
  {
    title: 'Announcing Stencil 1.0.0',
    date: 'June 6, 2019',
    url: '/blog/announcing-stencil-one',
    author: 'Manu Almeida',
    description: 'Today, we’re thrilled to announce the release of Stencil 1.0 final (what we’re calling Stencil One), featuring an all-new compiler architecture. It is not only able to better optimize your components, but is designed to be completely future-proof.',
    img:'/assets/img/blog/og/stencil-one.png'
  }
];
