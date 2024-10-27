# Bitcoin Game

Welcome to the Bitcoin Game! This web application allows players to interact with virtual Bitcoin through various features such as:

- An account section for managing user profiles.
- A store for purchasing items with virtual Bitcoin.
- A marketplace for trading items.

![Bitcoin Game Front Page](./assets/front-page-screenshot.png) <!-- Update the path to your screenshot -->

## Table of Contents

- Features
- Technologies Used
- Installation Instructions
- Contract Deployment
- Updating the Contract Address
- Usage
- Contributing
- License

## Features

- User Account Management: Users can manage their account details.
- Store: Users can purchase items with their virtual Bitcoin.
- Marketplace: Users can trade items in the marketplace.
- Boosters Section: A special section dedicated to different boosters available in the game.

## Technologies Used

- React: For building the user interface.
- CSS: For styling the application.
- Node.js: For the backend setup (if applicable).
- Ethereum Smart Contracts: For managing transactions.

## Installation Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/BitcoinGame.git
   ```

2. Navigate to the project directory:
   ```
   cd BitcoinGame
   ```

3. Install dependencies: Ensure you have Node.js installed on your machine. If not, download and install it from [Node.js official website](https://nodejs.org/). Then, install the required packages:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```
   This will launch the app in your default web browser at `http://localhost:3000`.

## Contract Deployment

To use the Bitcoin Game, you need to deploy the smart contract. Follow these steps:

1. Install Hardhat: If you haven't already, install Hardhat globally:
   ```
   npm install --global hardhat
   ```

2. Navigate to the Hardhat project folder (if you have a separate folder for smart contracts):
   ```
   cd path/to/hardhat-project
   ```

3. Deploy the contract:
   ```
   npx hardhat run scripts/deploy.js --network <your-network>
   ```
   Replace `<your-network>` with the network you are deploying to (like `localhost`, `rinkeby`, etc.).

4. Take note of the deployed contract address: After deployment, you will see the contract address in your console output.

## Updating the Contract Address

After deploying your contract, you need to update the contract address in your application:

1. Open `App.jsx`: Find the line where the contract address is defined.

2. Replace the old contract address: Update it with your new deployed contract address:
   ```
   const contractAddress = "YOUR_NEW_CONTRACT_ADDRESS"; // Replace this with your new address
   ```

## Usage

Once the application is running, you can navigate through different sections:
- Account: Manage your account information.
- Store: Buy items with your virtual currency.
- Marketplace: Trade items with other users.
- Boosters: Explore and purchase boosters to enhance your gameplay.

## Contributing

Contributions are welcome! If you would like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
