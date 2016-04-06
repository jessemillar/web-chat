$(document).ready(function() {
    populateChat(); // Load chat messages on page start
});

function populateChat() {
    console.log("Populating chat");
    $.ajax({
        url: 'http://woodsman.jessemillar.com:9020/chat',
        datatype: 'application/json',
        success: function(data) {
            data = JSON.parse(data); // Parse the JSON into an object
            $("#chatbox").html(""); // Wipe the current messages
            for (var message in data) { // Insert chat log into the #chatbox div
                $("#chatbox").append("<b>" + data[message].User + "</b>: " + data[message].Message + "<br>");
            }
        }
    });
}

function sendMessage() {
    console.log("Sending message");
    $.ajax({
        type: "POST",
        url: "http://woodsman.jessemillar.com:9020/chat?name=" + $('#name').val() + "&line=" + $('#line').val(),
        success: function() {
            console.log("Message sent");
            $('#line').val(''); // Wipe the input field
            populateChat(); // Get the chat log now for instant feedback
        }
    });
}

var interval = setInterval(populateChat, 1000); // Refresh every second
