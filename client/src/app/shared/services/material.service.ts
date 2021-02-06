import { ElementRef } from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface  MaterialDatepicker extends  MaterialInstance {
  date?: Date;
}

export class MaterialService {
  static toast(message) {
    M.toast({html: message});
  }

  static initFloatingBtn(ref: ElementRef<HTMLDivElement>): void {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextFields(): void {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef<HTMLDivElement>): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }

  static initTooltip(ref: ElementRef<HTMLButtonElement>): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static  initDatepicker(ref: ElementRef<HTMLInputElement>, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    });
  }

  static initTapTarget(ref: ElementRef<HTMLDivElement>): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement);
  }
}
