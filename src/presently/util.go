package presently

import (
	"errors"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	_path "path"
	"path/filepath"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
)

func exists(filename string) bool {
	_, err := os.Stat(filename)

	return err == nil
}

func resolveFilename(path string) string {
	path = strings.Trim(path, "/")
	return filepath.Join(Dir, path)
}

func isArticle(filename string) (result bool) {
	if isDirectory(filename) {
		result = false
	} else {
		ext := filepath.Ext(filename)
		if len(ext) == 0 || len(ext) >= 5 {
			result = true
		}
	}

	return
}

func isDirectory(name string) bool {
	fi, err := os.Stat(name)
	if err == nil {
		return fi.IsDir()
	}
	return false
}

type Article struct {
	data       string
	useMathjax bool
}

func readArticle(filename string) *Article {
	var article Article

	if buf, err := ioutil.ReadFile(filename); err != nil {
		panic(err.Error())
	} else {
		article.data = string(buf)
		if strings.Contains(article.data, "@mathjax") {
			article.useMathjax = true
		}
	}

	return &article
}

func renderArticle(c interface{}, path string, arg string) {
	// inject content
	stylePath := resolveFilename("style.css")
	coverPath := resolveFilename("_cover")

	styleContent, _ := ioutil.ReadFile(stylePath)
	coverJSON, _ := ioutil.ReadFile(coverPath)

	article := readArticle(path)

	data := gin.H{
		"title":      filepath.Base(path),
		"article":    template.JS(article.data),
		"useMathjax": article.useMathjax,
		"style":      styleContent,
		"cover":      template.JS(coverJSON),
	}

	switch target := c.(type) {
	case *gin.Context:
		// arg is the template used
		target.HTML(http.StatusOK, arg, data)
	case *template.Template:
		// arg is the file to be written to
		w, err := os.Create(arg)
		if err != nil {
			panic(err.Error())
		}
		target.Execute(w, data)
	}
}

/* ======= file listing ========= */
type entry struct {
	Path      string `json:"path"`
	URL       string `json:"url"`
	Relpath   string `json:"relpath"`
	IsDir     bool   `json:"isdir"`
	IsArticle bool   `json:"isarticle"`
}

type entries []entry

func (list entries) Len() int {
	return len(list)
}
func (list entries) Swap(i, j int) {
	list[i], list[j] = list[j], list[i]
}
func (list entries) Less(i, j int) bool {
	var a, b = list[i], list[j]
	var dir_a, dir_b = filepath.Dir(a.Path), filepath.Dir(b.Path)
	var base_a, base_b = filepath.Base(a.Path), filepath.Base(b.Path)

	if dir_a == dir_b {
		if a.IsDir == b.IsDir {
			return base_a < base_b
		} else {
			return (!a.IsDir && b.IsDir)
		}
	} else {
		return dir_a < dir_b
	}
}

func shouldIgnore(path, context string) bool {
	base := filepath.Base(path)
	if strings.HasPrefix(base, ".") || base == "Makefile" || strings.HasSuffix(base, "private") {
		return true
	}

	if context != "editor" {
		if strings.HasPrefix(base, "_") {
			return true
		}
	}

	return false
}

func listRepo(topURL, topDir string, context string, maxFiles int64) (list entries) {
	var counter int64

	topURL = _path.Clean(topURL)
	topDir = filepath.Clean(topDir)

	var walker = func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if shouldIgnore(path, context) {
			return nil
		}

		counter += 1
		if counter > maxFiles {
			return errors.New("Too many files in repo.")
		}

		relpath := path[len(topDir):]

		var url = _path.Join(topURL, relpath)
		var dir = filepath.Join(topDir, relpath)

		if len(relpath) > 0 {
			list = append(list,
				entry{
					URL:       url,
					Path:      dir,
					Relpath:   relpath,
					IsDir:     info.IsDir(),
					IsArticle: isArticle(dir),
				})
		}

		return nil
	}

	filepath.Walk(topDir, walker)

	sort.Sort(list)

	return list
}
