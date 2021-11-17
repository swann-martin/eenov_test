// recupération des données du fichier json
const data = require('./input.json');
// recupération des arguments passés en ligne de commande
const args = process.argv;
const loyaltyCardId = parseInt(args[2]);
const userId = parseInt(args[3]);

/**
 * Gets the users info from data.rewards filtered by id of the user
 * @param  {Number} id The id number of the user whose info we want
 * @return {Array}         The data.rewards filtered with only infos about the user
 * @return {String}        An error message in console
 */
const getUserInfoById = (id) => {
  if (data.rewards.find((entry) => entry.user_id === id)) {
    return data.rewards.filter((line) => line.user_id === id);
  }
};

/**
 * Gets the total of points for all cards of the selected user
 * @param {Array} userInfoArray Array containing the user's informations
 * @property {Number} total indicates the total of points for all cards of a selected user
 * @returns {Number} total of points for all the cards of a user
 */
const getTotalPointsAllCards = (userInfoArray) => {
  let total = 0;
  userInfoArray &&
    userInfoArray.forEach((user) => {
      total += user.points;
    });

  return total;
};

/**
 * Searches the points for doubles of cards whith a same id and returns the sum
 * @param {Array} arrayToSearch Array containing the loyalty card's informations
 * @param {id} id Array containing the loyalty card's informations
 * @return {Number} total indicates the total of points for the card with this id
 */
const getPointsPerCardById = (arrayToSearch, id) => {
  let total = 0;
  if (arrayToSearch) {
    let array = arrayToSearch.filter((card) => card.loyalty_card_id === id);
    array.forEach((value) => (total += value.points));
  }
  return total;
};

// récupère les cartes que possède l'utilisateur
/**
 * Searches for the cards the user has and returns an array of objects sum
 * @param {Array} arrayToSearch Array containing the loyalty card's informations
 * @return {Number} total indicates the total of points for the card with this id
 */
const getUsersLoyaltyCards = (arrayToSearch) => {
  let loyalty_cardsArray = [];
  let arrayOfCards = [];
  //creates an array of loyalty cards
  arrayToSearch.map((card) => {
    arrayOfCards.push(card.loyalty_card_id);
  });
  //creates from the arrayOfCards a unique array without doubles of loyalty cards id
  let unique = [...new Set(arrayOfCards)];
  // for each loyalty card with a unique id we create an object with containing the card's id, total of points and name
  unique.forEach((key) => {
    let nameObject = data.loyalty_cards.find((value) => value.id === key);
    let object = {
      id: key,
      points: getPointsPerCardById(arrayToSearch, key),
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
  let userSearched = getUserInfoById(id);
  if (userSearched && userSearched.length !== 0) {
    const user = {
      id: userSearched[0].user_id,
      total_points: getTotalPointsAllCards(userSearched),
      loyalty_cards: getUsersLoyaltyCards(userSearched),
    };
    console.log('user:', user);
    return user;
  } else {
    console.log(
      "Cet utilisateur n'existe pas. Essayez d'entrer un autre numéro. Le format attendu est un chiffre. Par exemple : 5",
    );
  }
};

/**
 * Gets the information of a specific card by its id and return its info + the total of points for this card
 * @param  {Number} cardId The id of the loyalty card we look for
 * @return {Array}
 */
const getCardsInfoById = (cardId) => {
  let totalPoints = 0;
  let cardSelected = [];
  //creates an array of loyalty_cards with all the cards which have the id we look
  const arrayOfCardsById = data.rewards.filter(
    (line) => line.loyalty_card_id === cardId,
  );
  //creates an array of loyalty_cards with all the cards which have the id we look
  if (arrayOfCardsById && arrayOfCardsById.length !== 0) {
    arrayOfCardsById.forEach((element) => (totalPoints += element.points));
    data.loyalty_cards.map((card) => {
      if (card.id === cardId) {
        cardSelected = { ...card, total_points: totalPoints };
      }
    });
    console.log('loyalty_card: ', cardSelected);
    return cardSelected;
  } else {
    return console.log(
      `Ce numéro de carte n'existe pas. Veuillez entrer un chiffre entre 1 et ${data.loyalty_cards.length}. Par exemple 2`,
    );
  }
};

/**
 * Provide the info about a User and a Loyalty card, searched by id
 * @param {Number} inputCardId The id of the Loyalty Card searched, it is the argument given when the programme is launched.
 * @param {Number} inputUserId The id of the User searched, it is the argument given when the programme is launched.
 * @returns {Object} the User info (id (number), total_points(number), loyalty_cards(array of objects)) correponding to the id was inputed and the Loyalty Card details (id, name, total_points).
 */
const getResult = (inputCardId, inputUserId) => {
  {
    getUser(inputUserId);
    getCardsInfoById(inputCardId);
  }
};

getResult(loyaltyCardId, userId);
