import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { DbService } from "./dbService";
import { Theme } from "./theme";

export class ThemeValidator {
    static themeExists(dbService: DbService): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return dbService.getThemeByDescription(control.value)
                .then(theme => {
                    return theme ? { themeExists: true } : null;
                })
                .catch(() => null);
        }
    }

}