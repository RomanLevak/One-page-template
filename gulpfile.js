const
	gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	concat 			= require('gulp-concat'),
	autoprefixer 	= require('gulp-autoprefixer'),
	cleanCss 		= require('gulp-clean-css'),
	browserSync 	= require('browser-sync').create(),
	rename 			= require('gulp-rename')

gulp.task('sass', () => {
	gulp.src('./src/sass/index.sass')
		.pipe(sass({ outputStyle: 'expanded', indentedSyntax: true })
			.on('error', sass.logError ))
		.pipe(autoprefixer())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./public/styles/css'))
		.pipe(cleanCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/styles/css'))
		.pipe(browserSync.stream())
})

gulp.task('serve', () =>{
	browserSync.init({
		server: {baseDir: './public'}
	})

	gulp.watch(['src/sass/**/*.sass', 'src/**/*.css'], ['sass'])
	gulp.watch('public/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['sass', 'serve'])
