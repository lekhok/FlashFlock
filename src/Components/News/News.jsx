import { Component } from "react"
import NewsItem from "../NewsItem/NewsItem"
import { Spinner } from "../Spinner/Spinner"
import propTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
  static defaultProps = { country: "in", pageSize: 8, category: "general" }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
    apiKey: propTypes.string,
  }

  constructor(props) {
    super(props)
    const capitalizedCategory =
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    document.title = `NewsFlock - ${capitalizedCategory}`

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      capitalizedCategory: capitalizedCategory,
      totalResults: 0,
    }
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(20)
    let parsedData = await data.json()
    this.props.setProgress(60)

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews()
  }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 }, () => {
  //     this.updateNews()
  //   })

  //   // if (
  //   //   !this.state.page + 1 >
  //   //   Math.ceil(this.state.totalResults / this.props.pageSize)
  //   // ) {
  //   // } else {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     this.props.country
  //   //   }&category=${
  //   //     this.props.category
  //   //   }&apiKey=${this.props.apiKey}&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${this.props.pageSize}`
  //   //   this.setState({ loading: true })
  //   //   let data = await fetch(url)
  //   //   let parsedData = await data.json()

  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading: false,
  //   //   })
  //   // }
  // }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 }, () => {
  //     this.updateNews()
  //   })
  // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   this.props.country
  // }&category=${
  //   this.props.category
  // }&apiKey=${this.props.apiKey}&page=${
  //   this.state.page - 1
  // }&pageSize=${this.props.pageSize}`
  // let data = await fetch(url)
  // this.setState({ loading: true })
  // let parsedData = await data.json()

  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false,
  // })
  // }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1 // Increment the page here

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`

    let data = await fetch(url)
    let parsedData = await data.json()

    // Update the state using the previous state and the fetched data
    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: nextPage, // Update the page in the state
    }))
  }
  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

  //   let data = await fetch(url)
  //   let parsedData = await data.json()

  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   })
  // }

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "24px 0px", marginTop: "90px" }}
        >
          NewsFlock - Top {this.state.capitalizedCategory} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<Spinner />}
          style={{ overflow: "hidden" }}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                const titleSlice = element.title
                  ? element.title.slice(0, 45)
                  : ""
                const descriptionSlice = element.description
                  ? element.description.slice(0, 88)
                  : ""
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={titleSlice}
                      description={descriptionSlice}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
