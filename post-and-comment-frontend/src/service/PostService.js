import axios from "axios";
import { POSTS_PER_PAGE } from "../config";

class PostService {

  getAllPosts(page) {
    return axios.get(`http://192.168.1.99:8080/api/post-and-comment/v1/posts?page=${page}&size=${POSTS_PER_PAGE}&sort=updatedAt,desc`);
  }

  createPost(post) {
    return axios.post(`http://192.168.1.99:8080/api/post-and-comment/v1/posts`, post);
  }

  updatedPost(postId, post) {
    return axios.put(`http://192.168.1.99:8080/api/post-and-comment/v1/posts/${postId}`, post);
  }

  deletePostById(postId) {
    return axios.delete(`http://192.168.1.99:8080/api/post-and-comment/v1/posts/${postId}`);
  }

  getPostById(postId) {
    return axios.get(`http://192.168.1.99:8080/api/post-and-comment/v1/posts/${postId}`);
  }

}

const postService = new PostService();

export default postService;