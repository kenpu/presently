package presently

import (
	"io/ioutil"
	"os"
	"path/filepath"
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
