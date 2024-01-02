```
# GIF Mailer Project

## Overview
This Node.js project automates the process of scraping GIFs from Giphy based on a search term and sends them via email using NodeMailer. It leverages Puppeteer for web scraping and dotenv for managing environment variables.

## Features
- Scrapes GIFs from Giphy.
- Randomly selects a GIF from the scraped list.
- Sends the selected GIF via email using NodeMailer.

## Prerequisites
- Node.js
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/jmedina21/node-mailer.git]
   ```
2. Navigate to the project directory:

3. Install dependencies:
   ```bash
   npm install
   ```

## Setting Up Environment Variables
Create a `.env` file in the project root and add the following variables:
- `SEARCH_TERM`: The term to search for GIFs on Giphy.
- `MY_EMAIL`: Your Zoho email address for sending emails.
- `MY_PASSWORD`: Your Zoho email password.
- `EMAIL_TO`: The recipient's email address.
- `MESSAGE_HEADING`: Email heading.
- `MESSAGE_BODY`: Email body content.

## Usage
Run the script to send a GIF email:
```bash
node index.js
```

## Contributing
Contributions are welcome. Please open an issue first to discuss what you would like to change.