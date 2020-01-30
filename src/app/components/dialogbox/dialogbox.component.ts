import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

interface DataTransfer {
  id: number;
  name: string;
  username: string;
  email: string;
  address: [];
  phone: string;
  website: string;
  company: [];
  action: string;
}

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})

export class DialogboxComponent implements OnInit {

  action: string;
  dataTransfer: DataTransfer;


  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log(data);
    this.dataTransfer = { ...data };
    this.action = this.dataTransfer.action;
  }

  ngOnInit() {

  }


  doAction() {
    this.dialogRef.close({ event: this.action, data: this.dataTransfer });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
