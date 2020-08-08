let project_folder="dist";
let source_folder="src";

let path ={
  build:{
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img",
    fonts: project_folder + "/fonts/"
  },
  src:{
    html: [source_folder + "/*.html", "!"+ source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder+ "/js/script.js",
    img: source_folder+ "/img/**/*.{jpg, png, svg, gif, ico, webp}",
    fonts: source_folder + "/fonts/*.ttf"
  },
  watch:{
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder+ "/img/**/*.{jpg, png, svg, gif, ico, webp}"
  },
  clean: "./" + project_folder + "/"
}


let {src, dest} = require('gulp'),
gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const browsersync = require("browser-sync").create();
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woffGulp = require('gulp-ttf2woff');
const fonter = require('gulp-fonter');

function browserSync(params){
  browsersync.init({
    server:{
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  })
}

function html(){
  return src(path.src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(webpHTML())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css(){
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle:"expanded"
      })
    )
    .pipe(
      group_media()
    )
    .pipe(
      autoprefixer({
        cascade : true
      })
    )
    .pipe(webpCss())
    .pipe(dest(path.build.css))
    .pipe(
      clean_css()
    )
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js(){
  return src(path.src.js)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(path.build.js))
    .pipe(
      uglify()
    )
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images(){
  return src(path.src.img)
    .pipe(webp({
          quality: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins:[{removeViewBox: false}],
        interlaced: true, 
        optimizationLavel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

gulp.task('svgSprite', function(){
  return gulp.src([sourse_folder + '/iconsprite/*.svg'])
  .pipe(svgSprite({
      mode:{
        stack:{
          sprite:"../icons/icons.svg",
        }
      }
    }))
    .pipe(dest(path.build.img))
})

gulp.task('otf2ttf', function(){
  return gulp.src([sourse_folder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'));
});


function fonts(params){
  src(path.src.fonts)
  .pipe(ttf2woff())
  .pipe(dest(path.build.fonts));
  return  src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts));
}
function watchFiles(params){
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params){
  return del(path.clean);
}


let build = gulp.series(clean,  gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts= fonts;
exports.images= images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;