import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorProject } from "../target/types/anchor_project";

describe("example_map", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchorProject as Program<AnchorProject>;

  it("Initialize and set value", async () => {
    const key = new anchor.BN(42);
    const value = new anchor.BN(1337);

    const seeds = [key.toArrayLike(Buffer, "le", 8)];

    let valueAccount = anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )[0];

    console.log("value Account address", valueAccount.toBase58());


    await program.methods.initialize(key).accounts({ val: valueAccount }).rpc();

    // set the account
    await program.methods.set(key, value).accounts({ val: valueAccount }).rpc();

    // read the account back
    let result = await program.account.val.fetch(valueAccount);

    console.log(`the value ${result.value} was stored in ${valueAccount.toBase58()}`);

  });
});