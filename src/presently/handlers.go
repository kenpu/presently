package presently

import (
	"html/template"
	"io"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/gin-gonic/gin"
)

// filename is the YAML encoding
func ArticleHandler(c *gin.Context, articlePath, filename string) {
	data := readArticle(filename)
	c.HTML(http.StatusOK, "editor.html", gin.H{
		"article": template.JS(data),
		"saveURL": template.JS(path.Join("/api/save", articlePath)),
	})
}

// saves the body into file
func SaveHandler(c *gin.Context) {
	var articlePath = strings.Trim(c.Param("path"), "/")
	var articleFilename = resolveFilename(articlePath)

	if !isArticle(articleFilename) {
		panic("Path is not an article")
	}

	out, err := os.Create(articleFilename)
	defer out.Close()

	if err != nil {
		panic(err.Error())
	}

	var written int64
	for {
		n, err := io.CopyN(out, c.Request.Body, 1024)
		written += n
		if err != nil {
			break
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "okay",
		"path":    articlePath,
		"written": written,
	})
}

func DirectoryHandler(c *gin.Context, dirname string) {
	Todo(c)
}
