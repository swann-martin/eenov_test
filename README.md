### Get started !

- Installe nodejs
- Lance `node main.js numéro_loyalty_card_id numero_user_id`
- Exemple : `node main.js 1 5`

### The challenge

On a des donnée d'utilisateurs avec leurs cartes de fidélités associé :

Les utilisateurs peuvent posséder des cartes de fidélité.
Les utilisateurs peuvent gagner des récompenses (points) pour une carte donnée.

Les données sont à disposition (voir `input.json`) et un programme

```javascript
{
    "user": {
        "id": 5,
        "total_points": 78,
        "loyalty_cards": [
            { "id": 1, "points": 12, "name": "Carrefour" },
            { "id": 3, "points": 66, "name": "MacDo" }
        ]
    },
    "loyalty_card": { "id": 1, "name": "Carrefour", "total_points": 56 }
}

```

L'objectif est de proposer du code qui reproduit la sortie de la commande, mais qui fonctionne en réalité avec les données `input.json`.

### Que faire ?

- Réaliser un code propre et structuré (avec nodejs).
- Utilise les lib/package que tu veux.
- Tu peux créer plusieurs fichiers et dossiers si tu veux.
- You can (and we would love if you do) write test (but it is ok if you are not confident with it).
- Tu peux réaliser des tests unitaires si tu pense pouvoir en réaliser sur ton code.
- Ecrit dans ce README les commandes à réaliser pour exécuter ton programme.
