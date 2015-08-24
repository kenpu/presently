package main

import (
	"flag"
	"fmt"
	"os"
	"presently"
)

func main() {
	flag.StringVar(&presently.Dir, "dir", "", "Directory of the repository")
	flag.StringVar(&presently.Port, "port", "8080", "Port to listen")
	flag.Parse()

	if presently.Dir == "" {
		fmt.Println("You need to specify -dir")
		flag.PrintDefaults()
		os.Exit(0)
	}

	presently.Serve()
}
