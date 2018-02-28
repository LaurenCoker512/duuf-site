var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    cssImport = require("postcss-import"),
    mixins = require("postcss-mixins"),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create();

gulp.task("default", ["watch"]);

gulp.task("watch", ["styles"], function(){
    browserSync.init({
        server: "./app"
    });

    gulp.watch("./app/assets/styles/**/*.css", ["styles"])
    gulp.watch("./app/index.html").on("change", browserSync.reload);
});

gulp.task("styles", function(){
    return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest("./app/temp/styles"))
        .pipe(browserSync.stream());
});