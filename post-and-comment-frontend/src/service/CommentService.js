import axios from "axios";

class CommentService {

  getAllPosts(postId) {
    return axios.get(`http://192.168.1.99:8080/api/post-and-comment/v1/posts/${postId}/comments?sort=updatedAt,desc`);
  }

  createComment(postId, comment) {
    return axios.post(`http://192.168.1.99:8080/api/post-and-comment/v1/posts/${postId}/comments`, comment);
  }

  // deletePostById(postId) {
  //   return axios.delete(`http://192.168.1.99:8080/api/post-and-comment/v1/posts/${postId}`);
  // }

}

const commentService = new CommentService();

export default commentService;