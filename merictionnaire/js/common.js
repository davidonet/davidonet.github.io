var currentId;
var currentXML;

(function($){
    $.fn.shuffle = function(){
        return this.each(function(){
            var items = $(this).children();
            return (items.length) ? $(this).html($.shuffle(items)) : this;
        });
    }
    
    $.shuffle = function(arr){
        for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) 
            ;
        return arr;
    }
})(jQuery);


function displayOverlay(anId){
    var cache = [];
    $(currentXML).find('#' + anId).children().each(function(){
        var cacheImage = document.createElement('img');
        cacheImage.src = $(this).attr('src');
        cache.push(cacheImage);
    });
    
    currentId = 's' + anId;
    aCurrentSM = soundManager.play(currentId, {
        onfinish: function(){
            $.modal.close();
        }
    });
	soundManager.pause(aCurrentSM);
    var aCount = 0;
    $(currentXML).find('#' + anId).children().each(function(){
        var aSrc = $(this).attr('src');
        aCurrentSM.onposition($(this).attr('time'), function(evPos){
            if (aCount % 2) {
                $('#slide2').attr('src', aSrc);
                $('#slide2').fadeIn(1500);
                $('#slide1').fadeOut(1500);
            }
            else {
                $('#slide1').attr('src', aSrc);
                $('#slide1').fadeIn(1500);
                $('#slide2').fadeOut(1500);
            }
            aCount++;
        });
    });
    $('#sndtitle').text($(currentXML).find('#' + anId).attr('name'));
    $('#sndspeaker').text($(currentXML).find('#' + anId).attr('speaker'));
	soundManager.resume(aCurrentSM);
    $('#myslideshow').modal({
        onClose: function(dialog){
            dialog.data.fadeOut('slow', function(){
            
                dialog.container.slideUp('normal', function(){
                    dialog.overlay.fadeOut('fast', function(){
                        $.modal.close(); // must call this!
                    });
                });
            });
            soundManager.stop(currentId);
        },
        onOpen: function(dialog){
            dialog.overlay.fadeIn('fast', function(){
                dialog.container.slideDown('normal', function(){
                    dialog.data.fadeIn('slow');
                })
            });
        }
    });
}
