FROM golang:1.5

RUN mkdir -p /go/src/github.com/jessemillar
ADD . /go/src/github.com/jessemillar/web-chat

WORKDIR /go/src/github.com/jessemillar/web-chat
RUN go get -d -v
RUN go install -v

CMD ["/go/bin/web-chat"]

EXPOSE 9020
