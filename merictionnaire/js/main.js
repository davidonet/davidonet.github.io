$(document).ready(function(){
	
    $('ul').shuffle();

    soundManager.url = 'swf/';
    soundManager.useHTML5Audio = true;
    soundManager.useFlashBlock = false;
    soundManager.debugMode = false;
    soundManager.defaultOptions['autoLoad'] = false;
    
    soundManager.onready(function(){
        $('.entry').each(function(){
            soundManager.createSound('s' + this.id, 'audio/mp3/' + this.id + '.mp3');
        });
		soundManager.createSound('scredit', 'audio/mp3/credit.mp3');
    });
    
	
    $('.entry').bind('click', function(){
        displayOverlay(this.id);
    });
    
    $('.entry').bind('mouseover', function(){
        $(this).next().slideDown('normal');
    });
    
    $('.entry').bind('mouseout', function(){
        $(this).next().slideUp('slow');
    });
    
    $.ajax({
        type: "GET",
        url: "data/merictionnaire.xml",
        dataType: "xml",
        success: function(xml){
            currentXML = xml;
        }
    });    
});
