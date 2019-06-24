function appendUserMessage(message){
    var time = getDateTime();
    var out_going_message = `<div class="outgoing_msg" style="margin-top:27px; margin-bottom:20px;margin-right:15px;">
                                <div class="sent_msg">
                                    <p>`+message+`</p>
                                    <span class="time_date">`+time+`</span>
                                </div>
                            </div>`;
        $('.msg_history').append(out_going_message);
        $('.write_msg').val('');
        appendTyping();
        $('.msg_history').scrollTop(2000);
}

function appendBotResponse(message,buttons){
    if(!buttons){buttons ='';}
    var time = getDateTime();
    var incoming_msg = `<div class="incoming_msg" style="margin-top:27px; margin-bottom:20px;">
                            <div class="incoming_msg_img"> <img src="images/azure_bot.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>`+message+`</p>`+buttons+`
                                        <span class="time_date">`+time+ `</span>
                                    </div>
                                </div>
                            </div>`;
    setTimeout(function(){        
        $('.incoming_msg').last().remove();                
        $('.msg_history').append(incoming_msg);
        $('.msg_history').scrollTop(2000);
    },1500);
}


function appendButtons(message){
    var time = getDateTime();
    var incoming_msg = `<div class="incoming_msg" style="margin-top:27px; margin-bottom:20px;">
                            <div class="incoming_msg_img"> <img src="images/azure_bot.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                      <p style="padding:5px 0px " class="btn-primary">Sample</p>
                                    </div>
                                </div>
                            </div>`;
    setTimeout(function(){ 
        if($('.incoming_msg').last().attr('data-isTyping') === "YES" ){    
            $('.incoming_msg').last().remove();   
        }             
        $('.msg_history').append(incoming_msg);
        $('.msg_history').scrollTop(2000);
    },1000);
}

function appendTyping(){
    var typing_message = `<div class="incoming_msg" data-isTyping="YES" style="margin-top:27px; margin-bottom:20px;">
    <div class="incoming_msg_img"> <img src="images/azure_bot.png" alt="sunil"> </div>
        <div class="received_msg">
            <div class="received_withd_msg">
                <img src="images/typing_loader.gif">
            </div>
        </div>
    </div>`; 
    $('.msg_history').append(typing_message);
    $('.msg_history').scrollTop(2000);
}


function getDateTime(){
    var date_now = new Date();
    var hours = date_now.getHours();
    var minutes = date_now.getMinutes();
    var am = "AM"
    if(hours >12){
        hours = hours -12;
        am ="PM";
    }
    if(hours <10){hours = "0"+hours;}
    if(minutes <10){minutes = "0"+minutes;}
    return hours + ":"+minutes + " "+ am + " | Today"; 
}



function process_response_cards(responseCard){
    console.log('Response card is '+ JSON.stringify(responseCard));
    var buttons =[];
    if(responseCard && responseCard.genericAttachments && responseCard.genericAttachments.length >0){
        var buttons_values = JSON.parse(JSON.stringify(responseCard.genericAttachments));
        console.log('Button values are '+ JSON.stringify(buttons_values));
        var check_carousel =check_for_carousel(buttons_values);
        console.log('Carousel'+ check_carousel);
        if(!check_carousel){
            for(var i=0; i<=buttons_values.length -1; i++){
                buttons.push(buttons_values[i].title);
            }
            console.log('I am in and buttons are '+ JSON.stringify(buttons));
            return buttons_div_construct(buttons);
        }else{
            return '';
        }
    }
}

function check_for_carousel(arr){
    for(var i=0; i<=arr.length-1; i++){
        if(arr[i].imageUrl){
            return true;
        }
    }
    return false;
}

function buttons_div_construct(p_buttons){
    var html_buttons = '<div class="buttons-div">';
    for(var i=0; i<=p_buttons.length-1; i++){
        var single_button = '<p class="single-button text-center">'+ p_buttons[i] +'</p>';
        html_buttons+=single_button;
    }
    return html_buttons+='</div>';
}

function vanish_buttons(){
    $('.single-button').remove();
}