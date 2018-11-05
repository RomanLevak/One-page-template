const gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	browserSync = require('browser-sync').create()

gulp.task('sass', () => {
	gulp.src('./src/sass/index.sass')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', indentedSyntax: true })
			.on('error', sass.logError ))
		.pipe(autoprefixer())
		.pipe(concat('bundle.css'))
		.pipe(sourcemaps.write())
		.pipe(cleanCss())
		.pipe(gulp.dest('./public/styles/css'))
		.pipe(browserSync.stream())
})

gulp.task('serve', ()=>{
	browserSync.init({
		server: {
			baseDir: './public'
		}
	})

	gulp.watch('src/sass/**/*.sass', ['sass'])
	gulp.watch('public/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['sass', 'serve'])
