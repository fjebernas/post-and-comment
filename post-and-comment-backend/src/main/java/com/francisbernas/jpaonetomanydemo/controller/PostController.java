package com.francisbernas.jpaonetomanydemo.controller;

import com.francisbernas.jpaonetomanydemo.exception.ResourceNotFoundException;
import com.francisbernas.jpaonetomanydemo.model.Post;
import com.francisbernas.jpaonetomanydemo.repository.PostRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RequestMapping("${serverBaseUrl}")
@CrossOrigin
@RestController
public class PostController {

  private final PostRepository postRepository;

  public PostController(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  @GetMapping("/posts")
  public Page<Post> getAllPosts(Pageable pageable) throws InterruptedException {
    TimeUnit.MILLISECONDS.sleep(400);
    return postRepository.findAll(pageable);
  }

  @PostMapping("/posts")
  public Post createPost(@Valid @RequestBody Post post) {
    return postRepository.save(post);
  }

  @PutMapping("/posts/{postId}")
  public Post updatePost(@PathVariable Long postId, @Valid @RequestBody Post postRequest) {
    return postRepository.findById(postId).map(post -> {
      post.setTitle(postRequest.getTitle());
      post.setDescription(postRequest.getDescription());
      post.setContent(postRequest.getContent());
      return postRepository.save(post);
    }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
  }

  @DeleteMapping("/posts/{postId}")
  public ResponseEntity<?> deletePost(@PathVariable Long postId) {
    return postRepository.findById(postId).map(post -> {
      postRepository.delete(post);
      return ResponseEntity.noContent().build();
    }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
  }

  @GetMapping("/posts/{postId}")
  public ResponseEntity<?> getPostById(@PathVariable Long postId) {
    return postRepository.findById(postId).map(post ->
            ResponseEntity.status(HttpStatus.OK).body(post)
            ).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
  }
}
