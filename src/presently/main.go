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

	log.Printf("Using templatedir: %s", TemplateDir)
	router.LoadHTMLGlob(path.Join(TemplateDir, "*.html"))

	// static files
	router.StaticFS(StaticURL, http.Dir(StaticDir))
	router.StaticFile("/favicon.ico", filepath.Join(StaticDir, "favicon.ico"))

	// APIs

	router.GET("/api/ls/*path", catch(Todo))
	router.POST("/api/save/*path", catch(SaveHandler))

	// reading
	router.GET("/read/*path", catch(ReadHandler))

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
	panic("TODO: " + c.Request.URL.Path)
}

func PathHandler(c *gin.Context) {
	if c.Request.Method != "GET" {
		panic("Cannot resolve")
	}

	articlePath := strings.TrimRight(c.Request.URL.Path, "/")
	filename := resolveFilename(articlePath)

	if !exists(filename) {
		panic("File does not exist:" + filename)
	}

	switch {
	case isArticle(filename):
		log.Printf("[Article] %s", filename)
		ArticleHandler(c, articlePath, filename)
	case isDirectory(filename):
		log.Printf("[Directory] %s", filename)
		DirHandler(c, articlePath, filename)
	default:
		log.Printf("[File] %s", filename)
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
