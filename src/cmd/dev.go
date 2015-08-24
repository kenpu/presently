package main

import (
	"flag"
	"fmt"
	"os"
	"presently"
	"time"

	"github.com/skratchdot/open-golang/open"
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

	fmt.Println("TemplateDir =", presently.TemplateDir)

	go func() {
		url := "http://localhost:" + presently.Port
		time.Sleep(400 * time.Millisecond)
		open.Start(url)
	}()
	presently.Serve()
}
