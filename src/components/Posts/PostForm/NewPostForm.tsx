import React, { useRef, useState } from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { firestore, storage } from "../../../firebase/clientApp";
import TabItem from "./TabItem";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";
import { IconType } from "react-icons";

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
  // communityId: string;
  // communityImageURL?: string;
  // user: User;
};

const NewPostForm: React.FC<NewPostFormProps> = (
  {
    // communityId,
    // communityImageURL,
    // user,
  }
) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const [selectedFile, setSelectedFile] = useState<string>("");
  const selectFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const router = useRouter();
  // const setPostItems = useSetRecoilState(postState);

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;

    setLoading(false);
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
    </Flex>
  );
};
export default NewPostForm;
