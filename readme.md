# The Name Game
The Name Game is an app designed to help you learn the names of your colleagues, friends, or any set of people or muppets accessible via an api. The app features a game where you'll be given a name and five headshots to choose from. As the timer ticks down, incorrect answers fade. Don't take too long to choose though, as the number of seconds left on the timer gets added to your score. If you choose the wrong answer, you'll lose 5 points. Once you've played through 15 rounds, the game ends and you can submit your score to a global leaderboard. 

### Extra Directions
There were two additional asks for The Name Game, detailed below:
- CSS libraries and preprocessors were not permitted, so everything is designed with css-in-js.
- The app should accommodate accessibility features. As the game is inherently visual, I accommodated for two main groups:
  - Users who prefer not to use mouse input can navigate the entire app with their keyboards.
  - Users with impaired vision can benefit from different themings, including dark mode and high-contrast.

## In Action

[Live demo](https://name-game-b1ca0.firebaseapp.com)

# User Stories
This section describes the features implemented in the app from the viewpoint of the user. 

## Implemented:
- As a user, I should be able to see a colleagues name, and test if I can recognize their photo.
- As a user, I should be able to measure my progress with a score. 
- As a user, I should be able to see the top scores amongst my colleagues.
- As a user, I should be able to submit my initials with my score.
- As a user, I'd like hints as I struggle to identify the right colleague.


## Accessibility-Focused Features:
- As a user, I should be able to navigate the site with my keyboard.
- As a user, I should have the choice of navigating the site in dark mode or in a high-contrast setting.

# Stack
The following technologies were used to build this app.

<table>
  <tr>
  </tr>
  <tr>
    <td align="center">Front-end</td>
    <td align="center">Back-end</td>
    <td align="center">Deployment</td>
  </tr>
  <tr>
    <td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" title="React" width="80px"/></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/42357678?v=4" alt="Firebase Authentication" title="Firebase Authentication" width="60px"/></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/42357678?v=4" alt="Firebase Authentication" title="Firebase Authentication" width="60px"/></td>
  </tr>
  <tr>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/react-router.svg" alt="React Router" title="React Router" width="70px"/></td>
  </tr>
</table>

## Front-End
The Front-End is built in React, and pages are managed using React Router. Packages utilized include the following:
- react-keyboard-event-handler to simplify navigation
- Iconify for icons
- [Humaaaans](https://www.npmjs.com/package/humaaans-native) for the illustrations on the pages

#### Prototyping
The app was loosely [prototyped in Figma](https://www.figma.com/file/CA6A2NMK9LKAqnPxGt0fF2/NameGame?node-id=17%3A0), as there was some time-sensitivity, this was mostly to establish the design language. 

#### Mobile-First Design
This app is best experienced on mobile devices, but it also has a fully featured desktop experience.

#### CSS in JS over CSS, why? 
At first, CSS in JS seems like a bad idea. It pollutes the inspector tool and adds lines to component files. I would argue the contrary, as CSS in JS allowed for some distinct advantages while building this app:
- Dynamic properties - particularily for aceessibility, with the help of React's useContext hook, a global theming system was able to be set up just once at the top level. 
- Code reuse without preproccessors - without preprocessors, consolidating CSS becomes more difficult, CSS is JS allowed for crerating and re-using style objects.
- Granular animation control - I was able to set specific fades for different profiles as hints as I was able to tie opacity animations to props passed into each headshot. 
- Easier to edit - No more scrolling to find the the correct class or id, or duplicating the id. The style for a specific component is located in the component's file. 

Why not a hybrid approach? I did try this but it gets messy with overwrites and I felt as if I was writing more code than neccessary.

#### Accessibility Integration and Testing
The high contrast theme is close to meeting the highest specification according to the [WCAG 2.0 contrast formula](https://snook.ca/technical/colour_contrast/colour.html#fg=33FF33,bg=000000). Unfortunately I was unable to integrate font-resizing.

For keyboard navigation, the [react-keyboard-event-handler](https://www.npmjs.com/package/react-keyboard-event-handler) was a new package for me, and an absolute pleasure to use. 

## Back-End & Deployment
The Backend for this project started with a Node and Express server, as well as a database skeleton. After assessing the needs fo this project, I decided to go serverless with a Firebase deployment and a Firestore database. This allowed for a quicker deployment process, as well as an easily integrated globally-accessible database of user scores. 

# Work Flow
This project was managed using a simplified git workflow. After the first deployment, new features were created on new branches that were pulled in once completed. Additionally, I managed tickets using github projects. 

FIX
![]()

# Coming Soon
With a little more time, here's what I would have added/completed:

- Foldout menus for the navbar - so that users can go between pages or select a view mode instead of having to cycle through options. 
- As I was limited on time, I did not have the opportunity to look into integrating automated accessibility testing. 

# Known Bugs
- Some links and ids in the provided data are missing, this can cause blank photos to show up or in the case of missing ids, incorrect fading.
- At some resolutions, the timer will overlap with the last profile.Although I was able to solve this with a buffer profile previously, I chose to revert to find a more elegant solution. 

# Get started

Take the following steps to run the app in your localhost, you will need to have the following:
- NPM
- Firebase CLI (available as an [NPM package](https://www.npmjs.com/package/firebase-tools))
- You will need to create your own Firestore document database, [this](https://sebhastian.com/react-firestore) guide was the most helpful for me

From terminal in the project folder:
```
npm install
npm run compile
npm start
```

The app should now be live on localhost:6263 (N-A-M-E spelled on the phone).