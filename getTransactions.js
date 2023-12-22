// Importieren Sie die dhive-Bibliothek
const dhive = require('@hiveio/dhive');

// Erstellen Sie einen neuen Client
let client = new dhive.Client('https://api.hive.blog');

// Definieren Sie den Benutzernamen
let username = 'advertisingbot2';

// Definieren Sie das aktuelle Datum und das Datum vor 7 Tagen
let currentDate = new Date();
let sevenDaysAgo = new Date();
sevenDaysAgo.setDate(currentDate.getDate() - 7);

// Rufen Sie die Account-Historie ab
client.call('condenser_api', 'get_account_history', [username, -1, 1000])
    .then(result => {
        // Filtern Sie die Transaktionen der letzten 7 Tage
        let transactionsLastSevenDays = result.filter(transaction => {
            let transactionDate = new Date(transaction[1].timestamp + 'Z');
            return transactionDate >= sevenDaysAgo && transaction[1].op[0] === 'transfer';
        });

        // Drucken Sie die Transaktionen der letzten 7 Tage
        //console.log('Transaktionen der letzten 7 Tage: ', transactionsLastSevenDays);
        transactionsLastSevenDays.forEach(transaction => {
            // console.log('Transaction: ', transaction);
            // console.log('Inhalt des "op" -Arrays: ', transaction[1].op);
            console.log('Transaction: ', JSON.stringify(transaction, null, 2));
        });
    })
    .catch(err => {
        console.error('Es gab einen Fehler beim Abrufen der Account-Historie: ', err);
    });

