all: build-cmd build-files

build-cmd:
	mkdir -p ./build
	go build -o build/dev src/cmd/dev.go
	go build -o build/deploy src/cmd/deploy.go
	go build -o build/serve src/cmd/serve.go


build-files:
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
	mkdir -p $(HOME)/bin/presently
	cp -R ./build/* $(HOME)/bin/presently
clean:
	rm -rf ./build/*
