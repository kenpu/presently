package presently

import (
	"fmt"
	"html/template"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

var (
	MAX_FILES = 10
	DeployDir string
	rdrTmpl   *template.Template
	dirTmpl   *template.Template
)

func makeArticle(targetpath string, data gin.H) {
	w, err := os.Create(targetpath)
	if err != nil {
		panic(err.Error())
	}
	defer w.Close()

	err = rdrTmpl.Execute(w, data)
	if err != nil {
		panic(err.Error())
	}
}

func makeDir(targetpath string, data gin.H) {
	w, err := os.Create(targetpath)
	if err != nil {
		panic(err.Error())
	}
	defer w.Close()

	err = dirTmpl.Execute(w, data)
	if err != nil {
		panic(err.Error())
	}
}

func makeCopy(targetpath string, e entry) {

}

func Deploy() {
	var tmplfile = filepath.Join(TemplateDir, "read.html")
	var dirtmplfile = filepath.Join(TemplateDir, "dir.html")
	var headfile = filepath.Join(TemplateDir, "head.html")
	var footfile = filepath.Join(TemplateDir, "footer.html")
	var err error

	rdrTmpl, err = template.ParseFiles(tmplfile, headfile, footfile)
	if err != nil {
		panic(err.Error())
	}

	dirTmpl, err = template.ParseFiles(dirtmplfile)
	if err != nil {
		panic(err.Error())
	}

	list := listRepo("", Dir, 1024*10)

	for _, entry := range list {
		targetpath := filepath.Join(DeployDir, entry.Relpath)

		switch {
		case entry.IsDir:

			os.Mkdir(targetpath, 0755)
			targetpath = filepath.Join(targetpath, "index.html")

			isroot := (entry.URL == "")
			root := entry.URL
			list2 := listRepo(entry.URL, entry.Path, 1024)
			makeDir(targetpath, gin.H{
				"title":   filepath.Base(entry.Path),
				"entries": list2,
				"root":    root,
				"isroot":  isroot,
			})

		case isArticle(entry.Path):

			targetpath += ".html"

			fmt.Println("making article:", targetpath)
			data := readArticle(entry.Path)
			makeArticle(targetpath, gin.H{
				"title":   filepath.Base(entry.Path),
				"article": template.JS(data),
			})

		default:
			makeCopy(targetpath, entry)
		}
	}
}
