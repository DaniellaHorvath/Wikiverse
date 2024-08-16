import React from "react";
import apiURL from "../api";

const Home = (props) => {
  const handleClick = async (event) => {
    // Prevents the browser from following the link.
    event.preventDefault();

    // Sends a GET request to /api/wiki/:slug and gets the response data.
    const response = await fetch(apiURL + event.target.pathname)
    const page = await response.json()

    // Updates the currentPage state (in App) with the response data.
    props.navigate(page)
  }

  return (
		<main>
      <h1 className="title">Wikiverse</h1>
			<p className="subtitle">
        An interesting <span aria-label="library">📚</span>
      </p>
			<ul className="pageList">
        {props.pages.map((page) => (
          <li className="pageList-item" key={page.id}>
            <a href={`/wiki/${page.slug}`} onClick={handleClick}>
              {page.title}
            </a>
          </li>
        ))}
      </ul>
		</main>
  )
}

export default Home