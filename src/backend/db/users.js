import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "631a82cf-63d1-4b1c-bf26-5b0b14fbef95",
    firstName: "Adam",
    lastName: "Branson",
    username: "FreshSmash",
    password: "test123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "",
    profileImage: ""
  },
  {
    _id: "631a82cf-63d1-4b1c-bf26-5b0b14fbef55",
    firstName: "joe",
    lastName: "dev",
    username: "joedev",
    password: "test123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "",
    deletetoken: "",
    profileImage: ""
  },
  {
    _id: "fcd2a466-1323-42ad-8bb1-ddaff1ea7c3b",
    firstName: "Subham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: "shubhamsoni123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "",
    deletetoken: "",
    profileImage: ""
  },
  {
    _id: "5c34165f-20a4-4b90-b56d-dfbfd9dd4fd0",
    firstName: "Soham",
    lastName: "Shah",
    username: "sohamshah",
    password: "sohamshah123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "",
    profileImage: "",
    deletetoken: ""
  }
];
