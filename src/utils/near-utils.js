/* eslint-disable */
import * as nearAPI from 'near-api-js'
import getConfig from '../../config/near.config'
import Big from 'big.js'

export const { networkId, nodeUrl, walletUrl, contractName, contractMethods } = getConfig()

export const {
  utils: {
    format: { formatNearAmount, parseNearAmount }
  }
} = nearAPI

export const formatAccountId = (accountId, len = 16) => {
  if (accountId.length > len) {
    return `${accountId.substr(0, len - 3)}...`
  }
  return accountId
}

export const getWallet = async () => {
  const near = await nearAPI.connect({
    networkId,
    nodeUrl,
    walletUrl,
    deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() }
  })
  const wallet = new nearAPI.WalletAccount(near)
  return { near, wallet }
}

export const getContract = (account, methods = contractMethods) => {
  return new nearAPI.Contract(account, contractName, {
    ...methods,
    sender: account.accountId
  })
}

export const getPrice = async (near, account) => {
  const contract = await near.loadContract(contractName, {
    ...contractMethods
  })
  let accountId = 'nobody'
  if (account) {
    accountId = account.accountId
  }

  let [discount, tenTokenCost, tokenStorage, oneTokenCost, costLinkDrop] = await Promise.all([
    contract.discount({
      num: 10
    }),
    contract.total_cost({ num: 10, minter: accountId }),
    contract.token_storage_cost(),
    contract.cost_per_token({ num: 1, minter: accountId }),
    contract.cost_of_linkdrop({ minter: accountId })
  ])

  const discountFormat = formatNearAmount(discount)
  const tokenStorageFormat = formatNearAmount(tokenStorage)

  const oneTokenCostBN = Big(oneTokenCost)
  const tenTokenCostBN = Big(tenTokenCost)
  const storageCostBN = Big(tokenStorage)

  const oneNFTPrice = formatNearAmount(oneTokenCostBN.minus(storageCostBN).toFixed(0))
  const manyNFTsPrice = formatNearAmount(tenTokenCostBN.minus(storageCostBN.mul(Big(10))).toFixed(0))

  const price = {
    oneNFT: oneNFTPrice,
    manyNFTS: manyNFTsPrice,
    tokenStorageFormat,
    discountFormat,
    tenTokenCost,
    oneTokenCost,
    costLinkDrop: costLinkDrop
  }

  return price
}
