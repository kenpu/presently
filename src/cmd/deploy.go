package main

import (
	"flag"
	"fmt"
	"os"
	"presently"
)

func main() {
	flag.StringVar(&presently.Dir, "d", "", "Directory of the repository")
	flag.StringVar(&presently.DeployDir, "o", "", "Directory of the deployment")
	flag.StringVar(&presently.Port, "p", "", "Port to listen")
	flag.Parse()
	args := flag.Args()

	if presently.Dir == "" {
		if len(args) == 0 {
			fmt.Println("You need to specify -d")
			flag.PrintDefaults()
			os.Exit(0)
		} else {
			presently.Dir = args[0]
		}
	}

	if presently.DeployDir == "" {
		fmt.Println("You need to specify -o")
		flag.PrintDefaults()
		os.Exit(0)
	}

	presently.Deploy()
}
