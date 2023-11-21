$(document).ready(function(){

    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle + 360 : angle;
    }

    deg = getRotationDegrees($('.clock'));

    count = 0;
    count2 = 0;
    var lastScrollTop = 0;

    $(document).bind('scroll mousewheel touchscroll DOMMouseScroll', function(event){

      if (event.originalEvent.wheelDelta >= 0) {
          count--;
          count2++;
          if(count <= '-360'){
            count = 0;
            count2 = 0;
          }
      }
      else {
          count++;
          count2--;
          if(count >= '360'){
            count = 0;
            count2 = 0;
          }
      }

      deg = getRotationDegrees($('.clock'));

      $('.clock').css({'transform': 'rotate(' + (count*5) + 'deg)'})
      $('.name').css({'transform': 'rotate(' + (count2*15) + 'deg)'})
      $('.time.active').css({'transform': 'rotate(' + count2*5 + 'deg)', 'transition':'all 0s linear'})

      $('.time img').not('.active').each(function(){
        var length = Math.floor(Math.random() * data[0].length)
        var item = data[0][length];
        var item2 = data[1][length];
        var item3 = data[2][length];
        $(this).attr('src', item).attr('alt', item3).attr('data-src', item2);
      })

      clearTimeout($.data(this, 'scrollTimer'));

      $.data(this, 'scrollTimer', setTimeout(function() {
        $('.time img.active').each(function(){
          var length = Math.floor(Math.random() * data[0].length)
          var item = data[0][length];
          var item2 = data[1][length];
          var item3 = data[2][length];
          $(this).attr('src', item2).attr('alt', item3).attr('data-src', item2);
        })

        var desc = $('img.active').attr('alt');
        $('.description').html(desc);

      }, 100));

    })

    $('.time img').on('mouseenter', function(){
      var desc = $(this).attr('alt');
      $('.description').html(desc);
    })

    $('.time img').on('mouseleave', function(){
      $('.description').html(' ');
    })

    $('.time img').on('click', function(){

      if(!$(this).hasClass('active')){
        var datasrc = $(this).attr('data-src');
        var src = $(this).attr('src');

        $(this).attr('src', datasrc);

        $('img').not($(this)).removeClass('active').removeAttr('style');
        $('img').not($(this)).parent().removeClass('active').removeAttr('style');
        $(this).parent().addClass('active');
        $(this).addClass('active');
        if(count >= 0){
          $(this).parent().css({'transform':'rotate(-' + count*5 + 'deg)', 'z-index': '-1'});
        } else {
          $(this).parent().css({'transform':'rotate(' + count*-5 + 'deg)', 'z-index': '-1'});
        }
        $(this).addClass('active')
      } else {
        $('img').removeClass('active').removeAttr('style');
        $('img').parent().removeClass('active').removeAttr('style');
      }

    })

    $('#home').on('click', function(){
      location.reload();
    })

    $('#info').on('click', function(){
      if($(this).text() != 'Close'){
        $(this).text('Close');
        $('img').css({'transform':'rotateY(90deg)'});
        $('.infotext').addClass('active');
        $('.imprinttext').removeClass('active');
      } else {
        $(this).text('Info');
        $('img').removeAttr('style')
        $('.infotext, .imprinttext').removeClass('active');
        $('.imprinttext').removeClass('active');
      }

    })

    $('#imprint').on('click', function(){
        $('.active').removeClass('active').removeAttr('style');
        $('.imprinttext').addClass('active');
    })

});
