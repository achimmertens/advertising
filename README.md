# advertising
Searches for predefined advertising-text in the blockchain Hive and creates reports about the findings

# Run the script
1. Check Dateframe in getDateFrame.js
2. Check if you want to load from sql or from file in main method from createAdvertisingReport.js
3. node createAdvertisingReport.js [campaignConfig_xxxx.json]


// Backlog:

// Campaign:
- Integration of Startdate 
- Put Calenderweek and Recipient into the title
- put recipient into json file
- Proper preparation of campaing-json file including Start-Date, Campaign ID and campaign_url
- Make campaign-json file as parameter available for createCampaign.js
- take the correct advertising text into the filled campaign template
- Change the URL of the campaign automatecally in the json file


// Report:
- Bilder werden nicht richtig dargestellt.
- Campaign URL is wrong at the moment.
- The URL in the table has to be made usefull.
- The Dateframe has to be taken from the json file, not from the date, when the report is created.
- Optionaler Text in json-Config einfügen und auswerten.
- Der Report soll auch angeben wie viel Geld vom Budget übrig geblieben ist
- 

Done November 2023:
- Doppelte Links ausblenden.
- Der ÜbergabeParameter für den Suchtext fehlt
- Name von FilledReportTemplate ändern
- DateFrame in die JSON Config packen
- Unempfidlich machen gegen Groß und Kleinschreibung
- Einen Json Textfile erstellen, der alle Parameter beinhaltet. Dieser wird verwendet sowohl für fie jeweilige Kampagne als auch den Report.
- Campaign Template automatisch ausfüllen mit
  - Hive/advertiser
  - max advertiser
  - advertising text
  - Dateframe
- CampaingTemplate erstellt
- Report Template erstellt
- Zeilenanzahl in der Reporttabelle anpassen an die tatsächliche Anzahl der Treffer bis zu einem definierten Maximum
- Anzahl der Follower des Authors und Authorreputation als Spalte integrieren
- Kommentare herausfiltern (&& !item.url.includes('#@') als Returnwert vom Blacklistfilter)

--------

Template Text:

### Task And Rules:
Do the following:
- Write an arbitrary post (not comment). It can contain everything, that you usually write
- Add somewhere in your post exactly the text below 
- You will be rewarded only once, even if you write more posts
- Please answer to this post, so that others can see how many participants did the job

### Optional Additional Content:
Maybe it is a good idea to round your post up with some content of the advertising product. It shows your interst and maybe the sponsor "has a special eye on you" :-). 

Here is an example, that you may write in your own words:


### Whats about it:
Achim Mertens wants to establish a decentral advertising process, where 
- Sponsor give their text and a budget
- An automated process creates 
  - the campaigns 
  - the reports
  - distributes the money

At the moment, this process is in a testing stage and half manual, half automated.

# Phrase for sending Hive:
Thank you for working on the advertise campaign Nr. 231204_01