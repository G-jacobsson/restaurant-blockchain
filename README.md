# The End of The World

## Restaurant Website on Ganache Blockchain

### Features used with MetaMask Wallet

- Book a table
- See bookings for the restaurant
- Edit a booking
- Delete a booking

#### How to use

1. Clone the repository

- Open command palette in VSCode

```
Ctrl + Shift + P
```

- Clone the repository

```
Git: Clone
```

- Enter the repository URL

- Choose the folder where you want to clone the repository

- Open the folder in VSCode

2. Install Ganache

- Download Ganache from [here](https://www.trufflesuite.com/ganache)

3. Install MetaMask

- Download MetaMask from [here](https://metamask.io/)

4. Start Ganache

- Open Ganache and start the server

5. Connect MetaMask to Ganache

- Open MetaMask and connect to the Ganache network

6. Import the Ganache accounts to MetaMask

- Copy the private key of the first account in Ganache

- Open MetaMask and click on the account icon

- Click on Import Account

- Paste the private key and click on Import

7. Open terminal in VSCode

- Move into eth-restaurant folder using the terminal in VSCode

```
cd eth-restaurant
```

- Install node packages

```
npm install
```

8. Deploy the contract

- Install truffle

```
npm install -g truffle
```

- Deploy the contract using truffle

```
truffle migrate
```

9. Move into therestaurant folder

```
cd ..
```

```
cd therestaurant
```

10. Install node packages

```
npm install
```

11. Create a .env file in therestaurant folder

- Check .env.example file for the required environment variables
- You'll find the contract address in the terminal after deploying the contract. Copy the contract address and paste it in the .env file

12. Start the server

```
npm run dev
```

13. Open the browser and copy the URL shown in the terminal.

14. Connect MetaMask to the browser

- The website will prompt you to connect MetaMask to the website. Click on connect and connect to the Ganache network.

15. Use the website

- You can now use the website to book a table, see bookings, edit a booking, and delete a booking.

#### Enjoy the website!

``
