var gulp = require( 'gulp' );
var autoprefixer = require( 'autoprefixer' );

// load plugins
var $ = require( 'load-plugins' )( 'gulp-*', {strip: 'gulp'} );
var pcss = require( 'load-plugins' )( 'postcss-*', {strip: 'postcss'} );

gulp.task( 'styles', function() {
  var processors = [
    autoprefixer( {browsers: ['last 1 version']} ),
    pcss.import(),
    pcss.customProperties(),
    pcss.minifyFontWeight(),
    pcss.discardEmpty(),
    pcss.calc(),
    pcss.normalizeUrl(),
    pcss.mergeLonghand(),
    pcss.fontFamily(),
    pcss.colormin(),
    pcss.pseudoelements()
  ];

  gulp.src( './source/css/style.css' )
    .pipe( $.plumber() )
    .pipe( $.postcss(processors) )
    .pipe( $.minifyCss() )
    .pipe( $.size({'showFiles': true}) )
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
