$(document).ready(function() {
    populateChat();
});

function populateChat() {
    $.ajax({
        url: 'http://woodsman.jessemillar.com:9020/chat',
        datatype: 'application/json',
        success: function(data) {
            console.log(data);
            $("#chatbox").html("");
            for (var message in data) { //Insert chat log into the #chatbox div
                $("#chatbox").append(data[message].User + " says: " + data[message].Message + "<br>");
            }
        }
    });
}

var interval = setInterval(populateChat, 1000);
