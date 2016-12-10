var gulp       = require('gulp');
var ngConstant = require('gulp-ng-constant');

gulp.task('constants:dev', function () {
  var myConfig  = require('../../tut-frontend/src/app/config.json');
  var envConfig = myConfig['development'];
  return ngConstant({
    constants: envConfig,
    stream   : true,
    wrap     : false
  })
    .pipe(gulp.dest('src/app/constants'));
});

gulp.task('constants:stage', function () {
  var myConfig  = require('../../tut-frontend/src/app/config.json');
  var envConfig = myConfig['staging'];
  return ngConstant({
    constants: envConfig,
    stream   : true,
    wrap     : false
  })
    .pipe(gulp.dest('src/app/constants'));
});

