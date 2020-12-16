import { NgModule } from '@angular/core';
import { PublicacionPipe } from './publicacion.pipe';

@NgModule({
    imports:[],
    declarations: [PublicacionPipe],
    exports: [PublicacionPipe]
})
export class PipesModule { }