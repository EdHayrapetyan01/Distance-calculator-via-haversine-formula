<h1 align="center">
  Distance Calculator
  <br>
  <img src="https://cdn3.iconfinder.com/data/icons/map-navigation-8/512/pin-distance-route-1024.png" alt="travel-buddy" title="travel-buddy" width="300">
  <br>
</h1>


<hr />



## Project Title

Travel Buddy Distance Calculator

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [About](#About)
- [Technologies](#Technologies)
- [Setup](#setup)
- [Status](#status)


## About the App

The app should consist of two pages: the search form (home page) and the search results.
A home page with a search form that requires input for City of origin, Intermediate cities (which can be added/removed), City of destination, Date of the trip, and Number of passengers. The City of origin and City of destination are searchable dropdowns with a list of cities that are requested and searched asynchronously with a loading indication. The Date of the trip should be in the future and the Number of passengers should be a number greater than 0.

## Technologies

React, Typescript, react router dom, styled components, material ui, ESLint, prettier

## Approach

Here i used client side rendering, and for the routing system I used react-router-dom, opted to use Day.js for handling dates, as Moment.js has become outdated, in the app I used the kebab-case naming style for classnames, and calculates distances between cities using their coordinates and the Haversine formula.


**🚨 Setup 🚨**

- `1`: download or clone the repository.
- `2`: navigate the cloned repo.
- `3`: install the application with npm i.
- `4`: run the Application with npm run dev.

**🚨 Running test 🚨**

```
npm run test
```