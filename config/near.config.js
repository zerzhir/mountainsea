const contractName = 'tongv0.tenk.testnet' // zodiac.tenk.near'

export default function getConfig () {
  let config = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contractName,
    linkGAS: '200000000000000',
    oneGAS: '50000000000000',
    tenGAS: '230000000000000',
    DEFAULT_NEW_ACCOUNT_AMOUNT: '5',
    saleTimestamp: 1641045600000, // 发售时间（包含预售），允许进入购买页面
    preSaleTimestamp: 1641049200000, // 预售截止时间，若发售时间 < 当前时间 < 预售截止时间, 则展示一行预售文字
    contractMethods: {
      changeMethods: ['nft_mint_one', 'nft_mint_many', 'create_linkdrop', 'nft_transfer'],
      viewMethods: [
        'cost_per_token',
        'discount',
        'token_storage_cost',
        'total_cost',
        'nft_supply_for_owner',
        'nft_total_supply',
        'nft_tokens',
        'nft_tokens_for_owner',
        'tokens_left',
        'cost_of_linkdrop',
        'nft_metadata',
        'get_key_balance',
        'check_key'
      ]
    }
  }

  config = {
    ...config
    // networkId: 'mainnet',
    // nodeUrl: 'https://rpc.mainnet.near.org',
    // walletUrl: 'https://wallet.near.org',
    // helperUrl: 'https://helper.mainnet.near.org'
  }

  return config
}
