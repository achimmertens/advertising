# advertising
Searches for predefined advertising-text in the blockchain Hive and creates reports about the findings

# Run the script
1. Check Dateframe in getDateFrame.js
2. Check if you want to load from sql or from file in main method from createAdvertisingReport.js
3. node createAdvertisingReport.js


// Backlog

- Einen Json Textfile erstellen, der alle Parameter beinhaltet. Dieser wird verwendet sowohl für fie jeweilige Kampagne als auch den Report.
- Der Report soll auch angeben wie viel Geld vom Budget übrig geblieben ist
- Campaing Datum erstellen und im Report einsetzen

Done November 2023:
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
- Be aware of case sensitivity. The text has to be exactly like this; otherwise, your post will not be found
- You will be rewarded only once, even if you write more posts

### Optional Additional Content:
Maybe it is a good idea to round your post up with some content of the advertising product. It shows your interst and maybe the sponsor "has a special eye on you" :-). 

Here is an example, that you should write in your own words:


### Whats about it:
Achim Mertens wants to establish a decentral advertising process, where 
- Sponsor give their text and a budget
- An automated process creates 
  - the campaigns 
  - the reports
  - distributes the money

At the moment, this process is in a testing stage and half manual, half automated.