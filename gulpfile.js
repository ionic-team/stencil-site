var gulp = require('gulp');
var markdown = require('gulp-markdown');
var hljs = require('highlight.js');
gulp.task('default', function() {
  return gulp
    .src('./src/docs-md/**/*.md')
    .pipe(
      markdown({
        highlight: function(code, lang) {
          if (lang != null && hljs.getLanguage(lang)) {
            const hl = hljs.highlight(lang, code);
            if (hl.relevance > 0 || lang === 'bash') {
              return hl.value;
            }
            return hljs.highlightAuto(code).value;
          }
          return code;
        }
      })
    )
    .pipe(gulp.dest('./src/docs-content'));
});
