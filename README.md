<h2>Changes from the Original tutorial </h2>
Slice method difference as original as per tutorial was throwing error when description or title was missing or short<br>
Spinner Component in Loading of page items has been replaced by a html and css template<br>
Uses React Router V6<br>
Date Format is different with time <br>
Change made to Page Change Method<br>
Changed capitilazation and headline rendering method<br>

<h2>Todo </h2>
Check Title length and add ... conditionally<br>
Fix Home page showing title as General<br>
Implement ChakraUI

<h3>Details of Changes</h3>
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
