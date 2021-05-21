import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date();
    date.setTime(value);
    return date.toLocaleTimeString();
  }
}
