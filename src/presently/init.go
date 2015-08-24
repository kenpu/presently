package presently

import (
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.ReleaseMode)

	mypath, _ := filepath.Abs(os.Args[0])
	mypath = filepath.Dir(mypath)
	StaticDir = filepath.Join(mypath, "static")
	TemplateDir = filepath.Join(mypath, "templates")
	StaticURL = "/static"
}
