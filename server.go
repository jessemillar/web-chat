package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/zenazn/goji"
	"github.com/zenazn/goji/web"
)

func health(c web.C, w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s\n", "Uh, we had a slight weapons malfunction, but uh... everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?")
}

func postChat(c web.C, w http.ResponseWriter, r *http.Request) {
	println("Stuff")
}

func main() {
	goji.Get("/health", health) // Service health
	goji.Post("/chat ?name=<name>&line=<chat line>", postChat)
	flag.Set("bind", ":9200")
	goji.Serve()
}
