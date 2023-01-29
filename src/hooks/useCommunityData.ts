import { useEffect, useState } from "react";
import {
  type Community,
  type CommunitySnippet,
  communityState,
} from "@/atoms/communities.Atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { authModalState } from "@/atoms/authModalAtom";

const useCommunityData = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const joinCommunity = async (community: Community) => {
    if (!user) return setIsError("Please Log in and try again");
    // TO_DO : Remove all of these, and let the server process such tasks.

    /**
     * batch write
     *   push to the user's communitySnippets[]
     *   increase the community's numberOfMembers by 1
     */
    try {
      // TO_DO : 1- You have to make sure that the database is not deleted
      // TO_DO : 2- This is temporary because the server should take this step
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: community.id,
        imageURL: community.imageURL || "",
      };
      batch.set(
        doc(firestore, `users/${user.uid}/communitySnippets`, community.id),
        newSnippet
      );

      batch.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.concat(newSnippet),
      }));
    } catch (error: any) {
      if (/No document/i.test(error.message.toString())) {
        console.log("joinCommunity func error", "Deleted community");
        setIsError("Community doesn't exist");
      } else {
        console.log("joinCommunity func error", error.message);
        setIsError(error.message);
      }
    }
    // update communityState
  };
  const leaveCommunity = async (communityId: string) => {
    // NOTE : splice may not be the correct word
    // batch write
    //  splice from the user's communitySnippets[]
    //  decrease the community's numberOfMembers by 1
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log("leaveCommunity func error", error);
    }
  };

  const onJoinOrLeaveCommunity = async (
    community: Community,
    isJoined: boolean
  ) => {
    setLoading(true);
    // make sure the user is signed in
    {
      if (!user) {
        setAuthModalState({ open: true, view: "login" });
        return setLoading(false);
      }

      if (isJoined) {
        if (community.creatorId === user.uid) {
          setIsError(
            "You can't leave a community that you are a moderator in."
          );
          return setLoading(false);
        }
        leaveCommunity(community.id);
        return setLoading(false);
      }
      joinCommunity(community);
    }

    setLoading(false);
  };

  const getMySnippets = async () => {
    try {
      if (!user) {
        return setCommunityStateValue({ mySnippets: [] });
      }
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getSnippet Error: ", error);
      setIsError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMySnippets();
    setLoading(false);
    // TO_DO : fix this properly
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
    isError,
  };
};

export default useCommunityData;
