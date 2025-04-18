function googleSearch(searchTerm, apiKey, cseId) {
  var url = "https://www.googleapis.com/customsearch/v1?q=" + encodeURIComponent(searchTerm) + "&cx=" + cseId + "&key=" + apiKey + "&dateRestrict=d1";
  var response = UrlFetchApp.fetch(url);
  var results = JSON.parse(response.getContentText());
  return results.items || [];
}

function updateSheet(sheetName, data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
    sheet.appendRow(['Title', 'Link', 'Date', 'Search Query']);
  }
  var rows = data.map(function(item) {
    return [item.Title, item.Link, item.Date, item['Search Query']];
  });
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
}

function formatEmailBody(dataByQuery) {
  var body = "Here are the latest search results:<br><br>";
  for (var query in dataByQuery) {
    body += "<b>" + query + ":</b><br>";
    if (dataByQuery[query].length > 0) {
      body += "<table border='1'><tr><th>Title</th><th>Link</th><th>Date</th></tr>";
      dataByQuery[query].forEach(function(item) {
        body += "<tr>";
        body += "<td>" + item.Title + "</td>";
        body += "<td><a href='" + item.Link + "'>Link</a></td>";
        body += "<td>" + item.Date + "</td>";
        body += "</tr>";
      });
      body += "</table><br>";
    } else {
      body += "No jobs found for this title today.<br><br>";
    }
  }
  return body;
}

function sendEmail(emailAddress, dataByQuery) {
  var subject = "New Google Search Results";
  var body = formatEmailBody(dataByQuery);
  MailApp.sendEmail({
    to: emailAddress,
    subject: subject,
    htmlBody: body
  });
}

function main() {
  var apiKey = "Your_API_Key";
  var cseId = "your_cse_id";
  var searchQueries = [
    '"product operations" remote',
    '"Director of Program Management" remote',
    '"Director of Product operations" remote',
    '"Program Manager" remote'
  ];
  
  var allResults = [];
  var dataByQuery = {};
  searchQueries.forEach(function(query) {
    var results = googleSearch(query, apiKey, cseId);
    if (results.length > 0) {
      var newData = results.map(function(result) {
        return {
          Title: result.title,
          Link: result.link,
          Date: new Date().toLocaleDateString(),
          'Search Query': query
        };
      });
      dataByQuery[query] = newData;
      allResults = allResults.concat(newData);
      updateSheet(query, newData); // Update specific sheet for each query
      newData.forEach(function(result) {
        Logger.log(result.Title + " " + result.Link);
      });
    } else {
      Logger.log("No results found for " + query + ".");
      dataByQuery[query] = []; // Ensure there is an entry for the query
    }
  });

  sendEmail("InsertYourEmail@gmail.com", dataByQuery); // Replace with your email address
}
