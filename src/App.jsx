import { Component } from "react"
import Navbar from "./Components/Navbar/Navbar"
import News from "./Components/News/News"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom"

export default class App extends Component {
  pageSize = 9

  render() {
    //Api key generated from Newsapi.org , it has been saved in .env
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY

    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="general"
                  key="general"
                  apiKey={apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/business"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="business"
                  key="business"
                  apiKey={this.apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/entertainment"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="entertainment"
                  key="entertainment"
                  apiKey={this.apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/health"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="health"
                  key="health"
                  apiKey={this.apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/science"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="science"
                  key="science"
                  apiKey={this.apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/sports"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="sports"
                  key="sports"
                  apiKey={this.apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/technology"
              element={
                <News
                  pageSize={this.pageSize}
                  country="in"
                  category="technology"
                  key="technology"
                  apiKey={this.apiKey}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
