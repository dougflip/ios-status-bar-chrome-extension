let currentIOSStatusBarMode = 'disabled';//'detect-platform-ios','force','disabled'
const addStatusBar = () => {
        console.log('iOSStatusBarOverlay', 'currentIOSStatusBarMode: ' + currentIOSStatusBarMode);
        const bar = document.createElement('div');
        bar.classList.add('ios-status-bar');
        bar.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        bar.style.width = '100%';
        bar.style.height = '20px';
        bar.style.position = 'absolute';
        bar.style.top = '0';
        bar.style.zIndex = '100';
        document.body.appendChild(bar);
        document.body.classList.remove('platform-browser');
        document.body.classList.add('platform-cordova');
    },
    resetStatusBar = () => {
        document.body.classList.remove('platform-cordova');
        document.body.classList.add('platform-browser');

        let statusBarElements = document.getElementsByClassName('ios-status-bar');
        if(statusBarElements.length > 0) {
            statusBarElements[0].parentNode.removeChild(statusBarElements[0]);
        }
    },
    isPlatformIOS = () => {
        return (document.body.classList && document.body.classList.contains('platform-ios'));
    },
    setIOSStatusBarMode = (newMode) => {
        console.log('iOSStatusBarOverlay setIOSStatusBarMode', 'currentIOSStatusBarMode: ' + newMode);
        currentIOSStatusBarMode = newMode;
        resetStatusBar(newMode);
        if ((currentIOSStatusBarMode === 'detect-platform-ios') && isPlatformIOS()) {
            addStatusBar();
        } else if (currentIOSStatusBarMode === 'force') {
            addStatusBar();
        }
    };

setIOSStatusBarMode('disabled');
