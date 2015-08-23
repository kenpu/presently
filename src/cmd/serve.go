package main

import (
	"fmt"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	fmt.Println("Serving current directory @8080.")
	http.ListenAndServe("0.0.0.0:8080", nil)
}
