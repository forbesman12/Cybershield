import RoomImg from "../../assets/H2.png";
import RoomImg2 from "../../assets/H3.png";
import RoomImg3 from "../../assets/H6.png";
import RoomImgJ1 from "../../assets/J1.jpg";
import RoomImgJ2 from "../../assets/J2.jpg";
import RoomImgJ4 from "../../assets/J4.jpg";

/**
 * @typedef {Object} RoomData
 * @property {number} id - Unique room ID
 * @property {string} name - Room name
 * @property {string} image - Path to room image
 * @property {string} price - Price string (e.g. "$150/night")
 * @property {string[]} utils - List of room utilities/features
 * @property {string} tags -
 * @property {String}description
*/

/** @type {RoomData[]} */
export const roomsData = [
  {
    id: 1,
    name: "Happiness Suite",
    image: RoomImg2,
    gallery: [RoomImg2, RoomImg3, RoomImg],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "Designed for both comfort and elegance, the Happiness Suite offers spacious living areas, modern décor, and a serene atmosphere that makes every stay unforgettable. Perfect for couples or small families seeking luxury and relaxation.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Kitchen"
    ],
  },
  {
    id: 2,
    name: "Blessing Suite",
    image: RoomImgJ1,
    gallery: [RoomImgJ1, RoomImgJ2, RoomImgJ4],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "A cozy retreat that blends modern sophistication with homely charm. The Blessing Suite is tailored for an intimate experience, offering ample space, luxury amenities, and a warm ambiance ideal for a quiet getaway.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Kitchen"
    ],
  },
  {
    id: 3,
    name: "Garce Suite",
    image: RoomImg3,
    gallery: [RoomImg2, RoomImg3],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "The Grace Suite offers timeless elegance and comfort, featuring generous space, sleek interiors, and thoughtful amenities. With room for family or friends, it’s perfect for longer stays or group relaxation.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Kitchen"
    ],
  },
  {
    id: 4,
    name: "Luxury Suite",
    image: RoomImg,
    gallery: [RoomImg2, RoomImg3],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Kitchen"
    ],
  },
];
