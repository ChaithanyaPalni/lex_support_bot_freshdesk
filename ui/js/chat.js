// Bot runtime Values
var user_session={};
var lexruntime;
var lexUserId = "user_"+ Math.floor(Math.random()*90000) + 10000;



$(document).ready(function () {
    configreAWS();
    appendBotResponse(welcomeMessage);
    $(".msg_send_btn").click(function () {
        chatActions();
    });

    $('.write_msg').keydown(function(event){ 
        var keyCode = (event.keyCode ? event.keyCode : event.which);   
        if (keyCode == 13) {
            chatActions();
        }
    });
    $(document).on('click', '.single-button' ,function(){
        var message = $(this).text();
        vanish_buttons();
        appendUserMessage(message);
        getBotResponse(message);    
    });
});

function chatActions(){
    var message = $('.write_msg').val();
    appendUserMessage(message);
    getBotResponse(message);
}



function getBotResponse(message) {
    // send it to the Lex runtime
    var params = {
        botAlias: botAlias,
        botName: botName,
        inputText: message,
        userId: lexUserId,
        sessionAttributes: user_session
    };

    lexruntime.postText(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            appendBotResponse(errorMessage);
        }
        if (data) {
            console.log("Bot response is "+ JSON.stringify(data));
            user_session = data.sessionAttributes;
            var response_cards =process_response_cards(data.responseCard);  
            console.log('Final response card is '+ response_cards);         
            appendBotResponse(data.message,response_cards);
  
        }
    });
}

