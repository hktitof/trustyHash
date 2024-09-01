# Next.js Project Setup and Running Instructions

## Project Overview

This project is a Next.js application developed with React and various libraries for managing blockchain interactions and user notifications. The application is designed to work with the Sepolia test network for blockchain-related features.

## Prerequisites

- **Node.js** (v12.x or higher)
- **Yarn** (v1.22 or higher)
- **MetaMask** browser extension (for interacting with the Sepolia test network)

## Installation

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:
   ```bash
   git clone https://github.com/hktitof/trustyHash.git
   ```

2. **Navigate to the Project Directory**
   
   Change to the project directory:

3. **Install Dependencies**
   
   Install the required dependencies using Yarn:
   ```bash
   yarn install
   ```

## Running the Project

1. **Development Mode**

   To start the development server, use:
   ```bash
   yarn dev
   ```
   This will start the server on `http://localhost:3000`. You can view your application in a web browser at this address.


## MetaMask Setup

1. **Download MetaMask**
   - Go to [MetaMask](https://metamask.io/) and download the MetaMask browser extension for your preferred browser (Chrome, Firefox, or Edge).

2. **Set Up MetaMask**
   - Install the extension and follow the prompts to create a new wallet or import an existing one.

3. **Configure Sepolia Network**
   - Open MetaMask and click on the network dropdown at the top of the extension.
   - Click "Add Network" and enter the following details for the Sepolia test network:
     - **Network Name**: Sepolia
     - **New RPC URL**: `https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID`
     - **Chain ID**: `11155111`
     - **Currency Symbol**: ETH
     - **Block Explorer URL**: `https://sepolia.etherscan.io`

4. **Get Sepolia ETH**
   - Use a faucet to obtain Sepolia ETH for testing. You can find a Sepolia faucet [here](https://sepoliafaucet.com/).

#
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contact

For any questions, assistance with the project, or to schedule a live demo, please contact me at abdellatif@anaflous.com. I will be happy to provide a demonstration of the live application and assist with any queries.
