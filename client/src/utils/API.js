import axios from "axios";

export default {
  // Gets all articles
  getArticles: function(searchTerm, startDate, endDate) {
    const q = searchTerm.replace(/ /g, "+");
    let url = `/search?searchTerm=${q}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    console.log(url);
    return axios.get(url);
  },
  // Gets the article with the given id
  getSaved: function() {
    return axios.get("/api/saved");
  },
  // Deletes the article with the given id
  unsave: function(id) {
    return axios.delete("/api/saved/" + id);
  },

  // Saves an article to the database
  save: function(articleData) {
    console.log(articleData);
    return axios.post("/api/saved", articleData);
  }

};
