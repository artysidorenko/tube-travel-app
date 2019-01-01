# **Tube Travel Companion Web App**

**author:** [@PJSmooth](https://github.com/artysidorenko)

A JavaScript web application that lets the user find train departure information for local tube stations.

---

## **Background**

This node.js project was written as part of shadowing the [Founders and Coders](https://github.com/foundersandcoders) web developer Bootcamp's [online curriculum](https://github.com/foundersandcoders/master-reference/tree/master/coursebook).

#### Project Specification

- Language used: HTML, CSS and JavaScript.
- External APIs used:
  - [TFL Unified API](https://api.tfl.gov.uk/) accessed using back-end server request (not client-side)
- Does not make use of external JS libraries such as CSS Bootstrap, JQuery, etc...
- Development testing done using Tape node.js testing framework, with server router testing using supertest.

---

## **Features**

- Server can be launched via the script shortcut `npm start` or by running `node ./src/server.js`
- Select "Find local stations" to search for nearby stops, or type desired stop in search field box.
- Individual Tube stations can be selected from the options presented.
