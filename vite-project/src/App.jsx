import { useState } from 'react'

import './App.css'
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const app = require('./server.js');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.api = onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

function App() {

  return (
    <div className="App">
     
    </div>
  )
}

export default App
