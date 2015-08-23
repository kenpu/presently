package main

import (
	"flag"
	"presently"
)

func main() {
	presently.StaticDir = "./js"
	presently.StaticURL = "/static"
	presently.TemplateDir = "./templates"

	flag.StringVar(&presently.Dir, "dir", "", "Directory of the repository")
	flag.StringVar(&presently.DeployDir, "deploy", "", "Directory of the deployment")
	flag.StringVar(&presently.Port, "port", "", "Port to listen")
	flag.Parse()

	presently.Deploy()
}
