package presently

import (
	"errors"
	"io/ioutil"
	"os"
	_path "path"
	"path/filepath"
	"sort"
	"strings"
)

func exists(filename string) bool {
	_, err := os.Stat(filename)

	return err == nil
}

func resolveFilename(path string) string {
	path = strings.Trim(path, "/")
	return filepath.Join(Dir, path)
}

func isArticle(filename string) bool {
	return !(strings.Contains(filename, ".") || isDirectory(filename))
}

func isDirectory(name string) bool {
	fi, err := os.Stat(name)
	if err == nil {
		return fi.IsDir()
	}
	return false
}

func readArticle(filename string) string {
	if buf, err := ioutil.ReadFile(filename); err != nil {
		panic(err.Error())
	} else {
		return string(buf)
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
	return list[i].Path < list[j].Path
}

func listRepo(topURL, topDir string, maxFiles int64) (list entries) {
	var counter int64

	topURL = _path.Clean(topURL)
	topDir = filepath.Clean(topDir)

	var walker = func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		counter += 1
		if counter > maxFiles {
			return errors.New("Too many files in repo.")
		}

		relpath := path[len(topDir):]

		var url = _path.Join(topURL, relpath)
		var dir = filepath.Join(topDir, relpath)

		list = append(list,
			entry{
				URL:       url,
				Path:      dir,
				Relpath:   relpath,
				IsDir:     info.IsDir(),
				IsArticle: isArticle(dir),
			})

		return nil
	}

	filepath.Walk(topDir, walker)

	sort.Sort(list)

	return list
}
