import getConfig from '../../../config/near.config'
import * as nearAPI from 'near-api-js'
import { getWallet, getContract, getPrice } from '@/utils/near-utils'
import { KeyPairEd25519 } from 'near-api-js/lib/utils'
export const { networkId, nodeUrl, walletUrl, contractName, contractMethods } = getConfig()
export const {
  utils: {
    format: { formatNearAmount, parseNearAmount }
  }
} = nearAPI
const linkmatcher =
  networkId === 'mainnet'
    ? /https:\/\/wallet.near.org\/linkdrop\/[^/]+\/(?<key>.+)\?redirectUrl=/
    : /https:\/\/wallet.testnet.near.org\/linkdrop\/[^/]+\/(?<key>.+)\?redirectUrl=/

function getPublicKey (link) {
  try {
    const m = link.match(linkmatcher).groups.key
    return KeyPairEd25519.fromString(m).getPublicKey()
  } catch (err) {}
}

const app = {
  namespaced: true,
  state: {
    app: {
      soldOut: false,
      oneCount: 1,
      manyCount: 10,
      revealMisfits: JSON.parse(localStorage.getItem('revealMisfits')) || {},
      misfitsArray: [],
      linkDropArray: [],
      urlIpfs: '',
      tokensLeft: undefined,
      modalOpen: false
    },
    near: {
      initialized: false
    },
    price: {
      oneNFT: 5,
      manyNFTS: 31.99,
      tokenStorageFormat: 0,
      discountFormat: 0
    },
    wallet: {
      signedIn: false
    },
    account: null,
    contract: null
  },
  mutations: {
    UPDATE_WALLET: (state, value) => {
      state.wallet = value
    },
    UPDATE_ACCOUNT: (state, value) => {
      state.account = value
    },
    UPDATE_APP: (state, value) => {
      state.app = value
    },
    UPDATE_NEAR: (state, value) => {
      state.near = value
    },
    UPDATE_PRICE: (state, value) => {
      state.price = value
    },
    UPDATE_CONTRACT: (state, value) => {
      state.contract = value
    }
  },
  actions: {
    async handleInit ({ commit, state }) {
      try {
        const { near, wallet } = await getWallet()

        const price = await getPrice(near)

        wallet.signIn = successUrl => {
          wallet.requestSignIn({
            successUrl,
            contractId: contractName
          })
        }

        const signOut = wallet.signOut
        wallet.signOut = () => {
          signOut.call(wallet)
          commit('UPDATE_WALLET', {
            ...state.wallet,
            signedIn: false
          })
          commit('UPDATE_ACCOUNT', null)
          localStorage.removeItem('undefined_wallet_auth_key')
          wallet.signedIn = wallet.isSignedIn()
          new nearAPI.keyStores.BrowserLocalStorageKeyStore().clear()
        }

        wallet.signedIn = wallet.isSignedIn()

        let account
        if (wallet.signedIn) {
          account = wallet.account()
          const contract = getContract(account, contractMethods)

          wallet.balance = formatNearAmount((await wallet.account().getAccountBalance()).available, 2)

          commit('UPDATE_WALLET', wallet)
          commit('UPDATE_ACCOUNT', account)
          commit('UPDATE_CONTRACT', contract)
          commit('UPDATE_PRICE', price)
          commit('UPDATE_NEAR', near)

          // take lindDropArray from Local Storage for only that user that connect with near wallet
          let linkDropArray = JSON.parse(localStorage.getItem(`linkDropArray:${account.accountId}`)) || []

          // tokensLeft - count of how many tokens left
          // misfitsArray - NFTs of user
          // {base_uri: urlIpfs} take url for IPFS where NFTs and data stored
          // linkDropArray.map - check is somebody claim your link drop or not

          const [tokensLeft, nftTotalSupply, misfitsArray, { base_uri: urlIpfs }] = await Promise.all([
            contract.tokens_left(),
            contract.nft_total_supply(),
            contract.nft_tokens_for_owner({
              account_id: account.accountId
            }),
            contract.nft_metadata(),
            ...linkDropArray.map(async link => {
              // const public_key = getPublicKey(link.link).toString();
              // link.isUsed = !(await contract.check_key({ public_key }));
              const pubKey = getPublicKey(link.link)
              if (!pubKey) {
                return
              }
              link.isUsed = !(await contract.check_key({ public_key: pubKey.toString() }))
            })
          ])

          // if all tokens buy soldOut will be true
          const soldOut = tokensLeft === 0

          // filter linkDrops that was used
          linkDropArray = linkDropArray.filter(({ isUsed }) => !isUsed)

          // update LocalStorage
          localStorage.setItem(`linkDropArray:${account.accountId}`, JSON.stringify([...linkDropArray]))

          const app = {
            ...state.app,
            misfitsArray,
            urlIpfs: urlIpfs, // 'https://cloudflare-ipfs.com/ipfs/bafybeihkaal3xdox6sj3gpnptxxu27z5w3hp6jcn7fpctfoa4rkvvibcra/',
            linkDropArray,
            soldOut,
            tokensLeft,
            nftTotalSupply
          }

          commit('UPDATE_APP', app)

          return
        }

        commit('UPDATE_WALLET', wallet)
        commit('UPDATE_ACCOUNT', account)
        commit('UPDATE_PRICE', price)
        commit('UPDATE_NEAR', near)
      } catch (e) {
        console.log('error:', e)
      }
    }
  }
}

export default app
