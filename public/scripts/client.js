/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.

// const { response } = require("express");

// creat an HTML template 

(function() {
$(document).ready(() => {

  $("#submit").submit(function (event) {
    event.preventDefault();
    const serializedTweet = $(this).serialize();
    console.log(event.target[0].value)
    const trimedText = event.target[0].value.trim()
    
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
      .then(loadTweets()
      )
      .catch((err) => console.log(err))
  }
  });

  const loadTweets =() => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      
    })
      .then((tweets) => renderTweets(tweets))
      .catch((err) => console.log(err))
  }
  loadTweets()

});
})();

//Use an escape function to evaluate text that comes from untrusted sources to avoid crafting input text to run JavaScript on other user's page, etc
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// takes tweet db and match each and every necessry item based on HTML tmplate
const createTweetElement = (tweetData) => {
  const { user, handle, avatars } = tweetData.user// restructure data
  const text = tweetData.content.text;
  const time = timeago.format(tweetData.created_at);  //cdn link has been pased on index/script 

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
  for (const tweet of tweetData) {
    const tweetElement = createTweetElement(tweet)
    $('#tweets-container').prepend(tweetElement);// use prepend insted of append 
  }
}





