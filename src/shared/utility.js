export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    };
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(!rules){
        return true;
    }
    if( rules.required){
        isValid= value.trim()!== ''&& isValid;
    }

    if(rules.minlength){
        isValid= value.length>= rules.minlength && isValid;
    }

    if(rules.maxlength){
        isValid = value.length<= rules.maxlength && isValid;
    }

    if(rules.isEmail){
        const pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        isValid = pattern.test(value) && isValid;
    }

    if(rules.isNumber){
        const numPattern = /^([0-9]+)$/;
        isValid = numPattern.test(value) && isValid;
    }

    return isValid;
}