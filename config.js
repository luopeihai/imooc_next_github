const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";

const github = {
  request_token_url: "https://github.com/login/oauth/access_token",
  client_id: "14f8805ae5e0cc4bca6f",
  client_secret: "74a08cddb7c041c0024d38657888295e9a4a89bf"
};

module.exports = {
  github,
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.client_id}&scope=${SCOPE}`
};
