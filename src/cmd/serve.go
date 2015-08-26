package main

import (
	"flag"
	"fmt"
	"net/http"
)

func main() {
	var (
		dir  string
		port string
	)

	flag.StringVar(&dir, "d", ".", "Directory to serve.")
	flag.StringVar(&port, "p", "8080", "Port to serve.")
	flag.Parse()
	args := flag.Args()

	if len(args) > 0 {
		dir = args[0]
	}

	fs := http.FileServer(http.Dir(dir))
	http.Handle("/", fs)

	fmt.Printf("[%s] @ [%s]\n", dir, port)

	http.ListenAndServe("0.0.0.0:"+port, nil)
}
