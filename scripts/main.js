$(document).ready(function() {
    populateChat();
});

function populateChat() {
    $.ajax({
        url: 'http://woodsman.jessemillar.com:9020/chat',
        datatype: 'application/json',
        success: function(data) {
            var i = 0;
            $("#chatbox").html("");
            for (var i in data) { //Insert chat log into the #chatbox div
                $("#chatbox").append(data[i].User + " says: " + data[i].Message + "<br>");
            }
        }
    });
}

var interval = setInterval(populateChat, 1000);
