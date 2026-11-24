import friesImg from "../../images/menu/fries.jpg";
import chicken3Img from "../../images/menu/chicken-3.jpg";
import chicken5Img from "../../images/menu/chicken-5.jpg";
import sausageImg from "../../images/menu/sausage-kebab.jpg";
import samosaImg from "../../images/menu/samosa-3.jpg";
import springRollImg from "../../images/menu/springroll-3.jpg";
import fries2ChickenImg from "../../images/menu/fries-2-chicken.jpg";
import fries3ChickenDrinkImg from "../../images/menu/fries-3-chicken-drink.jpg";
import samosaChickenDrinkImg from "../../images/menu/samosa-chicken-drink.jpg";
import springrollChickenDrinkImg from "../../images/menu/springroll-chicken-drink.jpg";
import fantaImg from "../../images/fanta.jpeg";
import cokeImg from "../../images/coke.jpeg";
import spriteImg from "../../images/sprite.jpeg";
import juiceImg from "../../images/menu/drink-juice.jpg";

const drinkOptions = ["Coke", "Fanta", "Sprite", "Juice"];

export const menuData = {
  drinks: [
    { id: "d2", name: "Fanta", price: 15, image: fantaImg },
    { id: "d1", name: "Coca Cola", price: 15, image: cokeImg },
    { id: "d3", name: "Sprite", price: 15, image: spriteImg },
    { id: "d5", name: "Juice", price: 10, image: juiceImg },
  ],
  kebab: [
    { id: "r3", name: "Sausage Kebab", price: 20, description: "Grilled sausage on a stick, served in the cup", image: sausageImg },
  ],
  fries: [
    { id: "r4", name: "Fries", price: 40, description: "Golden crispy potato fries", image: friesImg },
  ],
  chicken: [
    { id: "r5", name: "Chicken, 3 pieces", price: 50, description: "Three pieces of crispy fried chicken", image: chicken3Img, popular: true },
    { id: "r6", name: "Chicken, 5 pieces", price: 80, description: "Five pieces of crispy fried chicken", image: chicken5Img },
  ],
  snacks: [
    { id: "s1", name: "Samosa, 4 pieces", price: 25, description: "Four samosas", image: samosaImg },
    { id: "s2", name: "Spring rolls, 4 pieces", price: 25, description: "Four spring rolls", image: springRollImg },
  ],
  packages: [
    { id: "p1", name: "Fries + 2 chicken pieces", price: 50, description: "Fries with two pieces of chicken", image: fries2ChickenImg, tag: "Combo" },
    { id: "p2", name: "Fries, 3 chicken & drink", price: 80, description: "Fries, three chicken pieces, and a drink", image: fries3ChickenDrinkImg, tag: "Combo", options: drinkOptions },
    { id: "p3", name: "Samosas, 2 chicken & drink", price: 50, description: "Samosas, two pieces of chicken, and a drink", image: samosaChickenDrinkImg, tag: "Combo", options: drinkOptions },
    { id: "p4", name: "Spring rolls, 2 chicken & drink", price: 50, description: "Spring rolls, two pieces of chicken, and a drink", image: springrollChickenDrinkImg, tag: "Combo", options: drinkOptions },
  ],
};
