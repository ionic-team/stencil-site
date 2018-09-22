import marked from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/';

const languages = ['tsx', 'bash', 'typescript', 'markup', 'css', 'json'];
loadLanguages(languages);

const renderer = new marked.Renderer();

function highlight(code: string, lang?: string) {
  if (lang != null && languages.indexOf(lang) !== -1) {
    return Prism.highlight(code, Prism.languages[lang]);
  }
  return code;
}

renderer.code = function (code, language, escaped) {
  const [lang, hcl] = language ? language.split(':') : [undefined, undefined];
  const out = highlight(code, lang);
  if (out != null && out !== code) {
    escaped = true;
    code = out;
  }

  if (!lang) {
    return `<pre><code>${(escaped ? code : escape(code))}</code></pre>`;
  }

  return `
<highlight-code-line ${hcl ? `lines="${hcl}"`: ``}>
  <pre class="language-${escape(lang)}"><code class="language-${escape(lang)}">${(escaped ? code : escape(code))}</code></pre>
</highlight-code-line>
`;
};

export default renderer;