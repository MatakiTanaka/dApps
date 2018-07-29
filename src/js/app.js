var contract;
var userAccount;

function startApp() {
    //Replace "YOUR_CONTRACT_ADDRESS" with your contract address
    var contractAddress = "xxxxx";
    contract = new web3js.eth.Contract(contractABI, contractAddress);

    var accountInterval = setInterval(function () {
        web3.eth.getAccounts((error, accounts) => {
            if (accounts[0] !== userAccount) {
                userAccount = accounts[0];

            }
        });
    }, 100);

}

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
        // Handle the case where the user doesn't have Metamask installed
        // Probably show them a message prompting them to install Metamask
    }
    // Now you can start your app & access web3 freely:
    startApp()
})


function set() {
    var _num = document.getElementById("num").value;
    contract.methods.set(_num)
        .send({ from: userAccount })
        .on("transactionHash", function (txhash) {
            alert("Txhash: " +  txhash);
        })
        .on("receipt", function (receipt) {
            //Process when transaction is confirmed
            console.log(receipt)
        })
        .on("error", function (error) {
            //Process when transaction is failed
            console.log(error)
        });
}

function get() {
    contract.methods.get().call().then(function(_val){
        alert(_val);
    });
}
