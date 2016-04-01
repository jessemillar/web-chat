"""Listen on a server for connections and handle them appropriately"""

import SocketServer
from threading import Thread

BUFFER = []
HOST = "localhost"
PORT = 9020

class Handler(SimpleHTTPRequestHandler):
    """Handle connections, messages, and returning data"""
    def handler():
        """Route messages to the proper functions"""
        print "Stuff"

    def chat(self, query):
        """React to a single message"""
        print query
        if 'name' in query and 'line' in query:
            BUFFER.append("%s: %s" % (query['name'][0] if query['name'][0] > '' else "unknown", query['line'][0]))

        history()

    def history(self):
        """Return the chat history to the user"""
        log = ''.join('<li>%s</li>' % t for t in BUFFER)
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header("Content-Length", str(len(log)))
        self.end_headers()
        self.wfile.write(log)

def main():
    """Where the magic happens"""
    print "Starting chat server"

    server = ThreadedTCPServer((HOST, PORT), handler)
    server.serve_forever

    print "Chat server started"

main()  # Run the function so the module is useful in a CLI
