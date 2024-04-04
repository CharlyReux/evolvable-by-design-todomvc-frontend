# TODOMVC Frontends

Here I propose to highlight the differences between using [React](https://github.com/facebook/react) with the imperative and functional paradigms. As [React](https://github.com/facebook/react) is a vue library, this difference is visible only in the vue layer.

Within the imperative paradigm, classes are used. On the ohter hand, within the functional paradigm, the React hooks are used.

So, in the [src](/src) directory you can find three folders:

- [functional](/src/react-functional) that contains the implementation of the view with React hooks and functional components
- [imperative](/src/react-imperative) that uses the implementation of the view with React classes
- [commons](/src/commons) that contains all the code that is common to both version, which includes controllers and models



## Setup
```
npm install
npm run dev
```