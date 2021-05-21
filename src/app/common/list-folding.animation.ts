import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

export const listFoldingAnimation = trigger('listFolding', [
  transition('* <=> *', [
    query(':enter',
      [style({height: 0, overflow: 'hidden', opacity: 0}),
        stagger('60ms', animate('600ms ease-out', style({height: '*', overflow: 'inherit', opacity: 1})))],
      {optional: true}
    ),
    query(':leave',
      animate('500ms', style({height: 0, overflow: 'hidden', opacity: 0})),
      {optional: true}
    )
  ])
]);
