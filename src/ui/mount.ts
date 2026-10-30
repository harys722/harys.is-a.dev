import sprite from './sprite.html?raw';
import wallpaper from './wallpaper.html?raw';
import desktop from './desktop.html?raw';
import taskbar from './taskbar.html?raw';

// Everything on the desktop is drawn from these files. Edit the .html files to change icons, taskbar or wallpaper.
document.getElementById('root')!.innerHTML = sprite + wallpaper + desktop + taskbar;
