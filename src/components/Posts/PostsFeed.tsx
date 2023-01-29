import { User } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { Community } from "@/atoms/communities.Atom";
import { firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { IPost } from "../../atoms/posts.Atom";

type Props = {
  communityData: Community;
  user?: User;
};

const PostsFeed = ({ communityData }: Props) => {
  const { postStateValue, setPostStateValue } = usePosts();

  const getPosts = async () => {
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("community", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({ ...prev, posts: posts as IPost[] }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return <div>PostsFeed</div>;
};

export default PostsFeed;
