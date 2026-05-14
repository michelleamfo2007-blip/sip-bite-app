import friesImg from "../../images/friesss.jpg";
import kebabImg from "../../images/kebahh.webp";
import chickenImg from "../../images/chicken.jpg";
import sausageImg from "../../images/sasuage.webp";
import sweetChicksImg from "../../images/sweet chickss.jpg";
import cokeImg from "../../images/coke.jpeg";
import fantaImg from "../../images/fanta.jpeg";
import spriteImg from "../../images/sprite.jpeg";
import waterImg from "../../images/water.jpeg";
import megaCrunchDuoImg from "../../images/Mega Crunch Duo.jpg";
import samosaImg from "../../images/samosa.webp";
import springRollImg from "../../images/spring roll.webp";
import pineappleImg from "../../images/pineapple.webp";
export const menuData = {
  drinks: [
    { id: 'd1', name: "Coca Cola 300ML", price: 10, image: cokeImg },
    { id: 'd2', name: "Fanta 300ML", price: 10, image: fantaImg },
    { id: 'd3', name: "Sprite 300ML", price: 10, image: spriteImg },
    { id: 'd4', name: "Water 500ML", price: 5, image: waterImg },
    { id: 'd5', name: "Natural Pineapple Juice", price: 10, image: pineappleImg },
  ],
  regular: [
    { id: 'r2', name: "Goat Kebab", price: 20, description: "Spiced grilled goat meat skewers", image: kebabImg, popular: true },
    { id: 'r3', name: "Sausage Kebab", price: 20, description: "Grilled beef sausages with spices", image: sausageImg },
    { id: 'r4', name: "Fries", price: 35, description: "Golden crispy potato fries", image: friesImg },
    { id: 'r5', name: "Chicken (3 pieces)", price: 40, description: "Crispy deep-fried chicken pieces", image: chickenImg, popular: true },
  ],
  snacks: [
    { id: 's1', name: "Samosa", price: 10, description: "Fried pastry with savory filling", image: samosaImg },
    { id: 's2', name: "Spring Rolls", price: 10, description: "Crispy rolls with vegetable filling", image: springRollImg },
  ],
  packages: [
    { id: 'p1', name: "Sweet Chicks", price: 50, description: "Fries + 2 chicken pieces", image: sweetChicksImg, tag: "Best Value" },
    { id: 'p2', name: "Mega Crunch Duo", price: 75, description: "Fries + 3 chicken pieces + drink", image: megaCrunchDuoImg, tag: "Family Favorite", options: ["Coke", "Fanta", "Sprite", "Water"] },
  ]
};
