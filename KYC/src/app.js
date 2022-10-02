//import fs from 'fs'
//import CryptoJS from 'crypto-js';
//export default CryptoJS;
//export {exec};

App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
     // alert("hello")
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
     
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
   
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.todoList = await App.contracts.TodoList.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)


    // Update loading state
    App.setLoading(false)
  },

  
  createTask: async () => {
    const profileName = $('#inputName').val()
    
    const encryptedHash = $('#encryptedHash').val()
    const homeBank = App.account
    console.log(profileName,encryptedHash, homeBank)
    let result = await App.todoList.createTask(encryptedHash, homeBank, profileName)
    console.log(result)
    document.getElementById('stat').innerHTML=result.logs[0].address
    //window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },
  getVal:()=>{

    const profileName = $('#inputName').val()
    console.log(profileName)
    App.profileName = profileName
  },

  
  cont:async ()=>{
    const flag1 = $('#aadharFlag')
    const flag2 = $('#panFlag')
    const flag3 = $('#billFlag')
    if (!(flag1 && flag2 && flag3)) {console.log(flag1,flag2,flag3)}
    else {
      // Add IPFS to "/home/pooshpal/Documents/KYC_Blockchain/KYC/uploads/" and get hash
      // encrypt hash and get encrypted hash and private key
    App.getVal();
      
    window.location="./newSuccess.html";
    //Document.getElementById('nameFinal').val=$('#inputName').val()}  
    //document.getElementById('nameFinal').innerHTML=App.profileName}
  }},

  plsGet:async() => {
    var trans = $('#tx').val()
    console.log(trans)
    let specificInstance = await App.contracts.TodoList.at(trans);
    const task = await App.TodoList.tasks(0)

    console.log(task[1])
  }

}

App.load()