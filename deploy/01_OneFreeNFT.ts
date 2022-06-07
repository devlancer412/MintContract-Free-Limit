import { DeployFunction } from "hardhat-deploy/types";
import { OneFreeMint__factory } from "../types";
import { Ship } from "../utils";

const func: DeployFunction = async (hre) => {
  const { deploy, connect, accounts } = await Ship.init(hre);

  const baseUri =
    "https://gateway.pinata.cloud/ipfs/QmeHbqX2rgkDPo92n7dw5tTcrebwpuj2MY8FphWo6L94YN";
  await deploy(OneFreeMint__factory, {
    args: [baseUri],
  });
};

export default func;
func.tags = ["nft"];
