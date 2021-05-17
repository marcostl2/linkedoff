interface Comment {
  uid: string;
  content: string;
}

interface Post {
  uid: string;
  content: string;
  imageUrl: string;
  likes: string[];
  date: number;
  comments: Array<Comment>;
  owner: string;
  global: boolean;
}

export interface Posts {
  posts: Array<Post>;
}
