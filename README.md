# KYC_Blockchain
Implementation of KYC using Blockchain Methodologies IPFS Database
#  Installations and Dependencies : [View](Installation And Setup.md)
## Data Pipeline:
- New User 
>  - Submits documents on Bank UI.
>  - Data is stored to IPFS using OrbitDb Instance called from JS
>  - OrbitDB returns a hash returned by IPFS after storing the documents.
>  - This hash is now encrypted and the *private key* is handed over to The User.
>  - The hash is now stored on Ethereum using ..........
- Existing User
>  - Bank fetches customer data by entering block hash value, retrives the encrypted hash.
>  - USer Gives private key to allow bank to access their KYC details.
>  - Bank asks for a verification to ensure entered details are valid.
>  (subject to t&C of bank)
- Values Held By User:
>  - *private key*
>  - Block Hash value 
- Background:
>  - Ganache running in background to host the Blockchain Tech.
>  - Custom made functions in Solidity to invoke ethureum functions. 


## WorkFLow:
1. Node JS and CSS to make Front End.
> Input for New User: Collect Documents, return : *private key* , block hash value
> Input for existing user: Verify Docs, return : new *private key* , new block hash value


2. IPFS Using OrbitDB
>   - OrbitDB : 
>     - It is a serverless, distributed, P2P kind of database that relies on IPFS pub/sub for data storage and syncing amongst connected peers. This allows peers to either subscribe to new messages on a given topic or publish messages to a specific topic.
>   - Connect IPFS to Node JS through OrbitDb and perform CRUD operations to data. [Reference](https://blog.logrocket.com/guide-to-orbitdb-node-js/)

3. Using Ethereum 
>  - Run Ganache as a local Blockchain Deployment.
>  - Connect truffle package to node to allow JS to communicate with the blockchain.
>  - Use smart contracts in Truffle to allow custom objects to be created on the blockchain.
>  - Code in solidity for making smart contracts for KYC
>    - Smart Contract Structure : {home_bank_code : UE20CS201,encrypted_hash : #######}

## Operations:
1. Fetch Information :
>  - User gives block hash value. 
>  - Search for that block on Blockchain and return encrypted hash value.
>  - User gives *private key*
>  - KYC Documents are fetched from that hash on IPFS using OrbitDB


2. Add Information :
>  - User gives KYC Documents. 
>  - Add documents to IPFS using OrbitDB and return hash.
>  - Encrypt hash and give bank the encrypted hsh value to store on blockchain.
>  - Return the decryption *private key* and the block hash on the blockchain where the hash is stored to the User.


# Reference : 
   - [Tutorial - Youtube](https://www.youtube.com/watch?v=coQ5dg8wM2o&t=2342s)
   - [To-Do List](https://github.com/dappuniversity/eth-todo-list) 
   - [App Tutorial](https://www.dappuniversity.com/articles/blockchain-app-tutorial)
   - [IEEE Paper](https://ieeexplore.ieee.org/document/9230987)
   - [ResearchGate Paper](https://www.researchgate.net/publication/340995551_Smart_KYC_Using_Blockchain_and_IPFS)
   - [KYC - Using IPFC](https://github.com/XinFinOrg/KYC-on-IPFS)
   - [IPFS - Docs](https://docs.ipfs.tech/)

    
