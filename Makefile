prod: build-cmd build-files

devjs: build-cmd
	rm -rf ./build/static
	rm -rf ./build/templates
	mkdir -p ./build/static
	ln -s $(PWD)/js/build/*.js ./build/static/
	ln -s $(PWD)/js/css ./build/static/css
	ln -s $(PWD)/js/libs ./build/static/libs
	ln -s $(PWD)/templates ./build/templates

build-cmd:
	mkdir -p ./build
	go build -o build/dev src/cmd/dev.go
	go build -o build/deploy src/cmd/deploy.go
	go build -o build/serve src/cmd/serve.go


build-files:
	rm -rf ./build/static ./build/templates
	mkdir -p ./build/static
	mkdir -p ./build/templates

	cp -R ./js/build/* ./build/static
	cp -R ./templates/* ./build/templates

link-files:
	rm -rf ./build/static
	rm -rf ./build/templates
	ln -s $(PWD)/js/build ./build/static
	ln -s $(PWD)/templates ./build/templates

install:
	rm -rf $(HOME)/bin/presently
	ln -s $(PWD)/build $(HOME)/bin/presently
clean:
	rm -rf ./build/*
