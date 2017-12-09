export function isConfigStillEnabled(config) {
    if('force-enabled' in config && config['force-enabled']) return true;
    
    var before, after;
    if('enable-on' in config) before = config['enable-on'];
    if('disable-on' in config) after = config['disable-on'];

    let now = new Date();
    if(before <= now && after >= now) return true;
    return false;
}