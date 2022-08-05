import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "f5bde6ba-2d7a-4eed-8c8d-4f293ea14dd4",
    media: "",
    deletetoken: "",
    content:
      "Great things are not done by impulse, but by a series of small things brought together. George Eliot",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "FreshSmash",
    createdAt: "2022-05-19T23:27:39+05:30",
    updatedAt: "2022-05-19T23:27:39+05:30",
    comments: [
      {
        _id: "a8b63602-3f71-4911-8df7-6faed860fad3",
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "430fb00c-750b-4c2b-b01d-b0ef873e7099",
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "afbc6b4c-4359-4013-afaa-4435337798c4",
    content:
      "I do the very best I know how - the very best I can; and I mean to keep on doing so until the end",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",

    comments: [
      {
        _id: "64f2a9b9-c192-4a55-ae7a-10f79d741294",
        username: "shubhamsoni",
        text: "Interesting wow",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "04dc62fc-c274-465d-b887-1a0cdd2232bc",
        username: "sohamshah",
        text: "Wow amazing!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-06-18T23:27:39+05:30",
    updatedAt: "2022-06-18T23:27:39+05:30",
  },
  {
    _id: "afbc6b4c-4359-4013-afaa-4435373798c4",
    media: "https://res.cloudinary.com/dxe21vniv/image/upload/v1658082324/demo/la35xxzukdzzlaa9swjz.jpg",
    deletetoken: "b295951819bc458bbee7615cb459c8fd1a4e33c1fd1f5491cc7ba148e9b701633571df8d4ee4a276c54314b2fd302bac137e40cf8d603abe946ae04f1b3c2a1468f89ca24ffd0cd5c5b386112120a011947080eff90f151294b010a073901f08509051d80fa4d61fdd40c9414b0706db2a6a2fe34a1c0fa18fb6e19b3a04cb39d17943626d3dc0cc12768ca4b5925f3b",
    content:
      "New Collection.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",

    comments: [
    ],
    createdAt: "2022-07-18T23:27:39+05:30",
    updatedAt: "2022-07-18T23:27:39+05:30",
  },
  {
    _id: "afbc6b4c-4359-4013-afaa-4435673798c4",
    media: "",
    deletetoken: "",
    content:
      "Good Morning!!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",

    comments: [
    ],
    createdAt: "2022-07-19T23:27:39+05:30",
    updatedAt: "2022-07-19T23:27:39+05:30",
  },
];
