# Objective
Give experience with socket programming and with Client and Server program patterns. Gain experience with HTTP and HTML client-server pattern.

Allowed implementation platforms: What ever programming language you choose.

# Specifications
The main goal is to create an HTTP-based chat room that is accessed through a web browser. You will build a simple web server that can display HTML and JPG files and also provides a special "resource" called `/CHAT` that will invoke your web-based chat server.

## httpd Server
Example Page: [HTTP Chat Room](https://learningsuite.byu.edu/old/Labs/http_chat_room.htm)

1. Open a Listener on TCP port 9020 that speaks the HTTP protocol ie (run your implemented http server on port 9020), allow 20 connections.
1. Implement an HTTP web server that:
  - has a GET command that works with files and directories. A directory should return a HTML page with links for all the files in the directory.
  - defaults to `/index.html` for a resource on your server.
  - has a magic resource `/CHAT ?name=<name>&line=<chat line>` command that sends <chat line> to your chat room and returns its contents HTML format.
1. When you receive a connection:
  - Display a chat form that gets the name of the participant
  - Create a connection state data structure for each connection.
  - Use some asynchronous method (either threads or asynchronous I/O) to make sure all of the connections are being serviced all the time. Also make sure that the queue data structure is protected from asynchronous errors... i.e. make sure it is "thread safe" if it is required.
  - Each command that you implement should start a thread to do the command, close the socket and exit.

## Chat form
Create an HTML form named "chatform.html" with fields for name and the chat text with a send button that invokes your chat resource letting the user fill in the name and chat. At each action should update the history window on the form.

That is, an HTML form that sends the "name" and "chatLine" variables after the `?` on the `GET /CHAT` line in URL format and the server responds with HTML formatted messages from the chat room.

Read this: [http tutorial](http://www.jmarshall.com/easy/http/)

# Procedure
- Build the server and test it using "localhost" and a web browser with your form, some files to get.
- You must connect with multiple browser windows at the same time.
- Open it up on an external IP address (i.e., a 192 in the lab) and demonstrate with external machines.
- Test your server with two browsers.
