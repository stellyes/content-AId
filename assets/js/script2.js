const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";
const newsAPIkey = "pub_310941d0b0fa18d49abbe048e6b4f4d748fbe"
const historyContainer = document.getElementById('history-list');
const searchBox = document.getElementById('search-bar');

var searchHistoryList = [];
var searchHistoryAi = [];


function getNews(query) {
         apiCall = `https://newsdata.io/api/1/news?apikey=pub_310941d0b0fa18d49abbe048e6b4f4d748fbe&q=${query}&size=2`;
    fetch(apiCall)
      .then(function (response) {
        console.log(response);
        return response.json();
      }) 
      .then(function (data) {
        console.log(data);
        if (data.status == "success") {
            console.log(data)
        //   Get array of articles from data
          let articles = data.results;
          // Iterate over articles and append to webpage
          for (let i = 0; i < articles.length; i++) {
            fillSearchResults(articles[i]);
          }
        } else {
          console.log(">> API Call to newsapi.org failed");
        }
      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
      });
  }
  
  // Generates content for webpage
  function fillSearchResults(result) {
    let searchResultsElement = document.getElementById('search-results');
    let listItem = document.createElement('li')
    let link = document.createElement('a');
        link.href = result.link;
        link.textContent = result.title;
        listItem.appendChild(link);
        searchResultsElement.appendChild(listItem); 
        }
  getNews("moon");

function handleSearch() {
  if (searchBox.value) {
    addHistory(searchHistoryList, "link-history");
    renderHistory(searchHistoryList);
  }
}

//Adds a new searched item to the search history
function addHistory(historyArray, storage) {
  var searchedContent = searchBox.value;

  if (historyArray.length >= 10) {
    historyArray.splice(historyArray.length - 1, 1);
  }
  historyArray.unshift(searchedContent);
  updateHistory(historyArray, storage);
}

//Updates storage from history array
function updateHistory(historyArray, storage) {
  var storageItem;
  for (var i = 0; i < historyArray.length; i++) {
    storageItem = storage + ' ' + i;
    if (historyArray[i] != null) {
      localStorage.setItem(storageItem, historyArray[i]);
    }
  }
}

//Updates history array from storage
function recallHistory(historyArray, storage) {
  var storageItem;
  for (var i = 0; i < 10; i++) {
    storageItem = storage + ' ' + i;
    historyArray[i] = localStorage.getItem(storageItem);
  }
}

//Renders the history list on the page
function renderHistory(historyArray) {
  var historyEntry;
  
  //Appneds the new search to the list
  if (historyContainer.children.length > 1) {
    historyEntry  = document.createElement("li");
    historyEntry.innerHTML = historyArray[0].toString();
    historyContainer.appendChild(historyEntry);
    historyContainer.insertBefore(historyEntry, historyContainer.children[1]);

  //Initial page rendering
  } else {
    for (var i = 0; i < historyArray.length; i++) {
      historyEntry  = document.createElement("li");
      historyEntry.innerHTML = historyArray[i].toString();
      historyContainer.appendChild(historyEntry);
    }
  }
}

recallHistory(searchHistoryList, "link-history");
recallHistory(searchHistoryAi, "ai-history");
renderHistory(searchHistoryList);
    