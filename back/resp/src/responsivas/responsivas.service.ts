import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/paginatiom.dto';
import { CreateResponsivaDto } from './dto/create-responsiva.dto';
import { UpdateResponsivaDto } from './dto/update-responsiva.dto';
import { Responsiva } from './entities/responsiva.entity';
const PDFDocument = require('pdfkit-table');
import pdf, { CreateOptions } from "html-pdf";
import fs from 'fs';




@Injectable()
export class ResponsivasService {

  async generaPdf(term: string){

    let responsiva: Responsiva

    //Buscar por MongoID
    if ( isValidObjectId( term ) ){
      responsiva = await this.responsivaModel.findById( term );
      
    }

    const puppeteer = require('puppeteer');

    var fs = require('fs');
    // fs.unlinkSync('./result.pdf')
    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    //Get HTML content from HTML file

    var ejs = require('ejs');
    const strCopy = __dirname.split('dist')
    console.log(strCopy)

    var compiled = ejs.compile(fs.readFileSync(strCopy[0] + 'public/plantillas-resp/resp1.html', 'utf8'));
    var html2 = compiled({ fecha: responsiva.fecha, rol: responsiva.rol, usuario: responsiva.usuario, matricula: responsiva.matricula, rfc: responsiva.rfc, nombre: responsiva.nombre, tipo: responsiva.tipoResponsiva  });
    await page.setContent(html2, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    const pdf = await page.pdf({
      path: 'result.pdf',
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'LETTER',
    });    
    // Close the browser instance
    await browser.close();
    return pdf;

  }

  constructor(
    @InjectModel( Responsiva.name )
    private readonly responsivaModel: Model<Responsiva>
  ) {}

  async create(createResponsivaDto: CreateResponsivaDto) {
    try{
      let resp
      resp= null
      //Buscar
      resp = await this.responsivaModel.find({codigo:createResponsivaDto.codigo}).exec();;
      console.log(resp.length)
      if (resp.length==0){
        const responsiva = await this.responsivaModel.create(createResponsivaDto);
        // console.log(createResponsivaDto);
        return responsiva;
      }
      if ( resp.length!=0 ) 
        throw new NotFoundException(`Esta responsiva ya fue creada`);
        return "error";
      } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const { limit =10, offset = 0 , search='' } = paginationDto; 
    let i=0
    console.log(i)
    i++
    return this.responsivaModel.find().sort({_id:-1})
      .limit( limit )
      .skip( offset )
  }

  async findOne(term: string) {

    let responsiva: Responsiva
    let objetos
    //Buscar por MongoID
    if ( isValidObjectId( term ) ){
      responsiva = await this.responsivaModel.findById( term );
    }
    //Buscar por Nombre
    if ( !responsiva ) {
      
      objetos =await this.responsivaModel.find({nombre:{ $regex: '.*' + term + '.*' }});
      console.log(objetos.length)
      if ( objetos.length==0 ) {
        objetos =await this.responsivaModel.find({tipoResponsiva:{ $regex: '.*' + term + '.*' }});
        if ( objetos.length==0 ) {
          objetos =await this.responsivaModel.find({matricula:{ $regex: '.*' + term + '.*' }});
          
          return objetos;
        }
        return objetos;
      }
  
      return objetos;
    }

    if ( !responsiva ) 
    throw new NotFoundException(`Responsiva with id, name or no "${ term }" not found`);

    return responsiva;
  }

  async update(term: string, updateResponsivaDto: UpdateResponsivaDto) {

    let responsiva: Responsiva

    //Buscar por MongoID
    if ( isValidObjectId( term ) ){
      responsiva = await this.responsivaModel.findById( term );
      responsiva.updateOne ( updateResponsivaDto, { new: true })
    }

    return { ...responsiva.toJSON(), ...updateResponsivaDto };
  }

  async remove(id: string) {
    const { deletedCount } = await this.responsivaModel.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Responsiva with id "${ id }" not found`);
  }

  private handleExceptions( error:any ) {
    console.log(error);
    throw new InternalServerErrorException('Can\'t create a responsiva - check server logs');
  }
}
