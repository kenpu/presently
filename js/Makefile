all: styles editor reader
	cp -R ./libs ./build/libs

editor:
	browserify -v -d -o ./build/e.js -e editor.js
	uglifyjs build/e.js -o build/editor.js --compress --mangle
	rm -f ./build/e.js

reader:
	browserify -v -d -o ./build/r.js -e reader.js
	uglifyjs build/r.js -o build/reader.js --compress --mangle
	rm -f ./build/r.js
	
styles:
	rm -rf build/css
	cp -R ./css build/css

watch-editor:
	watchify -v -d -o ./build/editor.js -e editor.js

watch-reader:
	watchify -v -d -o ./build/reader.js -e reader.js

livereload:
	node livereload.js

clean:
	rm -rf build/*

