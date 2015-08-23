package presently

import (
	"html/template"
	"io"
	"net/http"
	"os"
	_path "path"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func ArticleHandler(c *gin.Context, articlePath, filename string) {
	data := readArticle(filename)
	c.HTML(http.StatusOK, "editor.html", gin.H{
		"title":   articlePath,
		"article": template.JS(data),
		"saveURL": template.JS(_path.Join("/api/save", articlePath)),
	})
}

func ReadHandler(c *gin.Context) {
	path := c.Param("path")
	data := readArticle(resolveFilename(path))

	c.HTML(http.StatusOK, "read.html", gin.H{
		"title":   path,
		"article": template.JS(data),
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
		"path":    articlePath,
		"written": written,
	})
}

func DirHandler(c *gin.Context, dirpath, dirname string) {

	var isroot bool = dirpath == ""
	var root = _path.Join(filepath.Base(Dir), dirpath)
	var list entries = listRepo(dirpath, dirname, 1024*10)

	c.HTML(http.StatusOK, "dir-editor.html", gin.H{
		"title":   dirpath,
		"entries": list,
		"root":    root,
		"isroot":  isroot,
	})
}
