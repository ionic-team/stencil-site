import { Component, Prop, h, Build } from '@stencil/core'
import blogStructure from '../../assets/blog/list.json'
import { fileNotFound } from '../../global/site-structure-utils';
import { MarkdownContent, BlogPostInterface } from '../../global/definitions'

@Component({
  tag: 'blog-component',
  styleUrl: 'blog-component.css'
})
export class BlogIndex {

  @Prop() page?: string;
  data?: BlogPostInterface;
  content?: MarkdownContent;

  async componentWillRender() {
    if (this.page) {
      const post = this.data = (blogStructure as BlogPostInterface[]).find(blog => blog.url === this.page);

      if (!Build.isBrowser && !post) {
        fileNotFound();
        return;
      }

      if (post && post.filePath) {
        insertOgTags(post);
        document.title = post.title;
        this.content = await fetchContent(post.filePath);
      }
    }
  }

  componentDidUnload(){
    cleanOgTags();
  }

  render() {
    if (!this.data || !this.content) {
      return;
    }
    const post = this.data;
    const content = this.content;

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
            <a href={`http://twitter.com/${post.twitter}`}>
              <img alt={`Author: ${post.author}`} class="post-author-image" src={`/assets/img/blog/authors/${post.twitter}.jpg`}/>
            </a>
            <a class="post-author-name" href={`http://twitter.com/${post.twitter}`}>{post.author}</a>
            <span class="post-date">{post.date}</span>
          </span>
          {toHypertext(content.hypertext)}
        </div>
      </div>
    );
  }
}


function insertOgTags(post: BlogPostInterface) {
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



const localCache = new Map<string, Promise<MarkdownContent>>();

const fetchContent = (path: string) => {
  let promise = localCache.get(path);
  if (!promise) {
    console.log('fetchContent', path);
    promise = fetch(path).then(response => response.json());
    localCache.set(path, promise);
  }
  return promise;
}

const toHypertext = (data: any) => {
  if (!Array.isArray(data)) {
    console.error('content error, hypertext is undefined')
    return null;
  }
  const args = [];
  for (let i = 0; i < data.length; i++) {
    let arg = data[i];
    if (i === 0 && typeof arg === 'string' && tagBlacklist.includes(arg.toLowerCase().trim())) {
      arg = 'template';

    } else if (i === 1 && arg) {
      const attrs: any = {};
      Object.keys(arg).forEach(key => {
        const k = key.toLowerCase();
        if (!k.startsWith('on') && k !== 'innerhtml') {
          attrs[key] = arg[key];
        }
      });
      arg = attrs;

    } else if (i > 1) {
      if (Array.isArray(arg)) {
        arg = toHypertext(arg);
      }
    }
    args.push(arg);
  }
  return (h as any).apply(null, args);
};

const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body'];
