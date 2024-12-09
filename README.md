# advertising
This tool searches for predefined advertising-text in the blockchain Hive and creates reports about the findings.

It has three main scripts, createCampaign.js, createAdvertisingReport.js and payTheAuthors.js, and uses a config.json file to generate both, an advertising campaign and a report of the success and pays the advertisers.

# The Config Json File
For each campaing we need to set up the config file. Here is an example with explanation:

```
{
  "startDate": "2024-01-10",
  "campaignID": "240110_01",
  "budget": 20,
  "reward": "2.000",
  "recipient": "@advertisingbot2",
  "advertisingText": "Follow @advertisingbot2, an account that gives you mini-jobs and campaigns",
  "optionalText": "@advertisingbot2 is an account, that was made for creating automated post. It creates reports for some token statistics, but also adverising campaigns. It checks the results and the work of the members and pays them their reward. It is an account from @achimmertens. ",
  "sponsor": "@achimmertens",
  "numberOfDays": 8,
  "lastWeekCampaign": "Last week I managed to work good on the automation of my advertising process. At the moment I still have some manual work, but it gets less. I have build in some new features, like a list of the members of the last campaigns, which help me to stay in contact for new offers. So, stay tuned, I have not finished yet, the work goes on ;-)",
  "lastWeekReport": "",
  "lastCampaigns": "* https://peakd.com/advertising/@advertisingbot2/winners-of-the-hive-marketing-campaign-23120401 \n\r* https://peakd.com/hive-154303/@advertisingbot2/winners-of-marketing-campaing-23111001\n\r* https://peakd.com/hive-154303/@advertisingbot2/winners-of-the-advertising-contest-from-last-week\n\r* https://peakd.com/hive-154303/@advertisingbot2/winners-of-the-hive-marketing-campaign-23121801-week-51-for-beer-community",
  "tags": "marketing campaign contest challenge hive advertising",
  "authors": [],
}
```



-  "startDate"  
   -  Must be filled. It contains the startdate of the campaign.
-  "campaignID"
   -  This will be filled automatecally.
-  "budget"
   -  Must be filled. The amount of money, the sponsor is willing to give.
-  "reward"
   -  Must be filled. The amount of money, each advertiser will get paid.
-  "recipient"
   -  Must be filled. This is for whom the advertaising campaing is made. It appears in the title.
-  "advertisingText"
   -  Must be filled. This is the actual advertising text and the search text for the report. 
-  "optionalText"
   -  Must be filled. It contains some additional text about the product or the recipient.
-  "sponsor"
   -  Must be filled. This is the person, that gives the money.
-  "numberOfDays"
   -  Must be filled. This is the period of the number of days the campaing is running. After that the money has to be paid out and the report has to be made .
-  "campaignUrl"
   -  This will be filled automatically.
-  "lastWeekCampaign"
   -  Must be filled. It contains some text about the status or the things I have done last week before I start the campaign (to make this report more vivid and interesting).
-  "lastWeekReport"
   -  Must be filled. It contains some text about the status or the things I have done last week before I start the report (to make this report more vivid and interesting).
-  "lastCampaigns"
   -  Must be filled. It contains some example of the last successfull campaigns (URLs of the advertising reports).
-  "tags"
   -  optional. Max three words in lowercase divided by spaces.
-  "currentWeek"
   -  This will be filled automatically
-  "authors"
   -  Must be filled with at least "[]". The rest will be filled automatically during the report creation.


# Create A New Campaign
First you need to fill out the JSON file. After that you run:
> node createCampaign.js <name_of_campaignConfig.json>

With this a campaign markdown file is generated.

Here is an example:

```
Hive Marketing Campaign 231218_01 (Week 51, For "Beer Community")

Hello everyone who wants to earn some small money,

here I announce the next advertising contest for week 51 from sponsor @achimmertens, period: 2023-12-18 to 2023-12-26.

![Earn Money(2).png](https://files.peakd.com/file/peakd-hive/achimmertens/AKAr2pK3Nw7DhpREEcx2yQ1dSe3BQ4KKDFLKAWjNL9Ni952afaaKuqX68gTapsB.png)

---
...
```

Now you can upload this content to peakd.com (or another Hive frontend) and hope that some people join the contest.

Here is an example: https://peakd.com/hive-154303/@advertisingbot2/hive-marketing-campaign-23121801-week-51-for-beer-community

# After The End Of The Campaign
When the campaign has ended (maybe earlier, but you have to repeat it at the end), you need to pay out the advertisers and to create a report for the community and the sponsor, who wants to see, how many attendees took part.
For this you run:
> node createAdvertisingReport.js <name_of_campaignConfig.json>

You get a report markdown text with a table of participants. Here is an example:

