package com.francisbernas.jpaonetomanydemo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "posts")
public class Post extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @NotEmpty
  @Size(max = 100)
  @Column(unique = true)
  private String title;

  @NotNull
  @NotEmpty
  @Size(max = 250)
  private String description;

  @NotNull
  @NotEmpty
  @Lob
  @Column(length = 4000)
  private String content;
}
