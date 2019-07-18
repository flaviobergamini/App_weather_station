import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the StationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'station'
})
@Component({
  selector: 'page-station',
  templateUrl: 'station.html',
})
export class StationPage {

  uid: string;
  taskM;
  taskS;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public Storage: Storage,
    public db: AngularFireDatabase
  ) {
  }

  ionViewDidLoad() {
    this.Storage.get('user')
    .then((resolve) => {
      this.uid = resolve;
      this.getList();
      //console.log(resolve);
    })
  }
  
  sendMessageModule(){
    this.db.database.ref('/tasks').child(this.uid).push({
      taskM: 'ligarM'
    })
    .then(() => {
      this.taskM = "";
    })
  }

  sendMessageStation(){
    this.db.database.ref('/tasks').child(this.uid).push({
      taskS: 'ligarS'
    })
    .then(() => {
      this.taskS = "";
    })
  }

  getList(){
    let listDB = this.db.database.ref('/tasks').child(this.uid);
    listDB.on('value', (snapshot) => {
      const items = snapshot.val();
      console.log(items);
    })
  }
}
