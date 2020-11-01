const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmails = ( emails ) => {
    const invalidEmails = emails.split(',').map(e => e.trim()).filter(e => e.length && !re.test(e))

    if(invalidEmails.length) {
        return `Thes emails are invalid ${invalidEmails}`
    }
    return 
}