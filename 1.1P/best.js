/**
* Filename: enhancements.js
* Author: Duncan Elliot
* Targets: all html files
* Purpose: Further enhances pages
* Credits: W3Schools
* Date written: 12-04-2021
*/

"use strict";

var navOpen = false; //default to not open

// list of pages for html extraction for search functionality (excluding the search page itself, and payment, since the user must go through enquiry to get there first)
var pages = [
    "about.html",
    "enhancements.html",
    "enhancements2.html",
    "enquire.html",
    "index.html",
    "product.html"
];

// either open or close full page menu depending on current state
function toggleNav() {
    navOpen = !navOpen; // toggle variable controlling the display of the full page menu: true --> false, false --> true
    var menu = document.getElementById("full-menu");
    
    if(navOpen) {
        menu.style.display = "block";
    }
    else {
        menu.style.display = "none";
    }
}

// validates the users search input and searches html from all pages on site
function validateSearch() {
    // get the input the user typed
    var searchInput = document.getElementById("search_bar").value;
    if (searchInput.trim(" ") == "") { // check the user entered anything other than spaces/nothing
        window.alert("You haven't inputted anything!");
        return false;
    }
    else {
        sessionStorage.setItem("search_term", searchInput); //not allowed php yet, for now storing it in localStorage will suffice
        return true;
    }
}


// asyncronously get the html from a url and check if it contains the user's search input, if so add a link to the page in search.html
function searchPage(url, input) {
    $.get(url, function(result) { // callback result if successful
       
        var pageText = $(result).text().trim(" ").trim("\n");  // filter only visible text on page, trim blank and line charaters

        // filter out main navigation
        if (url == "enhancements2.html") {
            pageText = pageText.split("Website")[1];
        }
        else {
            pageText = pageText.split("JavaScript enhancements")[1];
        }
        
        //filter out footer
        pageText = pageText.split("©")[0];

        var index = pageText.toLowerCase().indexOf(input.toLowerCase()); // find the first instance of the user's search input on the page
        
        // if the input is on the page make a matched string and display it on the page, with a link to the page
        if (index != -1) {
            // check upper and lower bounds of index in case the range of the matched area will be greater than the length or less than 0
            var matchRange = 80;
            if (index - matchRange < 0) {
                var lower = 0;
            } 
            else {
                var lower = index - matchRange;
            }

            if (index + matchRange > pageText.length) {
                var upper = pageText.length;
            } 
            else {
                var upper = index + matchRange;
            }

            var matchedString = "..." + pageText.substring(lower, index) + "<strong>" + pageText.substring(index, index+input.length) + "</strong>" + pageText.substring(index+input.length, upper) + "...";
            // alert("In " + url + ":\n" + matchedString);
            
            $(".main-content").append('<div class="search-found"><h3><a href="'+ url + '">'+ url + ':</h3></a><p>' + matchedString + '</p></div>');
        }
    });
}


function search(term) {
    var searchingFor = document.getElementById("searching");
    

    searchingFor.textContent = "Search results for " + term + ":"; // update page for term user entered

    //retrieve html from pages
    
    for (var pageNum in pages) {
        searchPage(pages[pageNum], term);
    }
}


function init() {
    // get the about link
    var aboutLink = document.getElementById("menu-button");
    
    aboutLink.onclick = toggleNav;

    // get the search form
    var searchForm = document.getElementById("search");
    searchForm.onsubmit = validateSearch;

    // check if search page
    var path = window.location.pathname;

    // if the page is search.html, it needs to run this as well
    if (path.includes("search.html")) {
        var searchInput = sessionStorage.search_term;
        search(searchInput);
    }
}


window.addEventListener("load", init); //use addEventListener so we don't overwrite the other onload request
