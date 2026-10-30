

export const PROJECTS=[
 {n:"Free Domains",ic:"globe",tag:"A big list of free subdomains",d:["A curated list of free subdomain services for personal websites, portfolios, open-source projects and other online projects, so you can put a site online without buying a domain."],chips:["HTML","175 stars","27 forks"],l:[["Visit the site","https://freedomains.web.app/"],["GitHub","https://github.com/harys722/free-domains"]]},
 {n:"Profilie",ic:"spark",tag:"Free templates for profiles and websites",d:["Free pre-built templates for social profiles, portfolios and websites. Profilie is a static site generator: fill in a few details and get a simple one-page website. It lives in its own GitHub organization."],chips:["Static site generator","Templates","5 stars"],l:[["Visit the site","https://profilie.js.org/"],["GitHub","https://github.com/profilie/profilie"]]},
 {n:"Open API",ic:"ti-api",tag:"A free Open API service",d:["A free API with a variety of endpoints you can use in your own applications."],chips:["API","4 stars"],l:[["Visit the site","https://open-api.js.org/"],["GitHub","https://github.com/harys722/open-api"]]},
 {n:"URL Shortener",ic:"link",tag:"Short links that run from a 404 page",d:["A fast, reliable short link generator that runs from a 404 page. Create and manage as many short URLs as you like."],chips:["CSS","7 stars"],l:[["Visit the site", "https://hrs.foo.ng/"], ["GitHub","https://github.com/harys722/url-shortener"]]},
 {n:"GitHub Guides",ic:"b-github",tag:"Learn GitHub and GitHub Pages",d:["Step-by-step guides to GitHub Pages, domain verification, Bluesky handles and GitHub notifications on Discord."],chips:["Guides"],l:[["Read the guides","https://gh-guides.rweb.site/"],["GitHub","https://github.com/harys722/github-guides"]]},
 {n:"GitHub DevInsights",ic:"b-github",tag:"Your GitHub account, at a glance",d:["A dashboard for exploring your GitHub account statistics and insights through visualizations. Sign in with GitHub to view your account details."],chips:["GitHub API","Dashboard","GitHub sign-in"],l:[["Open DevInsights","https://github-devinsights.vercel.app/"],["GitHub","https://github.com/harys722/github-devinsights"]]}].map((project,index)=>({
  ...project,
  id:['free-domains','profilie','open-api','url-shortener','github-guides','github-devinsights'][index],
  kind:['Directory','Templates','Developer API','Web tool','Documentation','Analytics dashboard'][index],
  summary:[
    'Find free subdomains for personal sites, portfolios and open-source projects in one searchable directory.',
    'Simple templates for a personal profile or portfolio, with your links and details in one place.',
    'A collection of API endpoints with documentation to help you use them in your own applications.',
    'Host your own short links with a JSON configuration and a 404 page that handles redirects.',
    'Practical walkthroughs for GitHub Pages, domain verification, Bluesky handles and Discord notifications.',
    'Explore your GitHub account statistics and insights with visualizations. GitHub sign-in is required to view the dashboard.'
  ][index],
  image:'/images/projects/'+['free-domains','profilie','open-api','url-shortener','github-guides','github-devinsights'][index]+'.webp',
  imageAlt:project.n==='GitHub DevInsights'?'GitHub DevInsights dashboard showing a GitHub profile, account statistics and analytics sections':project.n+' website homepage',
  chips:project.chips.filter(chip=>!/^\d+ (stars|forks)$/.test(chip))
}));
