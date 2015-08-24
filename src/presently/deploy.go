package presently

import (
	"fmt"
	"html/template"
	"io"
	"os"
	_path "path"
	"path/filepath"
	"strings"

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

func makeCopy(targetpath string, source string) {
	r, err := os.Open(source)
	if err != nil {
		panic(err.Error())
	}
	defer r.Close()

	w, err := os.Create(targetpath)
	if err != nil {
		panic(err.Error())
	}
	defer w.Close()

	_, err = io.Copy(w, r)
	if err != nil {
		panic(err.Error())
	}
}

func copyDir(target, source string) {
	source = _path.Clean(source)

	var walker = func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if strings.HasPrefix(filepath.Base(path), ".") {
			return filepath.SkipDir
		}

		var relpath = path[len(source):]
		var targetpath = filepath.Join(target, relpath)

		if info.IsDir() {
			os.MkdirAll(targetpath, 0755)
		} else {
			makeCopy(targetpath, path)
		}

		return nil
	}

	filepath.Walk(source, walker)
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
	os.MkdirAll(DeployDir, 0755)

	// copy over the static directory
	targetpath := filepath.Join(DeployDir, StaticURL)

	fmt.Println("[STATIC ]:", targetpath)
	copyDir(targetpath, StaticDir)

	// generate the files
	for _, entry := range list {
		targetpath := filepath.Join(DeployDir, entry.Relpath)

		switch {
		case entry.IsDir:

			os.Mkdir(targetpath, 0755)
			targetpath = filepath.Join(targetpath, "index.html")
			fmt.Println("[INDEX  ]:", targetpath)

			isroot := (entry.URL == "")
			root := entry.URL
			sublist := listRepo("", entry.Path, 1024)
			makeDir(targetpath, gin.H{
				"title":   filepath.Base(entry.Path),
				"entries": sublist,
				"root":    root,
				"isroot":  isroot,
			})

		case isArticle(entry.Path):

			targetpath += ".html"

			fmt.Println("[ARTICLE]:", targetpath)
			data := readArticle(entry.Path)
			makeArticle(targetpath, gin.H{
				"title":   filepath.Base(entry.Path),
				"article": template.JS(data),
			})

		default:
			fmt.Println("[File]:", targetpath)
			makeCopy(targetpath, entry.Path)
		}
	}

	// generate the top index
	makeDir(filepath.Join(DeployDir, "index.html"), gin.H{
		"title":   filepath.Base(Dir),
		"entries": list,
		"root":    filepath.Base(Dir),
		"isroot":  true,
	})
}
