import ReactTimeAgo from "react-time-ago";

function Comment(props) {
  return (
      <>
        {props.comment.text}
        <ReactTimeAgo className="fw-light text-muted fs-6" date={Date.parse(props.comment.updatedAt)} locale="en" />
      </>
  );
}

export default Comment;