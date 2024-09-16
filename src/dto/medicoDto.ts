class Medico{
    private _email: string;
    private _nombre: string;
    private _pass: string;

    constructor(
        email:string,
        nombre:string,
        pass:string
    ){
        this._email = email;
        this._nombre = nombre;
        this._pass = pass;
    }

    get email(){
        return this._email;
    }
    get nombre(){
        return this._nombre;
    }
    get pass(){
        return this._pass;
    }

    set email(email:string){
        this._email = email;
    }
    set nombre(nombre:string){
        this._nombre = nombre;
    }
    set pass(pass:string){
        this._pass = pass;
    }
}

export default Medico;