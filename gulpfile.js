const { src, dest, watch, parallel } = require('gulp')

//javascript
const terser = require('gulp-terser-js');


//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//imagenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ){
    src('src/scss/**/*.scss')//identificar archivo css a compilar
    .pipe(sourcemaps.init())
    .pipe(plumber())//evita detener la ejecucion del watch
    .pipe(sass())//compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'))//almacenarlo

    done();
}

function imagenes( done ){
    const opciones = {
        optimazationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp( done ){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')//busca todas la imaganes 
        .pipe(webp(opciones))//definimos la calidad de las imagenes
        .pipe(dest('build/img'));//definimos la carpeta donde queremos guardar las imagenes

    done();
}

function versionAvif( done ){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')//busca todas la imaganes 
        .pipe(avif(opciones))//definimos la calidad de las imagenes
        .pipe(dest('build/img'));//definimos la carpeta donde queremos guardar las imagenes

    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
    done();
}

function dev( done ){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev, javascript);

