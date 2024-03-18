const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssbeautify = require("gulp-cssbeautify");

gulp.task("sass", function () {
  return gulp
    .src("src/style/scss/**/*.scss") //Scss file directory
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cssbeautify())
    .pipe(gulp.dest("src/style")); //Css file directory
});

gulp.task("watch", function () {
  gulp.watch("src/style/scss/**/*.scss", gulp.series("sass")); //UPDATE DIR
});

gulp.task("default", gulp.series("sass", "watch"));
