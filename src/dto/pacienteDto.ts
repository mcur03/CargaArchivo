class Paciente{
    private _nombre:string;
    private _apellido:string;
    private _edad:string;
    private _tipoSangre:string;
    private _enfermedades:string;
    private _alergias:string;

    constructor(
        nombre:string,
        apellido:string,
        edad:string,
        tipoSangre:string,
        enfermedades:string,
        alergias:string
    ){
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
        this._tipoSangre = tipoSangre;
        this._enfermedades = enfermedades;
        this._alergias = alergias;
    }

    get nombre(){
        return this._nombre;
    }
    get apellido(){
        return this._apellido;
    }
    get edad(){
        return this._edad;
    }
    get tipoSangre(){
        return this._tipoSangre;
    }
    get enfermedades(){
        return this._enfermedades;
    }
    get alergias(){
        return this._alergias;
    }

    set nombre(nombre:string){
        this._nombre = nombre;
    }
    set apellido(apellido:string){
        this._apellido = apellido;
    }
    set edad(edad:string){
        this._edad = edad;
    }
    set tipoSangre(tipoSangre:string){
        this._tipoSangre = tipoSangre;
    }
    set enfermedades(enfermedades:string){
        this._enfermedades = enfermedades;
    }
    set alergias(alergias:string){
        this._alergias = alergias;
    }
}

export default Paciente;