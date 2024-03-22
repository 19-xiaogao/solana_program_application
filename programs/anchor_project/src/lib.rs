use anchor_lang::prelude::*;

declare_id!("9YVEZcFtNkqyNWUNqEchHdVVLBx3rtX7W1E2cuMrwdGd");

#[program]
pub mod anchor_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
