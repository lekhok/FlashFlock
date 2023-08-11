import { Component } from "react"
import Navbar from "./Components/Navbar/Navbar"
import News from "./Components/News/News"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom"

import LoadingBar from "react-top-loading-bar"

export default class App extends Component {
  pageSize = 9
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    //Api key generated from Newsapi.org , it has been saved in .env
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY

    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Navbar />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
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
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  category="business"
                  key="business"
                  apiKey={apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  category="entertainment"
                  key="entertainment"
                  apiKey={apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  category="health"
                  key="health"
                  apiKey={apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  category="science"
                  key="science"
                  apiKey={apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  category="sports"
                  key="sports"
                  apiKey={apiKey}
                />
              }
            ></Route>

            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  category="technology"
                  key="technology"
                  apiKey={apiKey}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
