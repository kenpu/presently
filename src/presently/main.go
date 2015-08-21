package presently

import (
	"log"
	"net/http"
	"path"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

var (
	Dir         string
	TemplateDir string
	StaticDir   string
	StaticURL   string
	Port        string
)

func Router() *gin.Engine {
	router := gin.Default()

	router.LoadHTMLGlob(path.Join(TemplateDir, "includes", "*.html"))
	router.LoadHTMLGlob(path.Join(TemplateDir, "*.html"))

	// static files
	router.StaticFS(StaticURL, http.Dir(StaticDir))
	router.StaticFile("/favicon.ico", filepath.Join(StaticDir, "favicon.ico"))


	// APIs

	router.GET("/api/ls/*path", catch(Todo))
	router.POST("/api/save/*path", catch(SaveHandler))

	router.NoRoute(catch(PathHandler))

	return router
}

func catch(handler gin.HandlerFunc) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				c.String(http.StatusInternalServerError, "EXCEPTION: %s", r)
			}
		}()

		handler(c)
	}
}

func Todo(c *gin.Context) {
	panic("TODO")
}

func PathHandler(c *gin.Context) {
	if(c.Request.Method != "GET") {
		panic("Cannot resolve");
	}

	articlePath := strings.Trim(c.Request.URL.Path, "/")
	filename := resolveFilename(articlePath)

	if !exists(filename) {
		panic("File does not exist:" + filename)
	}

	switch {
	case isArticle(filename):
		ArticleHandler(c, articlePath, filename)
	case isDirectory(filename):
		DirectoryHandler(c, filename)
	default:
		http.ServeFile(c.Writer, c.Request, filename)
	}
}

func RootHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "root.html", gin.H{
		"title": "Root",
	})
}

func Serve() {
	log.Println("Dir =", Dir)
	log.Println("Port =", Port)

	router := Router()

	router.Run("0.0.0.0:" + Port)
}
