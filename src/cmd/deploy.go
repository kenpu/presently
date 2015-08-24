package main

import (
	"flag"
	"fmt"
	"os"
	"presently"
)

func main() {
	flag.StringVar(&presently.Dir, "dir", "", "Directory of the repository")
	flag.StringVar(&presently.DeployDir, "deploy", "", "Directory of the deployment")
	flag.StringVar(&presently.Port, "port", "", "Port to listen")
	flag.Parse()

	if presently.Dir == "" {
		fmt.Println("You need to specify -dir")
		flag.PrintDefaults()
		os.Exit(0)
	}

	if presently.DeployDir == "" {
		fmt.Println("You need to specify -deploy")
		flag.PrintDefaults()
		os.Exit(0)
	}

	presently.Deploy()
}
