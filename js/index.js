const autoCompleteLeft = document.querySelector(".autocomplete-left");
const summaryLeft = document.querySelector(".summary-left");
const autoCompleteRight = document.querySelector(".autocomplete-right");
const summaryRight = document.querySelector(".summary-right");

const searchLeft = new MovieSearch(
    autoCompleteLeft, 
    summaryLeft, 
    styleSummaries.bind(null, summaryLeft, summaryRight)
);

const searchRight = new MovieSearch(
    autoCompleteRight, 
    summaryRight, 
    styleSummaries.bind(null, summaryLeft, summaryRight)
);

renderAutoComplete(searchLeft);
renderAutoComplete(searchRight);