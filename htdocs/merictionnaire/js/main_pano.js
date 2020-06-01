
$(document).ready(function(){

  	$('.panorama-view').panorama360();
    
    soundManager.url = 'swf/';
    soundManager.useHTML5Audio = true;
    soundManager.useFlashBlock = false;
    soundManager.debugMode = false;
    soundManager.defaultOptions['autoLoad'] = false;
    
    soundManager.onready(function(){
        $('.area').each(function(){
            soundManager.createSound('s' + this.id, 'audio/mp3/' + this.id+ '.mp3');
        });
		soundManager.createSound('scredit', 'audio/mp3/credit.mp3');
    });
    
    $.ajax({
        type: "GET",
        url: "data/merictionnaire.xml",
        dataType: "xml",
        success: function(xml){
            currentXML = xml;
        }
    });
    $('.area').bind('click', function(){
        displayOverlay(this.id);
		return false;
    });
});