```
Winners Of The Hive Marketing Campaign 231218_01

Hello Hivers, Advertisers, Influencers, Contesters and all the rest,

this is the
# Hive Marketing Campaign Report from 2023-12-18 to 2023-12-26, Nr. 231218_01.
![HIVE Marketing.png](https://files.peakd.com/file/peakd-hive/achimmertens/AKqchzabeuVfZ4Dio3CipS4qSJMBALn2bcSRbCxWziyEqTSacinMkaF6h3jk4as.png)
*[origin](https://photofunia.com/)*

# Here are the participants of the last week:
Campaign URL: https://peakd.com/hive-154303/@advertisingbot2/hive-marketing-campaign-23121801-week-51-for-beer-community
Advertising text: "Subscribe to the beer community https://peakd.com/c/hive-187719/created"
|Date|Amount Hive|Participant|Reputation|Number of Followers|Url|Image|
|-|-|-|-|-|-|-|
|2023-12-16T10:04|2|@detlev|921436.43|5725|/hive-187719/@detlev/beersaturday-337|![](https://i.imgur.com/d7bSzo0.jpg)|
...
```

Send to each of them the promised money ("reward" in the JSON file) and make a screenshot of it.

For this, the campaignConfig.JSON file has got the authors from the report during running the createAdvertisingReport.js script. It contains now (example):
``` 
 "authors": [
    {
      "author": "advertisingbot"
    },
    {
      "author": "detlev"
    }
  ]
```

Now you can pay them out with 
> node payTheAuthors.js <name_of_campaignConfig.json>

Go to https://peakd.com/@advertisingbot2/wallet, take a screenshot, upload this screenshot to peakd.com and copy the URL.
Exchange this URL with the part [IMAGE_SEND_MONEY]:

```
Proof, that the money has already been sent:

[IMAGE_SEND_MONEY]
*Screenshot of the [@advertingsbot2](https://peakd.com/@advertisingbot2/wallet) wallet from today*
```







Now you can upload this MD-File to Hive.



# Campaing Creation Summary

1. prepare the config file (copy it from campaignConfig_scratch.json and fill it until "lastWeekReport")
2. node createCampaign.js <name_of_campaignConfig.json> => A file CampaignYYMMDD.md is created. Check the content.
3. post CampaignYYMMDD_xx.md to hive with the @advertisingbot2 account via "node postCampaignToHive.js <name_of_campaignConfig.json>
4. Reblog this post with the @advertisingbot2 account
5. check, if @advertisingbot2 has enough money.
6. wait until the campaign has finished
7. Write in some text about the status of the last week into <name_of_campaignConfig.json>
8. node createAdvertisingReport.js <name_of_campaignConfig.json> -> check the results in FilleReportTemplate_xxxxx.md
9. node payTheAuthors.js <name_of_campaignConfig.json>
10. node getTransaction.js <name_of_campaignConfig.json>

11. node fillAdvertisingReportWithPaidAuthors.js <name_of_campaignConfig.json>

12. Now you can upload this MD-File to Hive.
13. Update the campaignConfig_scratch.json file with the URL from the latest report (Put it in the front of lastCampaings and remove the last entry).



// Backlog:
- Write a script that uploads the FilledReportTemplate_xxxx.md to Hive Marketing and myblog.
- https://peakd.com/hive-149312/@hive.helps/deen-hivehelps-june-update-making-the-world-better-with-hbd-savings#@hive.helps/re-achimmertens-sflohs






Done in March 2024:
- bug: @rubyjosleidy27 was not found in the report. -> Sie hat ein Komma dazwischengesetzt.
- bug: If in the report an "@" appears in the link to the campaign, it doesnt work. -> Seems to be solved
- bug: ecency writers are not found in the report. -> Maybe solved.

- 
Done in January 2024:
- Bug: Tabelle zeigt zu wenig Personen an (ich vermute das Datum stimmt nicht)
- Feature: Personen, denen Geld bezahlt wurde, erhalten einen Flag in der Config JSON Datei und erscheinen dort nur einmal.
- Feature: Im Titel vom Advertisingreprot Beispiel: (Week 51, For "Beer Community") einfügen
- Bug: fixes proof that the money has been send zeigt zu wenig Einträge an.
- Bug: Ecency-Einträge kürzen das https raus und werden dann nicht mehr gefunden. Beispiel: "Subscribe to the beer community created/hive-187719"
- Chore: Einige Groß und Kleinschreibungen sind noch im AdvertisingReport drin.
- Feat: Add a list of old members to the new campaign to ask to join again. Create a new variable in the config file for this list.
- - Feat: Create a scratch config file with all necessary variables filled in.

Done in December 2023:
- created README.md
// Campaign:
- Integration of Startdate 
- Put Calenderweek and Recipient into the title
- put recipient, ... into json file
- Proper preparation of campaing-json file including Start-Date, Campaign ID and campaign_url
- Make campaign-json file as parameter available for createCampaign.js
- take the correct advertising text into the filled campaign template
- Put tags also into the json file
- Change the URL of the campaign automatecally in the json file

// Report:
- Repairs: Campaign URL is wrong at the moment.
- Repairs: The URL in the table has to be made usefull.
- The Dateframe has to be taken from the json file, not from the date, when the report is created.
- Optionaler Text in json-Config einfügen und auswerten.
- Der Report soll auch angeben wie viel Geld vom Budget übrig geblieben ist

// PayTheAuthors
* Übername von Hive Reward und Campagne-ID für den Memo-Text aus der Config Datei.
* JSON erstellen von der Auszahlung durch Advertisingbot2

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

