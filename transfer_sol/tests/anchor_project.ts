import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorProject } from "../target/types/anchor_project";

describe("example_map", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchorProject as Program<AnchorProject>;


  async function printAccountBalance(account) {
    const balance = await anchor.getProvider().connection.getBalance(account);
    console.log(`${account} has ${balance / anchor.web3.LAMPORTS_PER_SOL} SOL`);
  }

  it("Transmit SOL", async () => {

    await printAccountBalance(anchor.getProvider().publicKey)
    
    // generate a new wallet
    const recipient = anchor.web3.Keypair.generate();

    await printAccountBalance(recipient.publicKey);

    // send the account 1 SOL via the program
    let amount = new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL);
    await program.methods.sendSol(amount)
      .accounts({ recipient: recipient.publicKey })
      .rpc();


    await printAccountBalance(recipient.publicKey);
    await printAccountBalance(anchor.getProvider().publicKey)

  });

  // it("Initialize and set value", async () => {
  //   const key = new anchor.BN(42);
  //   const value = new anchor.BN(1337);

  //   const seeds = [key.toArrayLike(Buffer, "le", 8)];

  //   let valueAccount = anchor.web3.PublicKey.findProgramAddressSync(
  //     seeds,
  //     program.programId,
  //   )[0];

  //   console.log("value Account address", valueAccount.toBase58());


  //   await program.methods.initialize(key).accounts({ val: valueAccount }).rpc();

  //   // set the account
  //   await program.methods.set(key, value).accounts({ val: valueAccount }).rpc();

  //   // read the account back
  //   let result = await program.account.val.fetch(valueAccount);

  //   console.log(`the value ${result.value} was stored in ${valueAccount.toBase58()}`);

  // });
});