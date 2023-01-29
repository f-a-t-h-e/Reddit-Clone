import React, { useRef, useState } from "react";
import { Alert, AlertIcon, Flex, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { firestore, storage } from "@/firebase/clientApp";
import TabItem from "./TabItem";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";
import { IconType } from "react-icons";
import { IPost } from "@/atoms/posts.Atom";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export interface ITabItem {
  title: string;
  icon: IconType;
}

type NewPostFormProps = {
  user: User;
  // communityId: string;
  // communityImageURL?: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  // communityId,
  // communityImageURL,
}) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const [selectedFile, setSelectedFile] = useState<string>("");
  const selectFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  // const setPostItems = useSetRecoilState(postState);

  const handleCreatePost = async () => {
    setLoading(true);
    const { communityId } = router.query;
    const { title, body } = textInputs;
    // prepare new post
    const newPost: IPost = {
      authorId: user.uid,
      authorName: user.displayName || user.email?.split("@")[0] || "Unknown",
      body,
      // TO_DO : fix this
      communityId: communityId as string,
      title,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    try {
      // get new ref to that post
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check if the user wanted to attach files
      if (selectedFile) {
        // get new ref to that file (image)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadURL = await getDownloadURL(imageRef);

        // add the imageUrl to its post
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }
    } catch (error) {
      console.log("createPost error", error);
      setError("Something went wrong, please try again later.");
    }

    setLoading(false);
    router.back();
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error" borderRadius={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
