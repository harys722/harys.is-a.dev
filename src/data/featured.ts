

export const FEATURED=[
 {n:"Darzi Pro",ic:"f-scissors",tag:"A modern operating system for tailoring houses",url:"https://darzi-pro.com/",role:"My brother's project. I contributed to it.",cta:"Visit Darzi Pro",
  d:["Darzi Pro replaces the notebooks and paper slips of a tailoring shop with one calm system, built for darzis, boutiques and ateliers across South Asia, from Karachi to Lahore to Islamabad. It keeps every customer's measurements, tracks each order from cutting to delivery, records advances and balances, and sends WhatsApp reminders in Urdu or English on the shop's behalf.","It also assigns work to karigars, tags each bundle of fabric to its order, brings repeat customers back around Eid and wedding season, and prints or sends professional invoices. It works on slow connections and on the cheapest Android phones."],
  facts:[["14 days","free trial, no card"],["Urdu + English","reminders and fields"],["Phone first","works on cheap Android"]],
  chips:["Measurement profiles","WhatsApp reminders","Order tracking","Payments","Karigar assignment","Fabric tagging","Invoices"]},
 {n:"Muhasaba",ic:"f-ledger",tag:"A private habit tracker for your deen and your day",url:"https://muhasaba.darzi-pro.com/",role:"My brother's project.",cta:"Open Muhasaba",
  d:["Muhasaba is a private habit tracker for your deen and your day: the five prayers, Quran, dhikr, character, and the habits you are working to leave behind. Log daily, reflect, and watch your consistency grow.","Track Fajr through Isha with Jama'ah, on time, late, qada or missed, plus daily prayer times with both Asr times. A clean dashboard, streaks, a heatmap, and charts by week, month, year or custom range, emailed if you like. Build what is good and reduce what is not, from Quran and charity to guarding the gaze and screen time."],
  facts:[["Five prayers","Fajr through Isha"],["Streaks + heatmap","watch consistency grow"],["Charts","week, month, year or custom"]],
  chips:["Prayer tracking","Quran","Dhikr","Character","Habits to leave behind","Streaks","Heatmap","Email reports"]},
 {n:"Paper Days",ic:"f-paper",tag:"The back-of-the-notebook games you grew up with, now digital",url:"https://ibnesalah.itch.io/paper-days",role:"My brother's project. I contributed to it.",cta:"Get it on itch.io",
  d:["Paper Days brings the games you played on the last page of a school notebook to the screen: same rules, same trash talk, no paper. The free Windows demo has Dots & Boxes, Hangman and Word Rush, a take on Name, Place, Thing where a letter drops and you race to fill in every category before time runs out.","Friends on the same network can play together, 2 to 10 players over LAN, with in-game chat and quick emoji reactions. There are several themes, including a cosy snow theme, plus difficulty and player modes, and your own nickname and avatar. Online play and more classic games are on the way."],
  facts:[["3 games","in the free demo"],["2 to 10","players over LAN"],["Free","name your own price"]],
  chips:["Windows","Dots & Boxes","Hangman","Word Rush","LAN multiplayer","Chat + reactions","Snow theme"]}].map((project,index)=>({
  ...project,
  id:['darzi-pro','muhasaba','paper-days'][index],
  kind:['Business software','Habit tracker','Multiplayer game'][index],
  image:'/images/projects/'+['darzi-pro','muhasaba','paper-days'][index]+'.webp',
  imageAlt:index===2?'Paper Days game page showing its menu and multiplayer screens':project.n+' website homepage',
  summary:[
    'A workspace for tailoring shops to manage customer measurements, orders, payments and WhatsApp reminders in one place.',
    'A private space to track prayers and daily habits, reflect on your day and follow your consistency over time.',
    'Classic notebook games for Windows, with Dots & Boxes, Hangman and Word Rush, plus multiplayer for friends on the same network.'
  ][index]
}));
