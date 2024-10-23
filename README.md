# josies-list
35L collaborative project Fall 2024

## Development Setup

We'll use a really common Node.js project workflow!

First, let's clone our repository, and install all of our node dependencies:

```
git clone https://github.com/Nikita2662/josies-list.git
cd bias-by-us
npm install
npm install react-scripts
```

To start our app, you just need to run `npm start` within the website folder!

```
cd website
npm start
```

And to build our project for production (with CRA's webpack bundling and all that goodness),

```
cd website
npm run build
```

## Contribution Workflow

Want to make a change? Great! Here are the steps:

1. Make sure your main branch is updated with other peoples' changes.
   ```
   git checkout main
   git pull
   ```
2. Make a new branch of this repository. `main` is a protected branch, **so you cannot push to it**.
   a. For branch naming, follow this convention: `<issue-number>_<change-you-made>` (e.g. `43_animate_checkmark`).
   ```
   git checkout -b <your-branch-name>
   ```
3. Implement your code changes for your feature: Beep boop away! Before pushing, make sure that your app builds with 'npm run build', without any errors.
4. Update your local branch with changes from main branch.
   ```
   git merge main
   ```
5. Once you're ready, stage and commit your changes.
   ```
   git commit -am <your-message>
   ```
6. Move your local branch changes to remote repository.
   ```
   git push --set-upstream origin <your-branch-name>
   ```
7. Make a pull request with your changes, and let someone on your project team know.
