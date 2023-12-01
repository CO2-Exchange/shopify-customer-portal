const fetchWrapper = async (uri, config) => {
    if(!config){
        config = {headers: {'x-nextfil-persona': 'customer'}}
    } else if (config && !config.headers){
        config.headers = {'x-nextfil-persona': 'customer'}
    } else if (config && config.headers && !config.headers['x-nextfil-persona']){
        config.headers['x-nextfil-persona'] = 'customer'
    }

    return await fetch(uri, config)
}

export default fetchWrapper