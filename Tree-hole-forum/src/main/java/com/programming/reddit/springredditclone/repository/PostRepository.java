package com.programming.reddit.springredditclone.repository;

import com.programming.reddit.springredditclone.model.Subreddit;
import com.programming.reddit.springredditclone.model.User;
import com.programming.reddit.springredditclone.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubreddit(Subreddit subreddit);

    List<Post> findByUser(User user);
}
