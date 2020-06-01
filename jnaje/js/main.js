/*global $:true Popcorn:true twttr:true*/

$(function() {

  $.popcorn = Popcorn('#myAudio');

  $.popcorn.cue(1, function() {
    $('#caution').fadeOut(20000);
  });

  $.popcorn.cue(232, function() {
    $('#credits').fadeIn(1000, function() {
      window.scrollTo(0, document.body.scrollHeight);
    });
  });

  function InterVideo(id) {
    var videoelt = $(id);
    return {
      start: function() {
        $('#container').fadeOut(1000, function() {
          videoelt[0].play();
          videoelt.fadeIn(1000);
        });
      },
      stop: function() {
        videoelt.fadeOut(2000, function() {
          videoelt[0].pause();
          $('#container').fadeIn(1000);
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
    };
  }
  var refrain1 = new InterVideo('#refrain1');
  var refrain2 = new InterVideo('#refrain2');
  var finidetre = new InterVideo('#finidetre');

  $.popcorn.cue(68, refrain1.start);
  $.popcorn.cue(105, refrain1.stop);
  $.popcorn.cue(150, refrain2.start);
  $.popcorn.cue(160, refrain2.stop);
  $.popcorn.cue(207, finidetre.start);
  $.popcorn.cue(230, finidetre.stop);


  $.get('https://wt-eecc0b23b57e851cf299a64d06f7dca7-0.sandbox.auth0-extend.com/express', function(data) {
    $.each(data, function(i, obj) {
      $.popcorn.cue(obj.position - .5, function() {
        $('#container').append('<div class="word">' + obj.word + '</div>');
        var n = Math.floor(Math.random() * (obj.twitt.length - 1));
        twttr.widgets.createTweet(
          obj.twitt[n],
          document.getElementById('container'), {
            conversation: 'none'
          }
        );
        $('html,body').animate({
          scrollTop: $('#container').height() + 200
        }, 2000, 'swing');
      });
    });
  });

});
