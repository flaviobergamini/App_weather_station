import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

export class Users{
	email: string;
	senha: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Users = new Users();

	@ViewChild('usuario') email;
	@ViewChild('senha') password;

loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth, 
    public Alertctrl: AlertController,
    public Storage: Storage
    ) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  } 
  entrar(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value,this.password.value)

    .then((response) => {

      this.Storage.set('user',response.user.uid)
      .then(() => {
        this.users.email = this.email.value
        this.users.senha = this.password.value
        this.navCtrl.setRoot('station');
      })
    })

    .catch((error: any) => {
      
      if(error.code == 'auth/wrong-password'){
        this.presentAlert('Erro', 'Senha incorreta, digite novamente.')
        this.loginForm.controls['password'].setValue(null);
      }
    
       if(error.code == 'auth/invalid-email'){
        this.presentAlert('Erro', 'Email inválido!');
      }

       else if(error.code == 'auth/user-disabled'){
        this.presentAlert('Erro', 'Usuário desabilitado');
      }

      else if(error.code == 'auth/user-not-found'){
        this.presentAlert('Erro', 'Usuário não encontrado');
      }
    });
  }
  presentAlert(title: string, subtitle:string) {
    let alert = this.Alertctrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
}

