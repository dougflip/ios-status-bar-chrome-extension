const addIOSStatusBar = () => {
        const iosStatusBar = document.createElement('div');
        iosStatusBar.classList.add('ios-status-bar-overlay');
        iosStatusBar.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        iosStatusBar.style.width = '100%';
        iosStatusBar.style.height = '20px';
        iosStatusBar.style.position = 'absolute';
        iosStatusBar.style.top = '0';
        iosStatusBar.style.zIndex = '100';
        document.body.appendChild(iosStatusBar);
        document.body.classList.remove('platform-browser');
        document.body.classList.add('platform-cordova');
        console.log('iOSStatusBarOverlay Added for currentIOSStatusBarMode: ' + getIOSStatusBarMode());
    },
    bodyClassContains = (classStr) => {
        return (document.body.classList && document.body.classList.contains(classStr));
    },
    resetIOSStatusBar = () => {
        if(bodyClassContains('platform-cordova')) {
            document.body.classList.remove('platform-cordova');
            document.body.classList.add('platform-browser');
        }

        let iosStatusBarElements = document.getElementsByClassName('ios-status-bar-overlay');
        if(iosStatusBarElements.length > 0) {
            iosStatusBarElements[0].parentNode.removeChild(iosStatusBarElements[0]);
        }
    },
    isPlatformIOS = () => {
        return (bodyClassContains('platform-ios'));
    },
    getIOSStatusBarMode = () => {
        let currentIOSStatusBarMode = window.localStorage.getItem("currentIOSStatusBarMode") || 'disabled';//'detect-platform-ios','force','disabled'
        return currentIOSStatusBarMode;
    },
    setIOSStatusBarMode = (newIOSStatusBarMode) => {
        window.localStorage.setItem("currentIOSStatusBarMode", newIOSStatusBarMode || 'disabled');
    },
    setIOSStatusBarModeAndReload = (newIOSStatusBarMode) => {
        resetIOSStatusBar();
        setIOSStatusBarMode(newIOSStatusBarMode);
        if ((newIOSStatusBarMode === 'detect-platform-ios') && isPlatformIOS()) {
            addIOSStatusBar();
        } else if (newIOSStatusBarMode === 'force') {
            addIOSStatusBar();
        }
    };

setIOSStatusBarModeAndReload(getIOSStatusBarMode());
