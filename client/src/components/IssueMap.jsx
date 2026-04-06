import { useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { createComment, getComments } from "../services/api.js";
import "leaflet/dist/leaflet.css";

const severityColors = {
  LOW: "#22c55e",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
  CRITICAL: "#991b1b"
};

function IssuePopupContent({ issue, onGetSuggestions, recommendationsByIssue, loadingIssueId }) {
  const [showComments, setShowComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [activeReplyTo, setActiveReplyTo] = useState("");
  const [replyText, setReplyText] = useState("");

  const loadComments = async () => {
    setCommentsLoading(true);
    setCommentsError("");

    try {
      const payload = await getComments("ISSUE", issue.id);
      setComments(payload.data || []);
    } catch (err) {
      setCommentsError(err.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleToggleComments = async () => {
    const next = !showComments;
    setShowComments(next);

    if (next) {
      await loadComments();
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    setCommentsError("");

    try {
      const token = localStorage.getItem("token");
      await createComment(
        {
          refType: "ISSUE",
          refId: issue.id,
          content: newComment.trim()
        },
        token
      );

      setNewComment("");
      await loadComments();
    } catch (err) {
      setCommentsError(err.message);
    }
  };

  const handleAddReply = async (parentCommentId) => {
    if (!replyText.trim()) {
      return;
    }

    setCommentsError("");

    try {
      const token = localStorage.getItem("token");
      await createComment(
        {
          refType: "ISSUE",
          refId: issue.id,
          content: replyText.trim(),
          parentComment: parentCommentId
        },
        token
      );

      setReplyText("");
      setActiveReplyTo("");
      await loadComments();
    } catch (err) {
      setCommentsError(err.message);
    }
  };

  const topLevel = comments.filter((item) => !item.parentComment);
  const repliesByParent = comments.reduce((acc, item) => {
    if (item.parentComment) {
      const key = String(item.parentComment);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
    }
    return acc;
  }, {});

  return (
    <>
      <strong>{issue.title}</strong>
      <br />
      Severity: {issue.severity}
      <br />
      Status: {issue.status}
      <br />
      <button
        className="suggest-btn"
        onClick={() => onGetSuggestions(issue.id)}
        disabled={loadingIssueId === issue.id}
      >
        {loadingIssueId === issue.id ? "Loading..." : "Get Suggestions"}
      </button>
      {Array.isArray(recommendationsByIssue[issue.id]) && (
        <ul className="suggest-list">
          {recommendationsByIssue[issue.id].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <button className="comment-toggle-btn" onClick={handleToggleComments}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>

      {showComments && (
        <div className="comments-panel">
          {commentsLoading && <p>Loading comments...</p>}
          {commentsError && <p className="comment-error">{commentsError}</p>}

          {topLevel.map((item) => (
            <div key={item._id} className="comment-item">
              <p className="comment-meta">{item.user?.name || "User"}</p>
              <p>{item.content}</p>
              <button
                className="reply-btn"
                onClick={() => {
                  setActiveReplyTo(activeReplyTo === item._id ? "" : item._id);
                  setReplyText("");
                }}
              >
                {activeReplyTo === item._id ? "Cancel" : "Reply"}
              </button>

              {activeReplyTo === item._id && (
                <div className="reply-box">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    placeholder="Write a reply"
                  />
                  <button className="reply-btn" onClick={() => handleAddReply(item._id)}>
                    Post Reply
                  </button>
                </div>
              )}

              {(repliesByParent[item._id] || []).map((reply) => (
                <div key={reply._id} className="comment-reply-item">
                  <p className="comment-meta">{reply.user?.name || "User"}</p>
                  <p>{reply.content}</p>
                </div>
              ))}
            </div>
          ))}

          <div className="comment-editor">
            <textarea
              rows={2}
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Add a comment"
            />
            <button className="suggest-btn" onClick={handleAddComment}>
              Post Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function IssueMap({
  issues,
  onGetSuggestions,
  recommendationsByIssue,
  loadingIssueId
}) {
  return (
    <MapContainer center={[23.52, 87.32]} zoom={10} className="issue-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {issues.map((issue) => (
        <CircleMarker
          key={issue.id}
          center={[issue.coordinates[1], issue.coordinates[0]]}
          radius={8}
          pathOptions={{
            color: severityColors[issue.severity] || "#0f766e",
            fillOpacity: 0.8
          }}
        >
          <Popup>
            <IssuePopupContent
              issue={issue}
              onGetSuggestions={onGetSuggestions}
              recommendationsByIssue={recommendationsByIssue}
              loadingIssueId={loadingIssueId}
            />
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
