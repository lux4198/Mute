MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// mutes unmuted player 
function mute_video(){
    let a = document.getElementsByClassName('ytp-mute-button ytp-button');
    if (status_mute == false){
        a[0].click();
        status_mute = true;}
    // console.log(status_mute);
};

// unmutes muted player 
function unmute_video(){
    let a = document.getElementsByClassName('ytp-mute-button ytp-button');
    if (status_mute){a[0].click()};
    status_mute = false;
    // console.log(status_mute)
};

// skips an ad if possible 
function skip_ad(){
    // let b = document.getElementsByClassName('ytp-ad-player-overlay')[0]
    let b = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
    try {
        b[0].click();
        console.log('Ad skipped');
    }
    catch(error) {};
}

// checks if an ad is currently running and returns true if so 
function check_ad(){
    let change = document.getElementsByClassName('ytp-ad-player-overlay')[0]
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
    var composeBox = document.getElementsByClassName('ytp-ad-player-overlay')[0];
    if(!composeBox) {
        //The node we need does not exist yet.
        //Wait 1000ms and try again
        window.setTimeout(addObserver,1000);
        return;
    }
    var config = { subtree: true, characterData: true, childList: true };
    adobserver.observe(composeBox,config);
}

// observer object that observes the ad player and mutes the ad 
 var adobserver = new MutationObserver(function(mutations){
    try{
        // console.log('a')
        
        console.log('ad running')
        if (status_mute == false){
            mute_video();
        };
        }
    catch(error){
        // document.getElementsByClassName('ytp-mute-button ytp-button')[0].onclick = mute_video()
        // change_volume_status()
        console.log()
    };
 })

// observer object that executes code upon change of DOM title 
var observer = new MutationObserver(function(mutations) {
    //     // fired when a mutation occurs
        check_volume_status()
        
        try{setInterval(addObserver(adobserver), 1000)}
        catch(error){};

        setInterval(unmute_after_ad, 1000)

        setInterval(skip_ad, 1000)  

}).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
);


let status_mute = false ;

// observer starts after a few second from load (player sometimes loads later)
window.onload = setTimeout(observer, 2000)
