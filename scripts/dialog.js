let typingBool = false; 
let typingLength=0; 
//setinterval value
let typingStart;
//text array in json
let typingText;
//json text array num
let typingIndex = 0;
let item;

$(function() {
    const jsonURL = '../data/log_data.json';
    $.getJSON(jsonURL,
        function (data) {
            $(".bag").on("click", function (event) {
                if($(".dialog").css("visibility") == "visible") return;
                console.log("bag click event")
                item = data.bag;
                event.stopPropagation()
                dialog()
                console.log("bag click event end")
            })
            $(".desk").on("click", function (event) {
                if($(".dialog").css("visibility") == "visible") return;
                console.log("desk click event")
                item = data.desk;
                event.stopPropagation()
                dialog()
            })
            item = data.test
            dialog()
        }
    );
})
    
function dialog(){
    console.log(item.length)
    if(item.length <= typingIndex){
        console.log("다시 플레이어 숨기기")
        $(".player").css("display", "none")
        $(".player_text_area").css("display", "none")
        $(".dialog").css("visibility", "hidden")
        typingIndex = 0;
        return;
    }
    console.log("로그 재생 시작" + typingIndex)
    $(".player").css("display", "block")
    $(".player_text_area").css("display", "block")
    $(".dialog").css("visibility","visible")
    $(".player_text").text(item[typingIndex])
    typingText = $(".player_text").text(); 
    typingText=typingText.split("");
    console.log(typingText + "" + typingBool)
    if($(".typing").text() != null){
        $(".typing").text("")
    }
    if($(".next_text").css('display') == 'block'){
        $(".next_text").css('display', 'none')
    }
    if(typingBool==false){ 
        typingBool=true;     
        typingStart = setInterval(typing,100);
    } 
}

function typing(){ 
    console.log("타이핑 시작")
    if(typingLength<typingText.length){ 
        $(".typing").append(typingText[typingLength]);
        typingLength++; 
    } else{ 
        typingLength=0;
        $(".next_text").css('display','block');
        clearInterval(typingStart); 
    } 
}  

function clicker(){
    if($(".dialog").css('visibility') == 'hidden'){
        console.log("body 클릭 없앰")
        return;
    }
    if($(".next_text").css('display') != 'none'){
        console.log("다음 텍스트")
        typingBool = false
        typingIndex++;
        dialog();
    }else{
        console.log("빠른 텍스트")
        clearInterval(typingStart);
        typingLength=0;
        $(".typing").text($(".player_text").text())
        $(".next_text").css('display', 'block');
    }
}