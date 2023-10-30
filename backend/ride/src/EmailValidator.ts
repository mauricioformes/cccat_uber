export function validate(email: any){
    if(String(email).toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return true;
    } else {
        return false;
    }
    
}