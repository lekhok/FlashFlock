<h1>Flash Flock - The news app</h1>
Enhanced NewsFlock is a React.js project inspired by CodeWithHarry's tutorial on building class-based components. It's an interactive news app that fetches top headlines from various categories using the NewsAPI. The project takes the foundational concepts from the tutorial and adds its own unique twists, making it a great example of how to extend and customize learning projects.

<h2>Key Features:</h2>
Displays top headlines from different categories (general, business, entertainment, health, science, sports, technology) using NewsAPI.<br>
Utilizes React class-based components for structuring the UI and handling data fetching.<br>
Implements pagination for navigating through the list of news articles.<br>
Incorporates a custom Spinner component to provide a better user experience during loading.<br>
Demonstrates how to handle API keys using environment variables and the .env file.<br>

<h2>Learning Objectives:</h2>
Gained a solid understanding of React class-based components.<br>
Practiced API data fetching and rendering data dynamically in the UI.<br>
Explored component lifecycle methods, such as componentDidMount.<br>
Enhanced knowledge of handling props and state in class-based components.<br>
Learned how to implement navigation using React Router.<br>
Encountered challenges and problem-solving skills through debugging and revisiting code structure.<br>

<h2>Changes from the Original tutorial: </h2>
Slice method difference as original as per tutorial was throwing error when description or title was missing or short<br>
Spinner Component in Loading of page items has been replaced by a html and css template<br>
Uses React Router V6<br>
Date Format is different with time <br>
Change made to Page Change Method<br>
Changed capitilazation and headline rendering method<br>

<h2>Todo: </h2>
Check Title length and add ... conditionally<br>
Fix Home page showing title as General<br>
Implement ChakraUI

<h3>Details of Changes:</h3>
<h5>1. Page Change Method Update</h5>
Issue: Page loading twice on clicking the "Next" button.
Description: The page was loading twice when the "Next" button was clicked due to a race condition caused by calling the this.updateNews() method immediately after incrementing the page number. Since this.updateNews() is asynchronous and involves API calls and state updates, it could lead to the new state not being fully updated when calling this.updateNews().

Resolution: To address this issue, we have updated the page change methods as follows:

- In the handleNextClick method, we now use this.setState to increment the page number and, at the same time, we call this.updateNews() within the callback of setState. This ensures that the state update is complete before making the API call.
- Similarly, in the handlePrevClick method, we follow the same pattern to ensure consistent behavior.

Example (handleNextClick method):

```javascript
handleNextClick = () => {
  this.setState({ page: this.state.page + 1 }, () => {
    this.updateNews()
  })
}
```

<h5>2. Dublicate Pagination and rendering</h5>
In response to an issue with duplicate rendering and incorrect pagination when fetching more data, the following updates were made to the codebase:

News Component
fetchMoreData Function
The fetchMoreData function was updated to ensure proper pagination and appending of new articles to the existing list. Here's a breakdown of the changes:

```javascript
fetchMoreData = async () => {
  // Increment the page number for fetching the next page of data
  const nextPage = this.state.page + 1

  // Construct the API URL for fetching news data of the next page
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`

  try {
    // Fetch data from the API using the constructed URL
    let data = await fetch(url)
    let parsedData = await data.json()

    // Update the state to include the newly fetched articles
    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles), // Append new articles
      totalResults: parsedData.totalResults,
      loading: false,
      page: nextPage, // Update the page number in the state
    }))
  } catch (error) {
    console.error("Error fetching more news:", error)
    // Handle error scenario if necessary
  }
}
```

<h2>Credits: </h2>
This project is based on the YouTube tutorial by CodeWithHarry on React class-based components. The tutorial provided the foundation for the project's structure and functionality. Additional enhancements and customizations were added by Kumud C Lekhok to further showcase practical skills and learning progress.

<h2>Repository: </h2>

The source code for Enhanced NewsFlock can be found on GitHub: https://github.com/lekhok/FlashFlock
