package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/zenazn/goji"
	"github.com/zenazn/goji/web"
)

type chatMessage struct { // A message structure to put in the chat buffer
	User    string
	Message string
}

var chatBuffer []chatMessage // The chat buffer

func health(c web.C, w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s\n", "Uh, we had a slight weapons malfunction, but uh... everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?")
}

func postMessage(c web.C, w http.ResponseWriter, r *http.Request) {
	// Spec-defined query parameters
	name := r.URL.Query().Get("name")
	line := r.URL.Query().Get("line")

	message := chatMessage{User: name, Message: line}
	chatBuffer = append(chatBuffer, message)

	fmt.Fprintf(w, "%s\n", chatBuffer)
}

func main() {
	goji.Get("/health", health)    // Service health
	goji.Get("/chat", postMessage) // This hurts me because this is definitely not how a RESTful endpoint should work but the project spec demanded it
	goji.Handle("/*", http.FileServer(http.Dir("content")))
	flag.Set("bind", ":9020") // Set the port that Goji listens on
	goji.Serve()              // Start listening
}
