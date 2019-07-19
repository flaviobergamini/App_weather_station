import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';


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
export default class StationPage {

  uid: string;
  taskM;
  taskS;

 /* dados = [
    {nome: 'Station', umidade: '23,444', pluviometro: '544,858', acidez: '234,22', temp: '23,89'},
    {nome: 'Module', umidade: '21,567', pluviometro: '544,858', acidez: '234,22', temp: '23,89'}
  ]; */

  dadosdb = [{}]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public Storage: Storage,
    public db: AngularFireDatabase,
    public http: Http
  ) {
  }

  ionViewDidLoad() {
    this.Storage.get('user')
    .then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
    this.readDataFirebase();
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
  
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

  readDataFirebase(){
    this.http.get('https://chat-9910d.firebaseio.com/tasks.json')
    .map(res => res.json())
    .subscribe(data => {
      this.treatsData(data)
    })
  }

  treatsData(dados){
    this.dadosdb = Object.keys(dados).map(i => dados[i])
    console.log(this.dadosdb)
    console.log('foi')
  }
}
