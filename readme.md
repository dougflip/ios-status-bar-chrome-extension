iOS Status Bar Chrome Extension
==================================

Extremely basic overlay added to your page to emulate iOS status bar.

## Steps to Install

1. Clone this repo
1. Open Chrome and go to [chrome://extensions/](chrome://extensions/)
1. Check the "Developer Mode" checkbox in the top right
1. Click the "Load unpacked extension" button
1. Select the dir you cloned into from step 1
1. Load up a site running on localhost

## I hate this extensions, how do I turn it off?

Right now you need to go back to [chrome://extensions/](chrome://extensions/) and disable it.
If you **really** hate it you can also delete it from this screen.
In the future, I'd like to see if I can make an extension button toggle this on and off.

## What is the point of this?

We are hoping to use this when developing Ionic apps for iOS.
It is a pain right now when we make some sort of custom header to build and test on the device.
We are thinking this gives us a quick and easy way to see if styling is accounting for the 20px status bar.
