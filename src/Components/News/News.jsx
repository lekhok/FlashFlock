import { Component } from "react"
import NewsItem from "../NewsItem/NewsItem"
import { Spinner } from "../Spinner/Spinner"
import propTypes from "prop-types"

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
      loading: false,
      page: 1,
      capitalizedCategory: capitalizedCategory,
    }
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  async componentDidMount() {
    this.updateNews()
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.updateNews()
    })

    // if (
    //   !this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) {
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=${this.props.apiKey}&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`
    //   this.setState({ loading: true })
    //   let data = await fetch(url)
    //   let parsedData = await data.json()

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   })
    // }
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => {
      this.updateNews()
    })
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
  }

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "24px 0px" }}>
            NewsFlock - Top {this.state.capitalizedCategory} Headlines
          </h1>

          {this.state.loading && <Spinner />}

          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
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
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default News
