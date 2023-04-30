# PostHive

## Initial design and requirements

 ### POST /auth - login using username and phone - verify otp and attach a bearer token (use cookies maybe?)
		
		users schema - _id, phone, username, otp, userId
		
		Enhancements - register a user if newUser, logout user after certain period of time(expire token)

### GET /posts - show all posts all users. In frontend show post title, author, createdAt and a read more button
 	 	
		posts schema - _id, postId, authorId, authorName, postTitle, postDescription, createdAt, mediaUrl(photos), commentId, likes, postCategory

		functionality - view more, delete post, edit post, add post. Must show all posts of all users. But only allowed to
		edit, delete one's own posts. Can like other posts (maybe upvote, downvote like reddit)

		Enhancements - pagination, search posts, sort and filter by createdAt or postCategory or number of upvotes

### GET /posts/:id - show all relevant info related to that post id. Show comments on that post. They are nested comments where replies can be nested. 
		
    functionality - Anyone who has logged in can comment and reply. But only owner of the comment can edit, delete their
		comment. Anyone can upvote and downvote comments.
    
		comments schema - _id, commentId, postId, authorId, authorName, createdAt, commentText, likes, parentCommentId

		Enhancements - sort comments by most upvoted, search comments by commentText. Collapse thread, expand thread of comments

### Tech Stack:
  Frontend: Angular NG Zorro  
  Backend: NodeJS, Express  
  Database: MongoDB  
  Version Control: Git  

