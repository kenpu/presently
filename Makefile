all:
	mkdir -p ./build
	go build -o build/dev src/cmd/dev.go
	go build -o build/deploy src/cmd/deploy.go
	go build -o build/serve src/cmd/serve.go
	cp -R ./js/build ./build/static
	cp -R ./templates ./build/templates

install:
	mkdir -p $(HOME)/bin/presently
	cp -R ./build/* $(HOME)/bin/presently
clean:
	rm -rf ./build/*
