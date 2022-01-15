# Nasa Photo Explorer Challenge App

## Requirements

Using Create React App or your custom solution (React is a must), build an app that:

- Connects to the NASA API ( NASA Open APIs )
- Obtains photos from the 'Mars Rover' endpoint
- Allows the user to see the photos of each rover (Curiosity, Opportunity and Spirit)
- The photos list should be paginated showing a max of 25 photos per page (dynamic loading similar to facebook/instagram will be nice, but not required)
- Allows the user to filter the rover photos by camera
- By default it shows the latest photos for current day
- Allows the user to search for photos based on 'Earth Day' date (2020-09-22)
- Allows the user to search for photos based on the 'Sol' date (2890)

Optional:

- Let the user store search parameters as favorites or bookmarks that can be recalled in the future (Local storage is accepted, any serverless way of storing data is also accepted)
- A lot of extra points if you include a few tests.that
- We don't care about the UX design, but a nicely styled app would get extra points :D

  We will check for coding style and consistency mostly, we are interested on seeing how you think and organize a project.
  Please use a linter!

When you finish the test, push it as a public repository in github, gitlab, bitbucket or similar and send us the repository URL.

## Summary

Nasa Photo Explorer API is a challenge app that searches rover pictures data using the NASA Rover Api, it searches images with these filters:

- Rover name
- Rover camera
- Earth date
- Sol date (0-1000)

## Approach

It used NextJS and Typescript, also Chakra to make a fair UI.
As for react it has these features:

- Dynamic loading
- Server side rendering: getStaticProps()
- Reducers (useReducer hook)
- Preserve filter states in localstorage

## Challenges faced

- Spent so much time trying to configure a test suite due to the setup I used: Chakra and NextJS. For instance I decided to skip tests because of the random errors I got. For this problem a better approach would be to have used a simple react-create-app setup to make things more easy.
- The earth day filter didn't work in the Nasa API, no matter the value passed, it always returns the same images, result are affected only by the rest of the filters.

## Installation

- Clone repo

- Rename `.env.example` file to `env`.

- Get an API key from the NASA website and paste it in the contents of the `.env` file for the `NEXT_PUBLIC_API_BASE_API_KEY` variable.

- Install dependencies

```bash
npm install
```

## Getting started

- Start the project in port 3000

```bash
npm run dev
```
