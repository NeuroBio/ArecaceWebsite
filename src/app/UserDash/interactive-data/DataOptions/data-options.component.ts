import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { DashCRUDService } from '../../dash-CRUD.service';

@Component({
  selector: 'app-data-options',
  templateUrl: './data-options.component.html',
  styleUrls: ['./data-options.component.css']
})

export class DataOptionsComponent implements OnInit {

  @Input() names: string[];
  @Input() title: string;
  @Input() link: string;
  @Input() type: string;
  @Input() data: any;
  @Input() edit: boolean;
  @Input() delete: boolean;
  LinkList: LinkList[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crud: DashCRUDService
  ) { }

  ngOnInit() {
    const buttonTypes = ['View'];
    if (this.edit) {
      buttonTypes.push('Edit');
    }
    if (this.delete) {
      buttonTypes.push('X');
    }

    this.LinkList = [];
    this.names.forEach((name, i) => {
      this.LinkList.push(new LinkList(name, []));
      buttonTypes.forEach(button => {
        this.LinkList[i].Data.push(
          new LinkListElement(name, undefined, undefined,
          { Title: this.title, Type: button, Index: i}));
      });
    });
  }

  onView(index: number) {
    this.router.navigate([ `${this.type}/${this.data[index].ID}` ],
                         { relativeTo: this.route,
                           queryParams: {Action: 'view'} });
  }

  onEdit(index: number) {
    this.router.navigate([ `${this.type}/${this.data[index].ID}` ],
                         { relativeTo: this.route,
                           queryParams: {Action: 'edit'} });
  }

  onDelete(index: number) {
    return this.crud.deleteBookmark(index, this.type);
  }


  onCall(functionName: string, index: number) {
    switch (functionName) {
      case 'View':
        return this.onView(index);
      case 'Edit':
        return this.onEdit(index);
      case 'X':
        return this.onDelete(index);
    }
  }

}
