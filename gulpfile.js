var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    cssImport = require("postcss-import"),
    mixins = require("postcss-mixins"),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create(),
    modernizr = require("modernizr"),
    webpack = require("webpack"),
    imagemin = require("gulp-imagemin"),
    del = require("del"),
    usemin = require("gulp-usemin"),
    rev = require("gulp-rev"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify");

gulp.task("default", ["watch"]);

gulp.task("deleteDistFolder", function() {
    return del("./docs");
});

gulp.task("optimizeImages", ["deleteDistFolder"], function() {
    return gulp.src("./app/assets/images/**/*")
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("usemin", ["deleteDistFolder", "styles", "scripts"], function() {
    return gulp.src(["./app/index.html", "./app/about.html", "./app/get-involved.html", "./app/whats-a-uu.html"])
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
})

gulp.task("build", ["deleteDistFolder", "optimizeImages", "usemin"]);

gulp.task("scripts", function(callback){
    webpack(require("./webpack.config.js"), function(err, stats){
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});

gulp.task("watch", ["styles"], function(){
    browserSync.init({
        server: "./app"
    });

    gulp.watch("./app/assets/styles/**/*.css", ["styles"]);
    gulp.watch("./app/assets/scripts/**/*.js", function(){
        gulp.start("scriptsRefresh");
    });
    gulp.watch("./app/*.html").on("change", browserSync.reload);
});

gulp.task("previewDist", ["styles"], function(){
    browserSync.init({
        server: "./docs"
    });

    gulp.watch("./app/assets/styles/**/*.css", ["styles"]);
    gulp.watch("./app/assets/scripts/**/*.js", function(){
        gulp.start("scriptsRefresh");
    });
    gulp.watch("./app/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function(){
    return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest("./app/temp/styles"))
        .pipe(browserSync.stream());
});

gulp.task("scriptsRefresh", ["scripts"], function(){
    browserSync.reload();
})