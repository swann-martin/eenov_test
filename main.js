// Gets data from json file
const data = require('./input.json');
// Gets the arguments enterred by the user
const args = process.argv;
const loyaltyCardId = parseInt(args[2]);
const userId = parseInt(args[3]);

/**
 * Gets the users info from data.rewards filtered by id of the user
 * @param  {Number} id The id number of the user whose info we want
 * @param {Array}   dataUsers The data.rewards filtered with only infos about the user
 * @return {String}        An error message in console
 */
const getUserInfoById = (id, dataUsers) => {
  if (dataUsers.find((entry) => entry.user_id === id)) {
    let dataUser = dataUsers.filter((line) => line.user_id === id);
    return dataUser;
  }
};

/**
 * Gets the total of points for all cards of the selected user
 * @param {Array} dataUser Array containing the user's informations
 * @property {Number} total indicates the total of points for all cards of a selected user
 * @returns {Number} total of points for all the cards of a user
 */
const getTotalPointsAllCards = (dataUser) => {
  let total = 0;
  dataUser &&
    dataUser.forEach((user) => {
      total += user.points;
    });
  if (!isNaN(total)) return total;
  return console.log('getTotaltPointsAllCards error : total is not a number');
};

/**
 * Searches the points for doubles of cards whith a same id and returns the sum
 * @param {Array} dataUser Array containing the user's loyalty card's informations
 * @param {Number} id id of the card we want to search
 * @return {Number} total indicates the total of points for the card with this id
 */
const getPointsPerCardById = (id, dataUser) => {
  let total = 0;
  if (dataUser) {
    let array = dataUser.filter((card) => card.loyalty_card_id === id);
    array.forEach((value) => (total += value.points));
  }
  return total;
};

/**
 * Searches for the cards the user has and returns an array of objects with the user's cards data
 * @param {Array} dataUser containing the searched user loyalty card's informations
 * @param {Array} dataCards containing all loyalty cards informations
 * @return {Array} loyalty_cardsArray
 */
const getUsersLoyaltyCards = (dataUser, dataCards) => {
  let loyalty_cardsArray = [];
  let arrayOfCards = [];
  //creates an array of loyalty cards
  dataUser.map((card) => {
    arrayOfCards.push(card.loyalty_card_id);
  });
  //creates from the arrayOfCards a unique array without doubles of loyalty cards id
  let unique = [...new Set(arrayOfCards)];
  // for each loyalty card with a unique id we create an object with containing the card's id, total of points and name
  unique.forEach((key) => {
    let nameObject = dataCards.find((value) => value.id === key);
    let object = {
      id: key,
      points: getPointsPerCardById(key, dataUser),
      name: nameObject.name,
    };
    loyalty_cardsArray.push(object);
  });
  return loyalty_cardsArray;
};

/**
 * Get a specific user's info by an id and returns its info in an object containing the user's id, total_points, loyalty_cards with details
 * @param {Number} id the id of the user we look for
 * @property {Array} userSearched the user's informations
 * @property {Number} total indicates the total of points for all cards of one user
 * @returns {Object} Users information
 */
const getUser = (id) => {
  let userSearched = getUserInfoById(id, data.rewards);
  if (userSearched && userSearched.length !== 0) {
    const user = {
      id: userSearched[0].user_id,
      total_points: getTotalPointsAllCards(userSearched),
      loyalty_cards: getUsersLoyaltyCards(userSearched, data.loyalty_cards),
    };
    console.log('user:', user);
    return user;
  } else {
    console.log(
      "Cet utilisateur n'existe pas. Essayez d'entrer un autre numéro. Par exemple : 5",
    );
  }
};

/**
 * Gets the information of a specific card by its id and return its info + the total of points for this card
 * @param  {Number} cardId The id of the loyalty card we look for
 * @param  {Array} dataUsers The array containing the users data to search in
 * @param  {Array} dataCards The array containing the cards data to search in
 * @return {Array}
 */
const getCardsInfoById = (cardId, dataUsers, dataCards) => {
  let totalPoints = 0;
  let cardSelected = [];
  //creates an array of loyalty_cards with all the cards which have the id we look
  const arrayOfCardsById = dataUsers.filter(
    (line) => line.loyalty_card_id === cardId,
  );
  //creates an array of loyalty_cards with all the cards which have the id we look
  if (arrayOfCardsById && arrayOfCardsById.length !== 0) {
    arrayOfCardsById.forEach((element) => (totalPoints += element.points));
    dataCards.map((card) => {
      if (card.id === cardId) {
        cardSelected = { ...card, total_points: totalPoints };
      }
    });
    console.log('loyalty_card: ', cardSelected);
    return cardSelected;
  } else {
    return console.log(
      `Ce numéro de carte n'existe pas. Veuillez entrer un chiffre entre 1 et ${dataCards.length}. Par exemple 2.`,
    );
  }
};

/**
 * Provides the info about a User and a Loyalty card, searched by id
 * @param {Number} inputCardId The id of the Loyalty Card searched, it is the argument given when the programme is launched.
 * @param {Number} inputUserId The id of the User searched, it is the argument given when the programme is launched.
 * @returns {Object} the User info (id (number), total_points(number), loyalty_cards(array of objects)) correponding to the id was inputed and the Loyalty Card details (id, name, total_points).
 */
const getResult = (inputCardId, inputUserId) => {
  {
    if (!isNaN(inputUserId)) {
      getUser(inputUserId);
    } else {
      console.log(
        "L'id entré pour l'utilisateur est incorrect. Le format attendu pour l'id est un chiffre. Ressayez avec un nombre. Par exemple 5.",
      );
    }

    if (!isNaN(inputCardId)) {
      getCardsInfoById(inputCardId, data.rewards, data.loyalty_cards);
    } else {
      console.log(
        `L'id entré pour la carte de fidélité est incorrect. Le format attendu est est un chiffre. Veuillez entrer un chiffre entre 1 et ${data.loyalty_cards.length}. Par exemple 2.`,
      );
    }
  }
};

getResult(loyaltyCardId, userId);
