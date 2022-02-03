MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// mutes unmuted player 
function mute_video(){
    let a = document.getElementsByClassName('ytp-mute-button ytp-button');
    if (status_mute == false){
        a[0].click();
        status_mute = true;}
};

// unmutes muted player 
function unmute_video(){
    let a = document.getElementsByClassName('ytp-mute-button ytp-button');
    if (status_mute){a[0].click()};
    status_mute = false;
};

// skips an ad if possible 
function skip_ad(){
    // gets button from ad player 
    let b = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
    try {
        b[0].click();
        console.log('YT-Ad-Skipper - ad skipped');
    }
    catch(error) {};
}

// checks if an ad is currently running and returns true if so 
function check_ad(){
    let change = document.getElementsByClassName('ytp-ad-player-overlay-skip-or-preview')[0]
    // console.log(typeof(change))
    if (typeof(change) === 'undefined') {
        return false
    }
    else {
        return true 
    }
}

// checks if ad is still running and unmutes video if not 
function unmute_after_ad(){
    // console.log('unmute_after_ad')
    if (check_ad() === false){
        unmute_video()
    }
    else{
        // console.log('else')
    }
}

// event listener for when mute button is clicked -> sets value for mute button 
function check_volume_status(){
    document.getElementsByClassName('ytp-mute-button ytp-button')[0].addEventListener("click", function() {  
        if(status_mute == true){
            status_mute = false 
        }
        else{
            status_mute = true
        };
 })};

// adds an observer when possible after loading the DOM 
 function addObserver(adobserver) {
    // checks if ad box is loaded to the dom (composeBox)
    var composeBox = document.getElementsByClassName('ytp-ad-player-overlay-skip-or-preview')[0]

    if (composeBox){
        var config = { subtree: true, characterData: true, childList: true };
        try{adobserver.observe(composeBox,config)}
        catch(error){};
    }
    else{
        //The node we need does not exist yet.
        //Wait 1000ms and try again
        window.setTimeout(addObserver, 500);
        return;
    }
}



function main(){
    
// observer object that observes the ad player and mutes the ad 
 var adobserver = new MutationObserver(function(mutations){
    try{
        console.log('YT-Ad-Skipper - ad running')
        if (status_mute == false){
            mute_video();
        };
        }
    catch(error){
        console.log()
    };
 })

// observer object that executes code upon change of DOM title 
var observer = new MutationObserver(function(mutations) {
        // fired when a mutation occurs
        console.log('YT-Ad-Skipper - Extension running')
    
        check_volume_status()
        
        setInterval(addObserver(adobserver), 500)

        setInterval(unmute_after_ad, 1000)

        setInterval(skip_ad, 1000)  

}).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
);

observer

};

let status_mute = false ;

window.onload = main()
