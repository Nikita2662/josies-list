# josies-list
35L collaborative project Fall 2024

Development Setup
We'll use a really common Node.js project workflow!

First, let's clone our repository, and install all of our node dependencies:

git clone https://github.com/uclaacm/bias-by-us.git
cd bias-by-us
npm install
npm install react-scripts
To start our app, you just need to run npm start within the website folder!

cd website
npm start
And to build our project for production (with CRA's webpack bundling and all that goodness),

cd website
npm run build
Contribution Workflow
Want to make a change? Great! Here are the steps:

Make sure your main branch is updated with other peoples' changes.
git checkout main
git pull
Make a new branch of this repository. main is a protected branch, so you cannot push to it. a. For branch naming, follow this convention: <issue-number>_<change-you-made> (e.g. 43_animate_checkmark).
git checkout -b <your-branch-name>
Implement your code changes for your feature: Beep boop away! Before pushing, make sure that your app builds with 'npm run build', without any errors.
Update your local branch with changes from main branch.
git merge main
Once you're ready, stage and commit your changes.
git commit -am <your-message>
Move your local branch changes to remote repository.
git push --set-upstream origin <your-branch-name>
Make a pull request with your changes, and let someone on your project team know. a. Netlify has a neat feature called "Deploy Previews" that give you a link to preview your changes; see the blog post for more info!
If your code passes code review, then we can squash and merge it into main. Congratulations! If you'd like, it's now safe to delete your branch.
