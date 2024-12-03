# josies-list
35L collaborative project Fall 2024

## Description
Josies List is a localized marketplace for UCLA students to buy and sell items in 
different categories such as clothing, textbooks, and dorm/apartment items.

## Key Features
1. Users can create profiles that enable them to sign up, login, add biographies,
and sell and buy products. All users will be required to provide a valid UCLA
email address for authentication.
2. Users can search for items/products using tags, item names, descriptions, etc.
3. Users can create listings for products they wish to sell. A listing
includes a picture of the item, a description of it, and its price.
4. Users can comment on posts of items.
5. Users can make bidding offers on items they wish to buy. Sellers will be 
notified of the offers, and can accept or reject an offer.

## Tech Stack
Frontend: React, JavaScript, CSS, HTML
Backend: Node.js, Express.js, mongoose, cors
Database: MongoDB
Additional Tools:

## Installation and Setup

<!-- Prerequisites:
Ensure you have the following installed:

- Node.js
- npm
- MongoDB -->

## Steps to Set Up Locally
1. Clone the repository:

```
git clone https://github.com/Nikita2662/josies-list.git
cd josies-list
```
2. Install dependencies for the backend:

```
cd back-end
npm install
```

3. Navigate to the frontend directory and install dependencies:

```
cd front-end 
npm install
```

4. Set up environment variables:

- Create a .env file in the root directory and add the following:
```
DATABASE_URI= <your-mongo-db-uri>
```

5. Start the backend and frontend servers:

Backend:

```
cd back-end
npm start
```
Frontend:

```
cd front-end
npm start
```

6. Visit the app in your browser at http://localhost:3000.

## Usage

How to Use:
- Sign up or log in using a valid UCLA email address.
- Personalize your profile by adding a profile picture, and a biography.
- Create product listings by adding an image, description, and price for a product you wish to sell.
- Browse available items using the search bar.
- Comment on listings to engage with sellers.
- Make offers/bids on items you want to buy and wait for seller responses.

Screenshots:

<!-- - Homepage:
- Product Listings:
- Search Results: -->

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

<!-- ## Development Setup

We'll use a really common Node.js project workflow!

First, let's clone our repository, and install all of our node dependencies:

```
git clone https://github.com/Nikita2662/josies-list.git
cd josies-list
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
7. Make a pull request with your changes, and let someone on your project team know. -->
