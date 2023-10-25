import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailEhUnicoAqui } from "../validacao/email-eh-unico.validator";


export class CriaUsuarioDto {

    @IsNotEmpty({ message: "O nome não pode ser vazio" })
    nome: string;

    @IsEmail(undefined, { message: "O email informado é invalido" })
    @EmailEhUnicoAqui({  message: 'Já existe um usario com esse email' })
    email: string;

    @MinLength(6, { message: "A senha deve conter pelo menos 6 caracteres" })
    senha: string;
}