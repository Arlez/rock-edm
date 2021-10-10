const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css( done ){
    src('src/scss/**/*.scss')//identificar archivo css a compilar
    .pipe(plumber())//evita detener la ejecucion del watch
    .pipe(sass())//compilarlo
    .pipe(dest('build/css'))//almacenarlo

    done();
}

function dev( done ){
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;