const formatIOSStatusBarTime = (date) => {
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    },
    getIOSStatusBarHTML = () => {
        return '<span class="ios-status-bar-overlay-left">' +
                '<i class="circle circle-filled"></i>' +
                '<i class="circle circle-filled"></i>' +
                '<i class="circle"></i>' +
                '<i class="circle"></i>' +
                '<i class="circle"></i>' +
            '</span>' +
            '<span class="ios-status-bar-overlay-center">'+formatIOSStatusBarTime(new Date())+'</span>' +
            '<span class="ios-status-bar-overlay-right">' +
                '<i class="icon ion-bluetooth"></i>' +
                '<i class="icon ion-battery-half"></i>' +
            '</span>';
    },
    addIOSStatusBar = () => {
        const iosStatusBar = document.createElement('div');
        iosStatusBar.classList.add('ios-status-bar-overlay');
        iosStatusBar.innerHTML = getIOSStatusBarHTML();
        document.body.appendChild(iosStatusBar);
        document.body.classList.remove('platform-browser');
        document.body.classList.add('platform-cordova');
        console.log('iOSStatusBarOverlay Added for currentIOSStatusBarMode: ' + getIOSStatusBarMode());
    },
    bodyClassContains = (classStr) => {
        return (document.body.classList && document.body.classList.contains(classStr));
    },
    resetIOSStatusBar = () => {
        if (bodyClassContains('platform-cordova')) {
            document.body.classList.remove('platform-cordova');
            document.body.classList.add('platform-browser');
        }

        let iosStatusBarElements = document.getElementsByClassName('ios-status-bar-overlay');
        if (iosStatusBarElements.length > 0) {
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
