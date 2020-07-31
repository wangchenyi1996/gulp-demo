const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin');
const connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 9999
    });
});

gulp.task('js', async () => {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('mixin.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})

gulp.task('less', () => {
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'abc',
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})

gulp.task('css', async () => {
    return gulp.src('./css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})

gulp.task('img', async () => {
    return gulp.src('./imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'))
        .pipe(connect.reload());
})

gulp.task('html', async () => {
    return gulp.src('./html/*')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})

// gulp.task('watchjs', async () => {
//     return gulp.src('./js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
// })
// gulp.watch('./js/*.js', gulp.parallel('watchjs'))

gulp.task('watchs', async function () {//监听变化执行任务
    //当匹配任务变化才执行相应任务
    gulp.watch('html/*.html', gulp.series('html'));
    gulp.watch('less/*.less', gulp.series('less'));
    gulp.watch('css/*.css', gulp.series('css'));
    gulp.watch('js/js/**/*.js', gulp.series('js'));
    gulp.watch('imgs/*', gulp.series('img'));
})

gulp.task('default', gulp.parallel(['connect','js', 'less', 'css', 'html', 'img', 'watchs']), function () {
    console.log('监听成功！')
})