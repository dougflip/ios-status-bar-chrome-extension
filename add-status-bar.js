const bar = document.createElement('div');
bar.classList.add('ios-status-bar');
bar.style.backgroundColor = 'rgba(0, 0, 0, .5)';
bar.style.width = '100%';
bar.style.height = '20px';
bar.style.position = 'absolute';
bar.style.top = '0';
bar.style.zIndex = '100';
document.body.appendChild(bar);