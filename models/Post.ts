interface Comment {
    uid: string,
    content: string
}

export interface Post {
    content: string,
    imageUrl: string,
    uid: string,
    like: number,
    date: string,
    Comments: Array<Comment>
}