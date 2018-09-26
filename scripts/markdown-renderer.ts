import marked from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/';

const languages = ['tsx', 'bash', 'typescript', 'markup', 'css', 'json'];
loadLanguages(languages);

export function listFactory(renderer: marked.Renderer, metadata: any) {
  let lastListItem = metadata.listes = [];
  const prevList = renderer.list;
  const prevListitem = renderer.listitem;
  const prevLink = renderer.link;

  renderer.list = function(body, ordered) {
    lastListItem;
    return prevList.call(this, body, ordered);
  };
  renderer.listitem = function(text) {
    return prevListitem.call(this, text);
  };
  renderer.link = function(href: string, title: string, text: string) {
    return prevLink.call(this, href, title, text);
  };
}

export function collectHeadingMetadata(renderer: marked.Renderer, metadata: any) {
  const prevHeading = renderer.heading;

  renderer.heading = function(text, level, raw) {
    const id = raw.toLowerCase().replace(/[^\w]+/g, '-');
    metadata.heading.push({
      id,
      level,
      text
    });

    return prevHeading.call(this, text, level, raw);
  };
}

export function changeCodeCreation(renderer: marked.Renderer) {
  function highlight(code: string, lang?: string) {
    if (lang != null && languages.indexOf(lang) !== -1) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
    return code;
  }

  renderer.code = function (code, lang, escaped) {
    const hcl = [];
    code = code
      .split('\n')
      .map((line, index) => {
        if (line.charAt(0) === '|') {
          hcl.push(index + 1);
          return line.substring(1);
        }
        return line;
      })
      .join('\n');

    const out = highlight(code, lang);

    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }

    if (!lang) {
      return `<pre><code>${(escaped ? code : escape(code))}</code></pre>`;
    }

    return `
  <highlight-code-line ${hcl.length > 0 ? `lines="${hcl.join()}"`: ``}>
    <pre class="language-${escape(lang)}"><code class="language-${escape(lang)}">${(escaped ? code : escape(code))}</code></pre>
  </highlight-code-line>
  `;
  };
}