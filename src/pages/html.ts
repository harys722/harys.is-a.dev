import about from './html/about.html?raw';
import servers from './html/servers.html?raw';
import tools from './html/tools.html?raw';
import contact from './html/contact.html?raw';

// Windows whose content is plain HTML. The other windows are built from src/data/*.ts.
export const PAGE_HTML: Record<string, string> = { about, servers, tools, contact };
