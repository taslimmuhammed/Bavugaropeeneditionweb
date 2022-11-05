import React, { useContext, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { Web3Context } from 'utils/Web3Provider'
import { Element } from 'react-scroll'

// material ui core components
import toast from 'react-hot-toast'

// core components

// styles
const MINT_MAX = 20
const MAX_VALUE = 'You can enter up to ' + MINT_MAX.toString()
const INPUT_VALUE = 'You must input quantity'
const WRONG_NETWORK = 'Please connect your wallet to the Ethereum network'
const SUCCESS_CONNECTED = 'Successfully connected to the Ethereum network'
const WAIT_METAMASK = 'Please wait a moment.'
const SUCCESS_BUY = 'Successfully buy'
const NFT_PRICE = 0.05

function limit(string = '', limit = 7) {
  return string.toString().substring(0, limit).replace(/(\.0*|(?<=(\..*))0*)$/, '')
}
const Home = () => {
  const { connectionStatus, notifyLabel, balance, address, walletInstalledStatus, loadWeb3, nftToken } =
    useContext(Web3Context)
  let [quantity, setQuantity] = useState(1)
  let [totalPrice, setTotalPrice] = useState(NFT_PRICE * quantity)
  const [progressStatus, setProgressStatus] = useState(false)
  console.log('my buttton...', connectionStatus)

  const handleClickWallet = async () => {
    if (connectionStatus) {
      toast.success(SUCCESS_CONNECTED)
    } 
    await loadWeb3()
  }

  const handleClickBuy = () => {
    if (quantity === '') {
      toast.error(INPUT_VALUE)
      return
    } else if (quantity > MINT_MAX || quantity < 1) {
      toast.error(MAX_VALUE)
      setQuantity('')
      return
    }
    if (!connectionStatus) {
      toast.error(WRONG_NETWORK)
      return
    }
    toast.success(WAIT_METAMASK)
    setProgressStatus(true)
    nftToken.methods
      .mintNFT(quantity)
      .send({ from: address,gas: 3000000, value: window.web3.utils.toWei((quantity * NFT_PRICE).toString()) })
      .then(data => {
        console.log(data)
        if (data.status) {
          toast.success(SUCCESS_BUY)
          setProgressStatus(false)
          setQuantity('')
        }
      })
  }

  const handleMinusQuantity = event => {
    if (quantity > 1) {
      let tempQuantity = quantity - 1
      setQuantity(tempQuantity)
      setTotalPrice(limit(NFT_PRICE * tempQuantity))
    }
  }
  const handlePlusQuantity = event => {
    if (quantity < MINT_MAX) {
      let tempQuantity = quantity + 1
      setQuantity(tempQuantity)
      setTotalPrice(limit(NFT_PRICE * tempQuantity))
    }
  }
  const handleChangeQuantity = event => {
    const reg = /^\d+$/
    if (event.target.value === '' || reg.test(event.target.value)) {
      setQuantity(event.target.value)
    }
  }

  return (
    <div className="App flex flex-col" style={{ backgroundImage: `url(/assets/img/Img3.png)` }}>
      <div className="center-block flex aic flex-col">
        <div className="row flex aic">
          <div className="row-le"   style={{cursor:"default"}}>Balance</div>
          <div className="row-re flex aic">
            <div className="val"   style={{cursor:"default"}}>{balance} ETH</div>
          </div>
        </div>
        <div className="row flex aic">
          <div className="row-le"   style={{cursor:"default"}}>Quantity</div>
          <div className="row-re flex aic">
            <div className="inc-numb" onClick={handleMinusQuantity}>
              -
            </div>
            <div className="numb"   style={{cursor:"default"}}>{quantity}</div>
            <div className="inc-numb" onClick={handlePlusQuantity}>
              +
            </div>
          </div>
        </div>
        <div className="row flex aic">
          <div className="row-le"   style={{cursor:"default"}}>Price</div>
          <div className="row-re flex aic">
            <div className="val"   style={{cursor:"default"}}>{NFT_PRICE} ETH</div>
          </div>
        </div>
        <div className="row flex aic">
          <div className="row-le"  style={{cursor:"default"}}>Total Price</div>
          <div className="row-re flex aic">
            <div className="val"   style={{cursor:"default"}}>{totalPrice} ETH</div>
          </div>
        </div>
        <div className="action flex aic jc">
          {connectionStatus ? (
            <div className="btn flex aic jc" onClick={handleClickBuy}>
              Mint
            </div>
          ) : (
            <div className="btn flex aic jc" onClick={handleClickWallet} >
              Connect Wallet
            </div>
          )}
          </div>
        </div>
        <div className="twitter flex aic jc">
          <a href="https://twitter.com/bavugar" target="_blank"><img src="./assets/twitter.png" className="ico" /></a>
        </div>
        <div className="contractdiv"><a className="contractlink" href="https://etherscan.io/address/0xE7CA44617C83090EB47347Ad2796dEb04C624517" target="_blank">0xE7CA44617C83090EB47347Ad2796dEb04C624517</a></div>
      </div>
  )
}

export default Home

//({from: web3.eth.accounts[0], gas: 3000000, value: 100}, function(err, res){})