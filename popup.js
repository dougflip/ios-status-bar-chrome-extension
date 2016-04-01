const getCurrentTabInfo = (callback) => {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    let queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        let tab = tabs[0];

        callback(tab);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
};

document.addEventListener('DOMContentLoaded', () => {
    const applyIOSStatusBarModeChange = (newMode) => {
        getCurrentTabInfo((tab) => {
            chrome.tabs.executeScript(tab.id, {
                code: 'chrome.extension.sendRequest({content: document.body.innerHTML}, (response) => { setIOSStatusBarModeAndReload("' + newMode + '"); });'
            }, () => {
                console.log('iOSStatusBarOverlay updated: ' + newMode);
            });
        });
    };

    let disabledModeBtn = document.getElementById("ios-status-bar-overlay-mode-disabled"),
        forceModeBtn = document.getElementById("ios-status-bar-overlay-mode-force"),
        detectPlatformIOSModeBtn = document.getElementById("ios-status-bar-overlay-mode-detect-platform-ios");

    if (disabledModeBtn) {
        disabledModeBtn.addEventListener("click", () => {
            applyIOSStatusBarModeChange('disabled');
        });
    }

    if (forceModeBtn) {
        forceModeBtn.addEventListener("click", () => {
            applyIOSStatusBarModeChange('force');
        });
    }

    if (detectPlatformIOSModeBtn) {
        detectPlatformIOSModeBtn.addEventListener("click", () => {
            applyIOSStatusBarModeChange('detect-platform-ios');
        });
    }
});
