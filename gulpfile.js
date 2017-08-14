var gulp = require('gulp');
var markdown = require('gulp-markdown');

gulp.task('default', function() {
  return gulp
    .src('./docs-md/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./www/docs-content'));
});
