import RoomImg from "../../assets/H2.jpg";
import RoomImg2 from "../../assets/H3.jpg";
import RoomImg3 from "../../assets/H6.jpg";
import RoomImgJ1 from "../../assets/J1.jpg";
import RoomImgJ2 from "../../assets/J2.jpg";
import RoomImgJ4 from "../../assets/J4.jpg";
import Grace1 from "../../assets/R3.jpg";
// import Grace2 from "../../assets/R3I.jpg";
import Grace3 from "../../assets/R3II.jpg";
import Grace4 from "../../assets/R3III.jpg"; 
import Blessing1 from "../../assets/B1.jpg"; 
import Happiness1 from "../../assets/B2.jpg"; 
import Happiness2 from "../../assets/HH1.jpg";
import Happiness3 from "../../assets/HH3.jpg";
import Blessing3 from "../../assets/B11.jpg";
import Blessing4 from "../../assets/B123.jpg";



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
    name: "Grace Suite",
    image: RoomImg2,
    gallery: [RoomImg2, RoomImg3, RoomImg],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "The Grace Suite offers timeless elegance and comfort, featuring generous space, sleek interiors, and thoughtful amenities. With room for family or friends, it's perfect for longer stays or group relaxation.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Stairs",
      "Kitchen"
    ],
  },
  {
    id: 2,
    name: "Peace Suite",
    image: RoomImgJ1,
    gallery: [RoomImgJ1, RoomImgJ2, RoomImgJ4],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "A tranquil haven designed for peace and serenity. The Peace Suite combines modern amenities with a calming atmosphere, perfect for guests seeking relaxation and comfort in a beautifully appointed space.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Stairs",
      "Kitchen"
    ],
  },
  {
    id: 3,
    name: "Comfort",
    image: Grace1,
    gallery: [Grace1, Grace3, Grace4],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "The Grace Suite offers timeless elegance and comfort, featuring generous space, sleek interiors, and thoughtful amenities. With room for family or friends, it’s perfect for longer stays or group relaxation.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Stairs",
      "Kitchen"
    ],
  },
  {
    id: 4,
    name: "Blessing Suite",
    image: Blessing1,
    gallery: [Blessing1, Blessing3, Blessing4],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "A cozy retreat that blends modern sophistication with homely charm. The Blessing Suite is tailored for an intimate experience, offering ample space, luxury amenities, and a warm ambiance ideal for a quiet getaway.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Stairs",
      "Kitchen"
    ],
  },
  {
    id: 5,
    name: "Happiness Suite",
    image: Happiness1,
    gallery: [Happiness1, Happiness2, Happiness3],
    price: "₦150,000 / night",
    tags: '45-inch LED TV Hospitality TV/ Mini bar / Non-smoking / USB charging',
    description: "Designed for both comfort and elegance, the Happiness Suite offers spacious living areas, modern décor, and a serene atmosphere that makes every stay unforgettable. Perfect for couples or small families seeking luxury and relaxation.",
    utils: [
      "Sitting Room",
      "Dining",
      '3 Toilets',
      "2 Bed",
      "AC",
      "Stairs",
      "Kitchen"
    ],
  },
];
