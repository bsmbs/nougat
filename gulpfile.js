const gulp = require("gulp");
const ts = require("gulp-typescript");
const tspr = ts.createProject("tsconfig.json");

gulp.task("default", function() {
    return tspr.src()
    .pipe(tspr())
    .js.pipe(gulp.dest("dist"));
    
})