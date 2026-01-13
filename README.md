
# 📝 Trend Arbitrage Dashboard

## 📌 Project Description & Purpose
This project was designed to help users find the "next big thing" by looking at what people are currently talking about online. It gathers data from the web and highlights topics that are gaining popularity quickly.

## 🛠️ Tech Stack
**Frontend**
* **Languages:** HTML, CSS, JS, React

* **Framework:** React (JS)

* **Deployment:** LocalHost 5173 (Dev Environment)

**Server/API**

* **Languages:** JavaScript/Node
* **Framework:** Express
* **Deployment:** LocalHost 3000 (Dev Environment)


**Database**
* **Languages:** MQL/JSON style model
* **Deployment:** MongoDB (Local)

  
## 🔹 Setup Instructions:
*Follow these steps to set and up see project in VS Code from my GH*

### 1. Download the Project
Open the terminal on your computer and run the following commands:

```bash
# Clone the repo from GH
git clone [https://github.com/DHood27-a11y/trend-arbitrage-challenge.git]

#Enter the project folder
cd [trend-arbitrage-challenge]

#Open in VS Code (assuming you have it installed)
code .
```


## 🗄️ Packages needed to run properly:
* Latest version of Vite

* React

* Express

* Node.js

* Axios

## How to run project in Frontend (Dashboard)
**I would suggest splitting the terminal in 3 so you can access server, git, and client at the same time**

*Open terminal and type the following commands*

```bash
cd client
npm run dev

```


## How to run project in Backend (MongoDB)
*Open terminal and type the following commands*

``` bash
cd server
node --watch index.js
```


## **🔌 Environment Variables**
**PORT:** 3000

**MONGO_URL:** your_mongodb_connection_string_here

**API KEYS:** None used given it uses built-in scrapers


## 🧠 **Trend-Detection Logic(Rising Score):**
*I decided my algorithim would look for speed as well as size, so it calculates the following:*

* Total engagement(likes + comments).
* It then divides that total by how much time has passed since the post was created.
* **The Result:** A post with 50 likes that is only 5 minutes old is ranked higher than a post with 500 likes that is two days old.
* **The Goal:** To populate "early: trends before they become over-saturated.

## **📰 Data Sources Used:**
I chose these sources to track a trend as it moves from "niche" to "mainstream":

1.) Hacker News: Replaced original plans for Tildes/Lobste.rs to capture early tech trends.

2.) Reddit: Provided community validation and lots of social interactions on posts.

3.) Google News: Replaced blocked sources to show what the general pop is currently searching via Google.

## **🤔 Assumptions & Trade-offs:**
* **API Availability:** I built this on the assumption that getting APIs from most websites would be straightforward and wouldnt require large amounts or any amounts of data scraping.
* **Source-Pivoting:** I originally wanted to use Tildes and Lobste.rs, but had to completely forego them due to their strict blocking of data usage. I pivoted to Hacker News and Google instead.
* **Design vs. Logic:** Due to time constraints, I chose to prioritize the backend logic and processing. I skipped getting deep into the CSS/visual styling and accessibility of the app to ensure the core pieces of data/logic were as close to working as possible.

  
## **✨ Features I plan to add:**
* **Search functionality:** A search bar to filter trends by specific keywords.
* **UI/UX Overhaul:** Adding more color depth and full accessibility support for all users.
* **Expansion of sources:** Integrate at least 5 more data sources (Twitter, Tiktok, Pintrest, etc.)
* **Advanced Scoring system:** Make the math smarter by checking if people are saying good or bad things about a topic, and then tracking how fast a trend jumps from one site to the next.
