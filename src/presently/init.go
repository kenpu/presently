package presently

import (
	"os"
	"path/filepath"
)

func init() {
	mypath, _ := filepath.Abs(os.Args[0])
	mypath = filepath.Dir(mypath)
	StaticDir = filepath.Join(mypath, "static")
	TemplateDir = filepath.Join(mypath, "templates")
	StaticURL = "/static"
}
