function configreAWS() {
    AWS.config.update({
        "region": "us-east-1"
    });
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identity_pool_id
    });
    lexruntime = new AWS.LexRuntime();
    AWS.config.apiVersions = {
        lexruntime: '2016-11-28',
    };
}