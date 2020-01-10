const { src, dest, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');

html = (cb) => {
    return src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}

js = (cb) => {
    return src('index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(dest('dist'));
}

css = (cb) => {
    return src('index.css')
        .pipe(csso())
        .pipe(dest('dist'))
}

exports.default = parallel(js, css, html);
