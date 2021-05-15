interface Comment {
    uid: string,
    content: string
}

interface Post {
    content: string,
    imageUrl: string,
    likes: number,
    date: number,
    comments: Array<Comment>
}

export interface Posts {
    posts: Array<Post>
}

