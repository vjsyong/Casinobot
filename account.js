class Account {
    constructor(bearer, credit){
        this.bearer = bearer;
        this.credit = credit;
    }

    addCredits(amount){
        this.credit += amount;
        return this.credit;
    }

    deductCredits(amount){
        this.credit += amount;
        return this.credit;
    }

    setCredit(newCredit){
        this.credit = newCredit;
        return this.credit;
    }

    getCredit(){
        return this.credit;
    
    }
    getBearer(){
        return this.bearer;
    }
}

module.exports = Account;