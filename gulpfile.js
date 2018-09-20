var gulp = require('gulp');
var markdown = require('gulp-markdown');
var Prism = require('prismjs');
var loadLanguages = require('prismjs/components/');

var languages = ['tsx', 'bash', 'typescript', 'markup', 'css', 'json'];
loadLanguages(languages);

var renderer = new markdown.marked.Renderer();
function highlight(code, lang) {
  if (languages.indexOf(lang) !== -1) {
    return Prism.highlight(code, Prism.languages[lang]);
  }
  return code;
}

renderer.code = function (code, language, escaped) {
  const [lang, hcl] = language ? language.split(':') : [];
  var out = highlight(code, lang);
  if (out != null && out !== code) {
    escaped = true;
    code = out;
  }

  if (!lang) {
    return `<pre><code>${(escaped ? code : escape(code, true))}</code></pre>`;
  }

  return `
<highlight-code-line ${hcl ? `lines="${hcl}"`: ``}>
  <pre class="language-${escape(lang, true)}"><code class="language-${escape(lang, true)}">${(escaped ? code : escape(code, true))}</code></pre>
</highlight-code-line>
`;
};

gulp.task('default', function() {
  return gulp
    .src('./src/docs-md/**/*.md')
    .pipe(
      markdown({
        renderer: renderer,
      })
    )
    .pipe(gulp.dest('./src/docs-content'));
});
