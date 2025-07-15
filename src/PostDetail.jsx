import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost({ id: postSnap.id, ...postSnap.data() });
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const q = query(
      collection(db, `posts/${postId}/comments`),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await addDoc(collection(db, `posts/${postId}/comments`), {
      text: newComment,
      timestamp: Date.now(),
    });
    setNewComment("");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <Link to="/">← Back to posts</Link>
      <h2>Post Detail</h2>
      <div className="post-item">
        <div>{post.text}</div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Comment</button>
        </form>
        <ul className="comment-list">
          {comments.length === 0 && <li>No comments yet.</li>}
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
