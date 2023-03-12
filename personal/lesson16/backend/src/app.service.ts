/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';

const CONTRACT_ADDRESS = "0x501761b004AA21C8045b00E54925e855D553e83b";

@Injectable()
export class AppService {
  
 

 
  provider: ethers.providers.Provider;
  contract: ethers.Contract;

constructor(){
   this.provider = ethers.getDefaultProvider('goerli');
   this.contract = new ethers.Contract(
    CONTRACT_ADDRESS,tokenJson.abi,this.provider
  );

}


  async getTotalSupply(): Promise<number> {

    const totalSupplyBN = await this.contract.totalSupply();
    const totalSupplyString =  ethers.utils.formatEther(totalSupplyBN);
    const totalSupply = parseFloat(totalSupplyString);
    return totalSupply;
  }

  async getAllowance(from:string, to:string): Promise<number> {

    const allowanceBN = await this.contract.allowance(from,to);
    const allowanceString =  ethers.utils.formatEther(allowanceBN);
    const allowanceNumber = parseFloat(allowanceString);
    return allowanceNumber;
  }

  async getTransactionStatus(hash: string): Promise<string> {
    const tx = await this.provider.getTransaction(hash);
    const txReceipt = await tx.wait();
    return txReceipt.status == 1?"completed":"pending";
  }

  getContractAddress(): string {
    return this.contract.address;
  }
  getHello(): string {
    return 'Hello World!';
  }


  requestTokens(address: string, amount: number) {
    //TODO 
    //load private key from .env using env config module
    //create signer
    //connect signer to contract
    //call mint function
    //return tx hash

    return "txhash";
  }
}
