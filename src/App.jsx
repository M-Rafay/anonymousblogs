

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  // Listen for posts
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  // Add new post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    await addDoc(collection(db, "posts"), {
      text: newPost,
      timestamp: Date.now(),
    });
    setNewPost("");
  };

  return (
    <div className="container">
      <h1>Anonymous Blogs</h1>
      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a new post..."
          rows={3}
        />
        <button type="submit">Submit Post</button>
      </form>
      <h2>All Posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div>{post.text}</div>
            <Link to={`/post/${post.id}`} className="detail-link">
              View Details & Comments
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
