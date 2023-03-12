import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import CreatePostForm from "./component/create-post-form/CreatePostForm";
import EditPostForm from "./component/edit-post-form/EditPostForm";
import Footer from "./component/footer/Footer";
import Header from './component/header/Header';
import PaginationLinks from "./component/pagination-links/PaginationLinks";
import PostsList from "./component/posts-list/PostsList";
import postService from "./service/PostService";
import { toastError, toastSuccess } from "./toast/toast";

function App() {

  const [posts, setPosts] = useState([]);

  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [editFormState, setEditFormState] = useState({
    isShowing: false,
    postId: null
  });

  const [paginationStatus, setPaginationStatus] = useState({
    currentPage: 0,
    totalPages: 0
  });

  const getPosts = async (page) => {
    setIsPostsLoading(true);
    await postService.getAllPosts(page)
      .then(res => {
        setPosts(res.data.content);
        setPaginationStatus({
          currentPage: res.data.pageable.pageNumber,
          totalPages: res.data.totalPages
        });
      })
      .catch(err => {
        toastError(err.message);
      });
    setIsPostsLoading(false);
  }

  useEffect(() => {
    getPosts(0);
  }, []);
  

  const handleCreateButton = async (post) => {
    await postService.createPost(post)
      .then(res => {
        toastSuccess("Post created");
        getPosts();
      })
      .catch(err => {
        Object.entries(err.response.data).forEach(entry => toastError(`${entry[0]}: ${entry[1]}`));
      });
  }

  const handleDeleteButton = (postId) => {
    postService.deletePostById(postId)
      .then(res => {
        toastSuccess("Post deleted");
        getPosts(0);
        return true;
      })
      .catch(err => {
        toastError("Error deleting post");
        console.log(err);
        return false;
      });
  }

  const handleEditButton = (postId) => {
    setEditFormState({
      isShowing: true,
      postId: postId
    });
  }

  const handlePaginateButton = (pageNumber) => {
    getPosts(pageNumber);
  }

  const handleUpdateButton = (postId, post) => {
    postService.updatedPost(postId, post)
      .then(res => {
        toastSuccess("Post updated");
        getPosts(0);
      })
      .catch(err => {
        Object.entries(err.response.data).forEach(entry => toastError(`${entry[0]}: ${entry[1]}`));
      });
  }

  return (
    <div className="App min-vh-100 d-flex flex-column justify-content-between">
      <Header />
      <Container className="my-5">
        <ToastContainer />
        <Row>
          <Col sm={12} lg={{ span: 6, offset: 3 }}>
            <CreatePostForm handleCreateButton={handleCreateButton} />
            <PostsList
              posts={posts}
              isLoading={isPostsLoading}
              handleDeleteButton={handleDeleteButton}
              handleEditButton={handleEditButton}
            />
            <PaginationLinks
              handlePaginateButton={handlePaginateButton}
              currentPage={paginationStatus.currentPage}
              totalPages={paginationStatus.totalPages}
            />
          </Col>
        </Row>
        <EditPostForm
          show={editFormState.isShowing}
          postId={editFormState.postId}
          onHide={() => {
            setEditFormState({
              isShowing: false,
              postId: null
            });
          }}
          handleUpdateButton={handleUpdateButton}
        />
        <ScrollToTop />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
