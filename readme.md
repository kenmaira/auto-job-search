# Automated Job Search Tool

## Overview
This tool automates the process of searching for job opportunities using Google's Custom Search API. It performs daily searches for specified job titles, saves the results to Google Sheets, and sends email notifications with the findings.

## Features
- Daily automated job searches for multiple job titles
- Results saved to Google Sheets (separate sheet for each search query)
- Automated email notifications with formatted results
- Results restricted to the last 24 hours

## Prerequisites
- Google Cloud Platform account
- Google Custom Search API enabled
- Google Apps Script environment
- Google Sheets access
- Valid API credentials (API Key and Custom Search Engine ID)

## Setup

### 1. Google Cloud Platform Setup
1. Create a project in Google Cloud Platform
2. Enable the Custom Search API
3. Create API credentials (API Key)
4. Set up a Custom Search Engine and note the Search Engine ID (cx)
   
   Add the following job board domains to your Custom Search Engine:
   ```
   *.metacareers.com/*
   *.eightfold.ai/*
   *.paylocity.com/*
   my.workdayjobs.com/*
   app.dover.io/*
   *.wellfound.com/*
   jobs.ashbyhq.com/*
   *.lever.co/*
   *.jobvite.com/*
   *.greenhouse.io/*
   ```
   
   These domains cover major job boards and company career pages. In your Custom Search Engine settings:
   - Add each domain as a separate site to search
   - Enable "Search only included sites"
   - Enable "Search the entire web but emphasize included sites" if you want broader results

### 2. Script Configuration
1. Replace the API key and Custom Search Engine ID in the `main()` function:
```javascript
var apiKey = "YOUR_API_KEY";
var cseId = "YOUR_CUSTOM_SEARCH_ENGINE_ID";
```

2. Update the email address in the `main()` function:
```javascript
sendEmail("YOUR_EMAIL@gmail.com", dataByQuery);
```

3. Customize search queries in the `main()` function as needed:
```javascript
var searchQueries = [
    '"Position Title 1" remote',
    '"Position Title 2" remote',
    '"Position Title 3" San Diego',
    '"Position Title 4 " Hybrid Los Angeles'
];
```

## How It Works

### 1. Search Process
- The script performs Google Custom searches for each specified job title
- Searches are restricted to the last 24 hours using `dateRestrict=d1`
- Results include job titles and links

### 2. Data Storage
- Creates separate sheets for each search query
- Stores the following information for each result:
  - Job Title
  - Link
  - Date
  - Search Query

### 3. Email Notifications
- Sends a formatted HTML email containing:
  - Results grouped by search query
  - Table format with Title, Link, and Date
  - "No jobs found" message for queries with no results

## Functions

- `googleSearch()`: Performs the Custom Search API call
- `updateSheet()`: Saves results to Google Sheets
- `formatEmailBody()`: Creates HTML formatted email content
- `sendEmail()`: Sends the email notification
- `main()`: Orchestrates the entire process

## Running the Script
1. Deploy the script in Google Apps Script
2. Set up a time-driven trigger to run the script daily
3. Monitor your email for daily job listings

## Security Notes
- Keep your API key and Custom Search Engine ID secure
- Do not share these credentials publicly
- Consider using Google Apps Script's Properties Service for storing sensitive data

## Limitations
- Google Custom Search API has daily quota limits
- Results are limited to Google's search index
- Email notifications are sent to a single address

## Contributing
Feel free to fork this project and customize it for your needs. Pull requests are welcome.

## License
This project is available under the MIT License.