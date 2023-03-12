package com.francisbernas.jpaonetomanydemo.controller;

import com.francisbernas.jpaonetomanydemo.exception.ResourceNotFoundException;
import com.francisbernas.jpaonetomanydemo.model.Comment;
import com.francisbernas.jpaonetomanydemo.repository.CommentRepository;
import com.francisbernas.jpaonetomanydemo.repository.PostRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RequestMapping("${serverBaseUrl}")
@CrossOrigin
@RestController
public class CommentController {

  private final CommentRepository commentRepository;
  private final PostRepository postRepository;

  public CommentController(
          CommentRepository commentRepository,
          PostRepository postRepository
  ) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  @GetMapping("/posts/{postId}/comments")
  public Page<Comment> getAllCommentsByPostId(
          @PathVariable(value = "postId") Long postId,
          Pageable pageable
  ) throws InterruptedException {
    TimeUnit.MILLISECONDS.sleep(200);
    return commentRepository.findByPostId(postId, pageable);
  }

  @PostMapping("/posts/{postId}/comments")
  public Comment createComment(
          @PathVariable(value = "postId") Long postId,
          @Valid @RequestBody Comment comment
  ) {
    return postRepository.findById(postId).map(post -> {
      comment.setPost(post);
      return commentRepository.save(comment);
    }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
  }

  @PutMapping("/posts/{postId}/comments/{commentId}")
  public Comment updateComment(
          @PathVariable(value = "postId") Long postId,
          @PathVariable(value = "commentId") Long commentId,
          @Valid @RequestBody Comment commentRequest
  ) {
    if (!postRepository.existsById(postId)) {
      throw new ResourceNotFoundException("PostId " + postId + " not found");
    }

    return commentRepository.findById(commentId).map(comment -> {
      comment.setText(commentRequest.getText());
      return commentRepository.save(comment);
    }).orElseThrow(() -> new ResourceNotFoundException("CommentId " + commentId + " not found"));
  }

  @DeleteMapping("/posts/{postId}/comments/{commentId}")
  public ResponseEntity<?> deleteComment(
          @PathVariable(value = "postId") Long postId,
          @PathVariable(value = "commentId") Long commentId
  ) {
    return commentRepository.findByIdAndPostId(commentId, postId).map(comment -> {
      commentRepository.delete(comment);
      return ResponseEntity.ok().build();
    }).orElseThrow(() -> new ResourceNotFoundException(
            "Comment not found with id " + commentId + " and postId " + postId
    ));
  }

}
