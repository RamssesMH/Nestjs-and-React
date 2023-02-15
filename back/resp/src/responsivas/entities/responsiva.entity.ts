import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Responsiva extends Document{

    //id: string  //mongo lo da por defecto
    @Prop({
        index: true,
    })
    matricula: string;
    
    @Prop({
        index: true,
    })
    nombre: string;

    @Prop({
        index: true,
    })
    rfc: string;

    @Prop({
        index: true,
    })
    rol: string;

    @Prop({
        index: true,
    })
    usuario: string;

    @Prop({
        index: true,
    })
    tipoResponsiva: string;

    @Prop({
        index: true,
    })
    fecha: string;

    @Prop({
        unique: true,
        index: true,
    })
    codigo: string;
}


export const ResponsivasSchema = SchemaFactory.createForClass( Responsiva );