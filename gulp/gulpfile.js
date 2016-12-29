const gulp=require("gulp");
//调用
const loadPlugins=require("gulp-load-plugins")();


gulp.task("clean",function(){
  return gulp.src("./dist/js")
		.pipe(loadPlugins.clean())
})
//代码检查
gulp.task("checkCode",function(){
	return gulp.src("./dist/js/*.js")
			   .pipe(loadPlugins.jshint())
			   .pipe(loadPlugins.jshint.reporter("default"))

})
gulp.task("compressJS",["clean","checkCode"],function(){
	gulp.src("./src/js/*.js")
		.pipe(loadPlugins.concat("all.js"))
		.pipe(loadPlugins.uglify())
		.pipe(loadPlugins.rename({
			suffix:".min"
		}))
		.pipe(gulp.dest("./dist/js"))
})

gulp.task("hash",["clean"],function(){
	return gulp.src("./src/js/*.js")
			   .pipe(loadPlugins.rev())
			   .pipe(gulp.dest("./dist/js"))
			   .pipe(loadPlugins.rev.manifest())
			   .pipe(gulp.dest("./qqq"))//生成rev的json
})

gulp.task("revCollector",function(){//必须驼峰形势
	return gulp.src(["./qqq/*.json","./src/*.html"])
			   .pipe(loadPlugins.revCollector({
			   	replaceReved:true,
			   	dirReplacements:{
			   		"js/":"js/"
			   	}
			   }))
			   .pipe(gulp.dest("./dist"))
})