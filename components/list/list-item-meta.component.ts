/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import {
  NzListItemMetaAvatarComponent,
  NzListItemMetaDescriptionComponent,
  NzListItemMetaDescriptionComponent as DescriptionComponent,
  NzListItemMetaTitleComponent,
  NzListItemMetaTitleComponent as TitleComponent
} from './list-item-meta-cell';

@Component({
  selector: 'nz-list-item-meta, [nz-list-item-meta]',
  exportAs: 'nzListItemMeta',
  template: `
    <!--Old API Start-->
    <nz-list-item-meta-avatar *ngIf="avatarStr" [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    <nz-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </nz-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    <div *ngIf="nzTitle || nzDescription || descriptionComponent || titleComponent" class="ant-list-item-meta-content">
      <!--Old API Start-->
      <nz-list-item-meta-title *ngIf="nzTitle && !titleComponent">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </nz-list-item-meta-title>
      <nz-list-item-meta-description *ngIf="nzDescription && !descriptionComponent">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </nz-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="nz-list-item-meta-title"></ng-content>
      <ng-content select="nz-list-item-meta-description"></ng-content>
    </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-list-item-meta'
  },
  imports: [
    NzListItemMetaAvatarComponent,
    NgIf,
    NgTemplateOutlet,
    NzListItemMetaTitleComponent,
    NzOutletModule,
    NzListItemMetaDescriptionComponent
  ],
  standalone: true
})
export class NzListItemMetaComponent {
  avatarStr = '';
  avatarTpl?: TemplateRef<void>;

  @Input()
  set nzAvatar(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.avatarStr = '';
      this.avatarTpl = value;
    } else {
      this.avatarStr = value;
    }
  }

  @Input() nzTitle?: string | TemplateRef<void>;

  @Input() nzDescription?: string | TemplateRef<void>;

  @ContentChild(DescriptionComponent) descriptionComponent?: DescriptionComponent;
  @ContentChild(TitleComponent) titleComponent?: TitleComponent;

  constructor(public elementRef: ElementRef) {}
}
