import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://lemur-11.cloud-iam.com/auth",
    realm: "nsai",
    clientId: "nsai-front"
});

export default keycloak;