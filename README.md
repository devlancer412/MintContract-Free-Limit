## Staking contract mockup

## Setting up local development

### Pre-requisites

- [Node.js](https://nodejs.org/en/) version 14.0+ and [yarn](https://yarnpkg.com/) for Javascript environment.

1. Clone this repository

```bash
git clone https://github.com/devlancer412/StakingDapp.git
```

2. Install dependencies

```bash
yarn
```

3. Set environment variables on the .env file according to .env.example

```bash
cp .env.example .env
vim .env
```

4. Compile Solidity programs

```bash
yarn compile
```

### Development

- To run hardhat tests

```bash
yarn test:hh
```

- To start local blockchain

```bash
yarn localnode
```

- To run scripts on Rinkeby test

```bash
yarn script:rinkeby ./scripts/....
```

- To run deploy contracts on Rinkeby testnet (uses Hardhat deploy)

```bash
yarn deploy:rinkeby --tags ....
```

- To verify contracts on rinkeby

```bash
yarn verify:rinkeby Staker
```

- To verify contracts on bscscan

```bash
yarn verify:bac Staker
```

- You need to set staking token address and reward token address in etherscan.io or bscscan.com

... see more useful commands in package.json file

## Main Dependencies

Contracts are developed using well-known open-source software for utility libraries and developement tools. You can read more about each of them.

[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)

[Solmate](https://github.com/Rari-Capital/solmate)

[Hardhat](https://github.com/nomiclabs/hardhat)

[hardhat-deploy](https://github.com/wighawag/hardhat-deploy)

[foundry](https://github.com/gakonst/foundry)

[ethers.js](https://github.com/ethers-io/ethers.js/)

[TypeChain](https://github.com/dethcrypto/TypeChain)
