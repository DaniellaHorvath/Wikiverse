import React, { useState } from "react";
import apiURL from "../api";
import EditForm from "./EditForm";

const Page = (props) => {
  // const[isAddingPage, setIsAddingPage ] = useState(false);
  const[isEditingPage, setEditingPage ] = useState(false);

  const handleClick = (event) => {
    // Prevents the browser from following the link.
    event.preventDefault()

    // Updates the currentPage state (in App) with null.
    props.navigate(null)
  }

  const handleDelete = async () => {
    // Confirm the deletion before doing it 
    const isConfirmed = window.confirm(`Are you sure you want to delete this page?`);
    if(!isConfirmed) return;
    // Send a delete request to /api/wiki/:slug
    await fetch(apiURL + "/wiki/" + props.slug, {
      method: "DELETE"
    })
    // Get 
    await props.fetchPages();

    // Return 
    props.navigate(null);
  }

  return (
    <main>
      <a href="/" onClick={handleClick}>Home</a>
      <h1>{props.title}</h1>
      <p><b>Author:</b> {props.author.name}</p>
      <p><b>Published:</b> {new Date(props.createdAt).toLocaleDateString()}</p>
      <p>{props.content}</p>
      <p><b>Tags</b></p>
      <ul>
        {props.tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <button onClick={() => setEditingPage(!isEditingPage)} aria-expanded={isEditingPage}>Edit Page</button>
      {" "}
      <button onClick={handleDelete}>Delete page</button>
      {isEditingPage && <EditForm {...props} />}
    </main>
  )
}

export default Page