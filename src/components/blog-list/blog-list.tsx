import { Component, h } from '@stencil/core';
import blogStructure from '../../assets/blog/list.json';
import { BlogPostInterface } from '../../global/definitions'
import { ResponsiveContainer } from '@ionic-internal/sites-shared';

@Component({
  tag: 'blog-list',
  styleUrl: 'blog-list.css'
})
export class BlogIndex {

  render() {
    return (
      <ResponsiveContainer>
        <div class="blog-index">
        {
          (blogStructure as BlogPostInterface[]).map(post => {
            return (
              <div class="blog-item">
                <stencil-route-link url={post.url} class="post-title">
                  <h1>{post.title}</h1>
                </stencil-route-link>
                <span class="post-meta">
                  <a href={`http://twitter.com/${post.twitter}`}>
                    <img alt={`Author: ${post.author}`} class="post-author-image" src={`/assets/img/blog/authors/${post.twitter}.jpg`}/>
                  </a>
                  <a class="post-author-name" href={`http://twitter.com/${post.twitter}`}>{post.author}</a>
                  <span class="post-date">{post.date}</span>
                </span>
                <p>{post.description}</p>
                <stencil-route-link url={post.url} class="read-more">
                  Read more
                </stencil-route-link>
              </div>
            );
          })
        }
        </div>
      </ResponsiveContainer>
    );
  }
}
