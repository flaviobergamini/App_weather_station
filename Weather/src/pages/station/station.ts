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

  dadosdb = [{}]     //Acidez no modulo
  dadosdb1 = [{}]    //Umidade no módulo
  dadosdb2 = [{}]     //Umidade na estação
  dadosdb3 = [{}]     //Temperatura na estação
  dadosdb4 = [{}]     //acidez na estação

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
  break1 = 0;
  sendMessageModule(){
    if(this.break1 == 0){
      this.db.database.ref('/tasks/Module').push({
      taskS: 'LM1'
      })
      .then(() => {
        this.taskS = "";
      })
      this.break1 = 1
    }
    else{
      this.db.database.ref('/tasks/Module').push({
        taskS: 'LM0'
      })
      .then(() => {
        this.taskS = "";
      })
      this.break1 = 0
    }
}

  break = 0;
  sendMessageStation(){
    //this.db.database.ref('/tasks').child(this.uid).push({
      if(this.break == 0){
            this.db.database.ref('/tasks/Station').push({
            taskS: 'LS1'
          })
          .then(() => {
            this.taskS = "";
          })
          this.break = 1
      }
      else{
        this.db.database.ref('/tasks/Station').push({
          taskS: 'LS0'
        })
        .then(() => {
          this.taskS = "";
        })
        this.break = 0
      }
    }
      

  getList(){
    let listDB = this.db.database.ref('/tasks').child(this.uid);
    listDB.on('value', (snapshot) => {
      const items = snapshot.val();
      console.log(items);
    })
  }

  readDataFirebase4(){
    try{
      this.http.get('https://chat-9910d.firebaseio.com/tasks/acidez.json')
      .map(res => res.json())
      .subscribe(data4 => {
        this.treatsData4(data4)
      })
    }
    catch(err){
      this.readDataFirebase4()
    }
  }

  treatsData4(dados4){
    try{
      this.dadosdb4 = Object.keys(dados4).map(i => dados4[i])
      console.log(this.dadosdb4)
      console.log('foi')
      this.readDataFirebase()
    }
    catch(err){
      this.readDataFirebase4()
    }
  }

  readDataFirebase3(){
    try{
      this.http.get('https://chat-9910d.firebaseio.com/tasks/temp.json')
      .map(res => res.json())
      .subscribe(data3 => {
        this.treatsData3(data3)
      })
    }
    catch(err){
      this.readDataFirebase3()
    }
  }

  treatsData3(dados3){
    try{
      this.dadosdb3 = Object.keys(dados3).map(i => dados3[i])
      console.log(this.dadosdb3)
      console.log('foi')
      this.readDataFirebase4()
    }
    catch(err){
      this.readDataFirebase3()
    }
  }

  readDataFirebase2(){
    try{
      this.http.get('https://chat-9910d.firebaseio.com/tasks/umidade.json')
      .map(res => res.json())
      .subscribe(data2 => {
        this.treatsData2(data2)
      })
    }
    catch(err){
      this.readDataFirebase2()
    }
  }

  treatsData2(dados2){
    try{
      this.dadosdb2 = Object.keys(dados2).map(i => dados2[i])
      console.log(this.dadosdb2)
      console.log('foi')
      this.readDataFirebase3()
    }
    catch(err){
      this.readDataFirebase2()
    }
  }

  readDataFirebase1(){
    try{
      this.http.get('https://chat-9910d.firebaseio.com/tasks/umidadeM.json')
      .map(res => res.json())
      .subscribe(data1 => {
        this.treatsData1(data1)
      })
    }
    catch(err){
      this.readDataFirebase1()
    }
  }

  treatsData1(dados1){
    try{
      this.dadosdb1 = Object.keys(dados1).map(i => dados1[i])
      console.log(this.dadosdb1)
      console.log('foi')
      this.readDataFirebase2()
    }
    catch(err){
      this.readDataFirebase1()
    }
  }

  readDataFirebase(){
    try{
      this.http.get('https://chat-9910d.firebaseio.com/tasks/acidezM.json')
    .map(res => res.json())
    .subscribe(data => {
      this.treatsData(data)
    })
    }
    catch(err){
      this.readDataFirebase()
    }
    
  }

  treatsData(dados){
    try{
      this.dadosdb = Object.keys(dados).map(i => dados[i])
      console.log(this.dadosdb)
      console.log('foi')
      this.readDataFirebase1()
    }
    catch(err){
      this.readDataFirebase()
    }
  }
}
