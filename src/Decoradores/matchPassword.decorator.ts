import { ValidationArguments, ValidatorConstraint } from "class-validator";



@ValidatorConstraint({ name: 'matchPassword', async: true })
export class MatchPassword {
    validate(password: string, args: ValidationArguments) {
        if (password !== (args.object as any)[args.constraints[0]]) {
            return false;
        }
        return true;   
    }
    defaultMessage(args?: ValidationArguments):string {
        return "El password y la confirmacion no coinciden";
    }
}