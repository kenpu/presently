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

	flag.StringVar(&dir, "dir", ".", "Directory to serve.")
	flag.StringVar(&port, "port", "8080", "Port to serve.")
	flag.Parse()

	fs := http.FileServer(http.Dir(dir))
	http.Handle("/", fs)

	fmt.Printf("[%s] @ [%s]\n", dir, port)

	http.ListenAndServe("0.0.0.0:"+port, nil)
}
