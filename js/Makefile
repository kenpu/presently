all:
	browserify -v -d -o ./build/bundle.js -e main.js

watch-editor:
	npm start

watch-reader:
	watchify -v -d -o ./build/reader.js -e reader.js

livereload:
	node livereload.js

clean:
	rm -f build/*

