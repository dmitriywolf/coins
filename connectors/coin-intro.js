export const coinIntroConnector = (data) => {
  return {
    name: data?.name,
    categories: data?.categories,
    algorith: data?.hashing_algorithm,
    genesis: data?.genesis_date,
    image: data?.image.small,
    rank: data?.market_cap_rank,
    symbol: data?.symbol,
    community: {
      facebook: data?.community_data?.facebook_likes,
      reddit_posts: data?.community_data?.reddit_average_posts_48h,
      twitter: data?.community_data?.twitter_followers,
    },
  };
};
