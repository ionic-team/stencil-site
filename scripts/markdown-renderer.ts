import marked from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/';

const languages = ['tsx', 'bash', 'typescript', 'markup', 'css', 'json'];
loadLanguages(languages);

export default function createRenderer() {

  const renderer = new marked.Renderer();
  const metadata = {
    heading: []
  };

  function highlight(code: string, lang?: string) {
    if (lang != null && languages.indexOf(lang) !== -1) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
    return code;
  }

  renderer.heading = function(text, level, raw) {
    const id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
    metadata.heading.push({
      id,
      level,
      text
    })
    
    return '<h'
      + level
      + ' id="'
      + id
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  };

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

  return {
    metadata,
    renderer
  };
}