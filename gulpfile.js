var gulp = require( 'gulp' );
var autoprefixer = require( 'autoprefixer' );
var cssnano = require( 'cssnano' );

// load plugins
var $ = require( 'load-plugins' )( 'gulp-*', {strip: 'gulp'} );
var pcss = require( 'load-plugins' )( 'postcss-*', {strip: 'postcss'} );

gulp.task( 'styles', function() {
  var processors = [
    autoprefixer( {browsers: ['last 1 version']} ),
    pcss.import(),
    pcss.discardComments(),
    pcss.pseudoelements(),
    cssnano()
  ];

  gulp.src( './source/css/style.css' )
    .pipe( $.plumber() )
    .pipe( $.size({'showFiles': true}) )
    .pipe( $.postcss(processors) )
    .pipe( $.rename('style.min.css')  )
    .pipe( gulp.dest('../www/styles/' ) );
});

gulp.task( 'watch', [ 'styles' ], function() {
  var watcherStyles = gulp.watch( './source/css/**/*.css', ['styles'] );
  watcherStyles.on( 'change', function ( event ) {
    // added, changed, or deleted
    // The path of the modified file
    console.log( event.type + ' file: ' + event.path ); // added, changed, or deleted
  });
});

/*gulpLoadPlugins({
  rename: {
    'gulp-ruby-sass': 'sass'
  }
});*/
