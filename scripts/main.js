$(document).ready(function() {
    populateChat();
});

function populateChat() {
    console.log("Populating chat");
    $.ajax({
        url: 'http://woodsman.jessemillar.com:9020/chat',
        datatype: 'application/json',
        success: function(data) {
            data = JSON.parse(data);
            $("#chatbox").html("");
            for (var message in data) { //Insert chat log into the #chatbox div
                $("#chatbox").append("<b>" + data[message].User + "</b>: " + data[message].Message + "<br>");
            }
        }
    });
}

$('#send_chat').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'server.go',
        type:'GET',
        success:function(){
            $('#usrmsg').val('');
        }
    });
});

var interval = setInterval(populateChat, 1000);
