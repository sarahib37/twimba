import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click", function(e){
    if (e.target.dataset.like){
        clickedLikeButton(e.target.dataset.like)
    }

    if (e.target.dataset.tweet){
        clickedRetweetButton(e.target.dataset.tweet)
    }

    if (e.target.dataset.comment){
        clickedCommentButton(e.target.dataset.comment)
    }

    if (e.target.id === "tweet-button"){
        clickedTweetButton()
    }

    if (e.target.dataset.newcomment){
        clickedNewCommentButton(e.target.dataset.newcomment)
    }
})

function clickedLikeButton(post){
    tweetsData.forEach(function(tweet){
        if(post == tweet.uuid){
            if(!tweet.isLiked){
                tweet.likes++
            }
            else{
                tweet.likes--
            }
            tweet.isLiked = !tweet.isLiked
        }
    })
    render()
}

function clickedRetweetButton(post){
    tweetsData.forEach(function(tweet){
        if(post == tweet.uuid){
            if(!tweet.isRetweeted){
                tweet.retweets++
            }else{
                tweet.retweets--
            }
            tweet.isRetweeted = !tweet.isRetweeted
        }
    })
    render()
}



function clickedCommentButton(post){
    document.getElementById(`tweet-${post}`).classList.toggle("hidden")
    
}

function clickedTweetButton(){
    const postText = document.getElementById('post-text')
    tweetsData.unshift({
        handle: '@user038asd',
        profilePic: 'images/scrimbalogo.png',
        likes: 0,
        retweets: 0,
        tweetText: postText.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
    render()
    postText.value = ""
}

function clickedNewCommentButton(post){
    const newComment = document.getElementById(`new-${post}`)

    tweetsData.forEach(function(tweet){
        if(post==tweet.uuid){
            tweet.replies.unshift({
                handle: '@user038asd',
                profilePic: 'images/scrimbalogo.png',
                tweetText: newComment.value
            })
        }
    })

    render()
    newComment.value = ''
}



// Get the html to be rendered

function getTwitterInfo(){
    let postHtml = ''
    

    tweetsData.forEach(function(tweet){

        let liked = ''
        if(tweet.isLiked){
            liked = 'isLiked'
        }

        let retweeted = ''
        if(tweet.isRetweeted){
            retweeted = 'isRetweeted'
        }

        let commentHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                commentHtml += `
        <div class="posted-tweets-comments" id="comments">
            <img class="profile-pic" src="${reply.profilePic}"> 
            <div class="comments-text">
                <div>
                    <p class="comments-handle">${reply.handle}</p>
                    <p class="comments-textbody">${reply.tweetText}</p>
                </div>                    
            </div>
        </div> 
            
        `
            })
            

        }

        
        

    postHtml += `
    <div class="posted-tweets-container">
        <div class="posted-tweets-main">
            <img class="profile-pic" src="${tweet.profilePic}">
            
            <div class="posted-tweets-text">
                <p class="posted-tweets-handle"> ${tweet.handle}</p>
                <p class="posted-tweets-textbody">${tweet.tweetText}</p>
            </div>
        </div>
       
        <div class="posted-tweets-icons">
            <span class="posted-tweet-icon">
                <i class="fa-regular fa-comment-dots" data-comment = ${tweet.uuid}></i>${tweet.replies.length}
            </span >
            <span class="posted-tweet-icon">
                <i class="fa-solid fa-heart grey ${liked}" data-like = ${tweet.uuid}></i>${tweet.likes}
            </span>
            <span class="posted-tweet-icon">
                <i class="fa-solid fa-retweet grey ${retweeted}" data-tweet = ${tweet.uuid}></i>${tweet.retweets}
            </span>
            <span class="posted-tweet-icon">
                <i class="fa-solid fa-trash grey" data-deleted = ${tweet.uuid}></i>
            </span>
        </div>    
        <input type="text" id= "new-${tweet.uuid}" placeholder = "Add a comment...">
        <i class="fa-regular fa-paper-plane grey" data-newcomment = ${tweet.uuid}></i>
        <div class="hidden" id="tweet-${tweet.uuid}">
            ${commentHtml}
        </div>
            
    </div> 
    `   
    
    

    
    
    })

    
    
    return postHtml
}


// renders the code
 
function render(){
    
    document.getElementById('main-section').innerHTML = getTwitterInfo()
}

render()