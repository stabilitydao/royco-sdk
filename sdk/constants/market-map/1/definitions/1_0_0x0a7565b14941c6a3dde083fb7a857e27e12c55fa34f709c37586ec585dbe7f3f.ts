import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x0a7565b14941c6a3dde083fb7a857e27e12c55fa34f709c37586ec585dbe7f3f`,
  name: `Supply wETH on Dolomite x Infrared`,
  description: `Supply wETH into the Dolomite money market on Berachain. This asset will earn lending yield and be eligible for potential Infrared incentives.`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],

  external_incentives: [
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.5x";
        return value;
      },
    },
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Dolomite Lending Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],

  native_yield: [
    {
      token_id: "1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6",
      label: "Stargate Incentives",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        const STG_REWARD_AMOUNT = 1249375;
        const LOCK_PERIOD_DAYS = 90;
        let annual_change_ratio = 0;
  
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=stargate-finance&vs_currencies=usd"
          );
          const priceData = await response.json();
          const stgPrice = priceData.stargate.usd;
  
          const totalRewardValueUSD = STG_REWARD_AMOUNT * stgPrice;
          annual_change_ratio = (totalRewardValueUSD / LOCK_PERIOD_DAYS) * (365 / LOCK_PERIOD_DAYS)
  
        } catch (error) {
          console.error("Error fetching STG price:", error);
        }
  
        return annual_change_ratio;
      },
    },
  ],
});
