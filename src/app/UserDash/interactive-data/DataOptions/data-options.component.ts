import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { LinkListElementModule } from 'src/app/SharedComponentModules/SmallComponents/LinkList/link-list-element.module';
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
  @Input() edit: any;
  buttonTypes = ['View', 'Edit'];
  LinkList = new LinkList(undefined, []);

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.names.forEach(name => {
      this.buttonTypes.forEach(button => {
        this.LinkList.Data.push(
          new LinkListElement(name, undefined, undefined, { Title: this.title, Type: button}));
      })
    })
    console.log('LOCAL')
    console.log(this.LinkList)
  }

  onView(index: number) {
    this.router.navigate([`${this.type}/${this.data[index].ID}`],
                         { relativeTo: this.route,
                          queryParams: {Action: 'view'} });
  }

  onEdit(index: number) {
    this.router.navigate([`${this.type}/${this.data[index].ID}`],
                         { relativeTo: this.route,
                          queryParams: {Action: 'edit'} });
  }

  onCall(functionName: string, index: number) {
    console.log(functionName)
    switch (functionName) {
      case 'View':
        return this.onView(index);
      case 'Edit':
        return this.onEdit(index);
    }
    console.log('called')
  }
  // onDelete(index: number) {
  //   this.crud.deleteEntry(this.type, index)
  // }
}
