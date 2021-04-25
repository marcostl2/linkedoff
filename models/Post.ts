interface Post {
    content: string,
    image_url: string,
    uid: string,
    like: number,
    Comments: Array<Comment>
}

interface Comment {
    uid: string,
    content: string
}