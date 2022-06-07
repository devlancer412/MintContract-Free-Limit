import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Ship } from "../utils";
import { OneFreeMint, OneFreeMint__factory } from "../types";
import { deployments, ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const { expect } = chai;

let ship: Ship;
let nft: OneFreeMint;
let owner: SignerWithAddress;
let wallet: SignerWithAddress;
let alice: SignerWithAddress;
let bob: SignerWithAddress;

const setup = deployments.createFixture(async (hre) => {
  const ship = await Ship.init(hre);
  const { connect, accounts, users } = ship;
  await deployments.fixture(["nft"]);

  const nft = await connect(OneFreeMint__factory);
  return {
    ship,
    nft,
    accounts,
    users,
  };
});

describe("NFT test", () => {
  before(async () => {
    const cache = await setup();
    ship = cache.ship;
    nft = cache.nft;
    alice = cache.accounts.alice;
    bob = cache.accounts.bob;
  });

  it("Alice want to mint 3 NFT", async () => {
    const price = await nft.connect(alice).getPrice(3);
    expect(price).to.eq(ethers.utils.parseEther("0.0069").mul(2));

    await nft.connect(alice).mint(3, { value: price });
    expect(await nft.balanceOf(alice.address)).to.eq(3);
  });

  it("Alice try another mint and he can't free mint", async () => {
    const price = await nft.connect(alice).getPrice(3);
    expect(price).to.eq(ethers.utils.parseEther("0.0069").mul(3));

    await nft.connect(alice).mint(3, { value: price });
    expect(await nft.balanceOf(alice.address)).to.eq(6);
  });

  it("Alice has changable NFT and he can change url", async () => {
    // token id 1 is changable id
    expect(await nft.ownerOf(1)).to.eq(alice.address);

    expect(await nft.tokenURI(1)).to.eq(
      "https://gateway.pinata.cloud/ipfs/QmeHbqX2rgkDPo92n7dw5tTcrebwpuj2MY8FphWo6L94YN/1.json"
    );
    await nft.changeImage(0, "https://21345.json");

    expect(await nft.tokenURI(1)).to.eq("https://21345.json");
  });

  it("Can get changable nft ids", async () => {
    const ids = await nft.getChangableIds();
    console.log(ids);
  });
});
