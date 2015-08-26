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
	flag.StringVar(&presently.Dir, "d", "", "Directory of the repository")
	flag.StringVar(&presently.Port, "p", "8080", "Port to listen")
	flag.Parse()
	var args = flag.Args()

	if presently.Dir == "" {
		if len(args) == 0 {
			fmt.Println("You need to specify -dir")
			flag.PrintDefaults()
			os.Exit(0)
		} else {
			presently.Dir = args[0]
		}
	}

	go func() {
		url := "http://localhost:" + presently.Port
		time.Sleep(400 * time.Millisecond)
		open.Start(url)
	}()
	presently.Serve()
}
