import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';


export const animations: any[] = [
  trigger('hoverAnimation', [
    state('true', style({
      transform: 'scale(1.4) translate(0px, -70px)',
      zIndex: 4000
    })),
    state('false', style({
      transform: 'scale(1.0)'
    })),
  ]),
  trigger('coolDownAnimation', [
    state('false', style ({ animationName: 'notOnCoolDown', animationDuration: '6s', animationIterationCount: 'infinite'}))
  ]),
  trigger('playCardAnimation', [
    transition('* => true', [
      animate(300, keyframes([
        style({offset: 0, transform: 'scale(1.5)', filter: 'blur(2px)'}),
        style({offset: 0.5, transform: 'scale(1.3)', filter: 'blur(1px)'}),
        style({offset: 1, transform: 'scale(1.0)'})
      ]))
    ]),
  ]),
  trigger('pullCardAnimation', [
    transition('* => true', [
      style({transform: 'translateX(800%)'}),
      animate(1000)
    ])
  ]),
  trigger('selectedCardAnimation', [
    state('true', style ({
      transform: 'scale(1.2)',
      zIndex: 4000}))
  ]),
  trigger('attackCardAnimation', [
    transition('* => true', [
      style({ transform: 'translateY(-180px)'}),
      animate(250)
    ])
  ]),
  trigger('attackPlayerAnimation', [
    transition('* => true', [
      style({ transform: 'translateY(-360px)'}),
      animate(250)
    ])
  ])
];
