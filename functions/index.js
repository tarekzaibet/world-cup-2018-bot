'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.WorldCupFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`PRIVIET ! Welcome to Russia 2018 World Cup`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function games(agent) {
     agent.add(`Football World Cup`);
     agent.add(new Card({
         title: `Russia is waiting for you`,
         imageUrl: 'https://upload.wikimedia.org/wikipedia/fr/f/f7/FIFA_World_Cup_2018_Logo.png',
         text: `The competition starts on 14 June 2018 💁`,
       })
     );
     agent.add(new Suggestion(`Quick Reply`));
     agent.add(new Suggestion(`Suggestion`));
   }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Games', games);
  agent.handleRequest(intentMap);
});
