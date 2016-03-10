/// <reference path='../../typings/tsd.d.ts' />

import eventDelegate from './';
import PopTarget from '../PopTarget';
import Trigger from '../Trigger';

describe('EventDelegate', () => {

  describe('- init -', () => {
    it('should addEventListener for click on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
    });

    it('should addEventListener for mouseenter on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), false);
    });

    it('should addEventListener for focusin on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('focusin', jasmine.any(Function), true);
    });

    it('should addEventListener for popgun-manual on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('popgun-manual', jasmine.any(Function), false);
    });

    it('should remove existing event listeners on call', () => {
      spyOn(document, 'removeEventListener');
      eventDelegate.init();
      expect(document.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
      expect(document.removeEventListener).toHaveBeenCalledWith('mouseenter', jasmine.any(Function));
      expect(document.removeEventListener).toHaveBeenCalledWith('focusin', jasmine.any(Function));
      expect(document.removeEventListener).toHaveBeenCalledWith('popgun-manual', jasmine.any(Function));
    });
  });

  describe('listener - ', () => {

    it('should instantiate PopTarget with click when listener passes in click event', () => {
      spyOn(PopTarget, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click');

      let e = {
        type: 'click',
        target: el
      };

      eventDelegate.listener(<any>e);

      expect(PopTarget.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('click')));
    });

    it('should instantiate PopTarget with hover when listener passes in mouseenter event', () => {
      spyOn(PopTarget, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'hover');

      let e = {
        type: 'mouseenter',
        target: el
      };

      eventDelegate.listener(<any>e);

      expect(PopTarget.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('hover')));
    });

    it('should instantiate PopTarget with focus when listener passes in focusin event', () => {
      spyOn(PopTarget, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'focus');

      let e = {
        type: 'focusin',
        target: el
      };

      eventDelegate.listener(<any>e);

      expect(PopTarget.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('focus')));
    });

    it('should instantiate PopTarget with manual when listener passes in mouseenter popgun-manual', () => {
      spyOn(PopTarget, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'manual');

      let e = {
        type: 'popgun-manual',
        target: el
      };

      eventDelegate.listener(<any>e);

      expect(PopTarget.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('manual')));
    });

  });

});