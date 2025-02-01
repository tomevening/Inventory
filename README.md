# DotA-style Inventory and Characteristics 

## Demo video
[![Demo Video](https://img.youtube.com/vi/6VOYSzR7_54/0.jpg)](https://youtu.be/6VOYSzR7_54)

## Overview

This project is a web application that simulates an inventory and characteristics system inspired by [DotA-style]( https://en.wikipedia.org/wiki/Dota) games. It features a shop with multiple sections, a player inventory, and a comprehensive stats table that reactively tracks various player attributes.

## Features

### **Shop System**
Browse through multiple pages of items, each with unique attributes.
### **Player Inventory**
Manage an inventory that can hold up to six items. 
### **Dynamic Stats Table**: 
View and track player stats, including:  
- Basic stats like Strength or Mana  
- Complex stats like Attack Cooldown or Damage per Second.   
### **Item Attributes**
Items can provide:  
- Flat bonuses (e.g., +20 Strength)  
- Percentage bonuses (e.g., +20% Strength)  
- Stat multipliers (e.g., x2 Strength)  
### **Recipe System**
Some items are recipes that require multiple components to be purchased before they can be used.
### **Gold Management**
Players start with 1500 gold, can buy items, and sell them for half their cost.
### **Interactive UI**
Hovering over items reveals their name, description, stat bonuses, and gold cost. Recipe items display their required components.

## Technologies Used

- Vue  
- Vite  
- TypeScript
- Tailwind CSS
- CSS
- Pinia
- VueUse

## License

This project is licensed under the MIT License - see the [License](LICENSE) file for details.
