//FIXME: Need a way to set currentStatusBarMode
const currentStatusBarMode = 'detect-platform-ios',
    addStatusBar = () => {
        console.log('iOS Status Bar Overlay', 'currentStatusBarMode: ' + currentStatusBarMode);
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
    };

if ((currentStatusBarMode === 'detect-platform-ios') && (document.body.classList && document.body.classList.contains('platform-ios'))) {
    addStatusBar();
} else if (currentStatusBarMode === 'force') {
    addStatusBar();
}
