const axios = require('axios');

async function getMetaData(url) {
  // Preparieren der URL
  const preparedUrl = `https://hive.blog${url.split('#')[0]}.json`;

  try {
    // Aufrufen der authorUrl mit einem curl-Befehl
    const response = await axios.get(preparedUrl);

    // Extrahieren des ersten Treffers des Feldes "body"
    const jsonData = response.data;
    const body = jsonData.post.body;
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = body.match(regex);
    const firstImage = match ? match[0] : null;
    const authorReputation = jsonData.post.author_reputation;
    const authorFollowers = jsonData.post.author_followers;
    console.log('authorsFollowers = ', authorFollowers);
    console.log('respons.data = ', jsonData);

    // Rückgabe des Ergebnisses
    return [firstImage, authorReputation];
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getNumberOfFollowers(account) {
  console.log('getNumberOfFollowers.account = ', account);
  // Preparieren der URL
  const preparedUrl = `https://hive.blog/@`+account+`.json`;
  console.log('preparedUrl = ', preparedUrl);
  // try {
  //   // Aufrufen der authorUrl mit einem curl-Befehl
  //   const response = await axios.get(preparedUrl);

  //   // Extrahieren des ersten Treffers des Feldes "body"
  //   const jsonData = response.data;
  //   const body = jsonData.post.body;
  //   const regex = /!\[.*?\]\((.*?)\)/;
  //   const match = body.match(regex);
  //   const firstImage = match ? match[0] : null;
  //   const authorReputation = jsonData.post.author_reputation;
  //   const authorFollowers = jsonData.post.author_followers;
  //   console.log('authorsFollowers = ', authorFollowers);
  //   console.log('respons.data = ', jsonData);

  //   // Rückgabe des Ergebnisses
  //   return [firstImage, authorReputation];
  // } catch (error) {
  //   console.error(error);
  //   return null;
  // }
}



function main()
{
  getMetaData(url);

//getNumberOfFollowers

}

module.exports.getMetaData = getMetaData;
//module.exports.getNumberOfFollowers = getNumberOfFollowers;
