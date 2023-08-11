import { Component } from "react"
export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props
    return (
      <div className="card my-3">
        <span
          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
          style={{ left: "87%", zIndex: "2" }}
        >
          {source}
        </span>
        <img
          src={
            !imageUrl
              ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>

          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toDateString()} {"- "}
              {new Date(date).toTimeString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    )
  }
}

export default NewsItem
