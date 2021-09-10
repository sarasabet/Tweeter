$(function() {

  console.log('foo')
  $("textarea").on('input', function() {
    const newTweet = $(this).val();   
    const tweetLengt = newTweet.length
    const $counter = $('.counter');
    const charRemaining = $counter.val(140 - tweetLengt);

    $counter.css("color","black")
    if (charRemaining[0].innerText < 0){
      $counter.css( "color", "red" )     
    }  
  });
});

