export function isConfigStillEnabled(config) {
    if('enable-type' in config) {
        switch(config['enable-type']) {
            case 'enabled':
                return true;

            case 'enable-until':
                let now = Date.now();
                let til = new Date(config['enable-until']);

                return til - now > 0;

            default:
                return false;
        }
    }

    return true;
}