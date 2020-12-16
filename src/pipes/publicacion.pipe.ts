import {Pipe, PipeTransform} from '@angular/core';



@Pipe(
    {
        name: 'publicacion'
    }
)

export class PublicacionPipe implements PipeTransform {
    constructor(){}

    public transform(value , Palabra: string) {
        if (!value) {return; }
        if (!Palabra) {return value; }
        if (Palabra === '') { return value; }
        let busqueda = String(Palabra);
        busqueda = busqueda.toLocaleUpperCase();
        return value.filter( (item) => {
            return JSON.stringify(String(item.data.titulopub)).toLocaleUpperCase().includes(String(busqueda));
        } )
    }
}