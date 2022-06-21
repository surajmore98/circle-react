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
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti at.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
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
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
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
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
