use anchor_lang::prelude::*;
use std::mem::size_of;
declare_id!("86vnDcApQeFMx8i4vKt2pRQHWb7ZtbLL1ppRxP1hcWdu");

#[program]
pub mod anchor_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, key: u64) -> Result<()> {
        Ok(())
    }
    pub fn set(ctx: Context<Set>, key: u64, val: u64) -> Result<()> {
        ctx.accounts.val.value = val;
        Ok(())
    }
}

// 通过程序派生出来的账户
#[derive(Accounts)]
#[instruction(key: u64)]
pub struct Initialize<'info> {
    #[account(init,
              payer = signer,
              space = size_of::<Val>() + 8,
              // 用来推断地址
              seeds=[&key.to_le_bytes().as_ref()],
              bump)]
    val: Account<'info, Val>,

    #[account(mut)]
    signer: Signer<'info>,

    system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(key: u64)]
pub struct Set<'info> {
    #[account(mut)]
    val: Account<'info, Val>,
}

#[account]
pub struct Val {
    value: u64,
}
