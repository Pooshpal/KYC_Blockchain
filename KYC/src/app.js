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

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const encryptedHash = task[1]
      const homeBank = task[2]
      const profileName = task[3]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.encryptedHash').html(encryptedHash)
      $newTaskTemplate.find('.profileName').html(profileName)
      $newTaskTemplate.find('.homeBank').html(App.account)
      $newTaskTemplate.find('.id').html(taskId)
      // console.log(web3.eth.getTransaction('0x6c3a50003b3e96d2b98ed862510bd3f988f0830843368eb2c4bfc4f7f335ac4c'))
      // var tx = web3.eth.getTransaction('0x6c3a50003b3e96d2b98ed862510bd3f988f0830843368eb2c4bfc4f7f335ac4c', function(err, transactionHash) {
      //   if (!err)
      //     console.log(transactionHash); 
      // })
      // console.log(tx)
      // var accounts = web3.eth.getAccounts();
      // console.log(accounts);
                      // .on('click', App.toggleCompleted)

      $('#taskList').append($newTaskTemplate)
      
      // Show the task
      $newTaskTemplate.show()
    }
  },
  createTask: async () => {
    App.setLoading(true)
    const profileName = $('#profileName').val()
    const encryptedHash = $('#encryptedHash').val()
    const homeBank = App.account
    console.log(homeBank)
    let result = await App.todoList.createTask(encryptedHash, homeBank, profileName)
    // console.log(result)
    window.location.reload()
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
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})