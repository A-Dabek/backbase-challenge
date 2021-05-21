import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date();
    date.setTime(value * 1000);
    return date.toTimeString();
  }
}
