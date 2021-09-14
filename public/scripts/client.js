/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


(function () { //iife to make the functions not accessible from outside/ isolate / Encapsulate
  $(function () { // newr version for $(document).ready ()=> {}

    

    $("#submit").submit(function (event) {
      event.preventDefault();
      const serializedTweet = $(this).serialize();
      const trimedText = event.target[0].value.trim();

      if (!trimedText || trimedText.length === 0) {

        $(".alert1").slideDown(() => {
          setTimeout(() => {
            $(".alert1").slideUp()
          }, 3000);
        })

      } else if (trimedText.length > 140) {
        $(".alert2").slideDown(() => {
          setTimeout(() => {
            $(".alert2").slideUp()
          }, 3000);
        })

      } else {

        $.ajax({
          method: "POST",
          url: "/tweets",
          data: serializedTweet,
        })
          .then(()=>{
            // to clear text box, reset the char counter back to 140
            $("#tweet-text").val("");
            $('.counter').val(140); 
            loadTweets();       
            
          })
          .catch((err) => console.log(err))
      }

    });

    loadTweets();
  });
})();

//Use an escape function to evaluate text that comes from untrusted sources to avoid crafting input text to run JavaScript on other user's page, etc
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// takes tweet db and match each and every necessry item based on HTML tmplate
const createTweetElement = (tweetObj) => {
  const { name, handle, avatars } = tweetObj.user// restructure data
  const text = tweetObj.content.text;
  const time = timeago.format(tweetObj.created_at);  //cdn link has been pased on index/script 

  const $item = `
    <section id="tweets-container">
    <div class="header">
      <div class="header1">
      <img src="${avatars}" alt="avatar">
      <div class="name"s>${name}</div>
      <div class="handle">${handle}</div>
      </div>
      <div class="tweet">${escape(text)}</div>
    </div>
    <div id="footer"class="footer">
      <div class="created_at">${time}</div>
      <div class="footer-icons">
      <i class="fas fa-heart"></i>
      <i class="fas fa-flag"></i>
      <i class="fas fa-reply-all"></i>
      </div>
    </div>
    </section>
  `
  return $item;
};

// tahke db as an argument and loop through each obj , creat a tweet template , and prepend/add tp the top of list 
const renderTweets = function (tweetData) {
  $('#tweets-container').empty(); //clear the container 
  for (const tweet of tweetData) {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement);// use prepend insted of append 
  }
}

// get all tweets from server and if ther is no error display them , otherwise display the error 
const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets",

  })
    .then((tweets) => renderTweets(tweets))
    .catch((err) => console.log(err))
}




