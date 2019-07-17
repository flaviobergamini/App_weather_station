import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';

@IonicPage({
  name: 'create-user'
})
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {
    registerForm: FormGroup;

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public formbuilder: FormBuilder,
      public afAuth: AngularFireAuth,
      public Alertctrl: AlertController
    ){
      
      this.registerForm = this.formbuilder.group({
        name: [null, [Validators.required, Validators.minLength(5)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(6), ValidateConfirmPassword]] 
      }) 
    }

    submitForm() {
      //console.log(this.registerForm.value);
      this.afAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
      .then((response) => {
        //console.log('Criou usuario');
        this.presentAlert( 'Usuário Cadastrado', 'Usuário cadastrado com sucesso!');
        this.navCtrl.setRoot('station');
      })
      .catch((error) => {
        if(error.code == 'auth/email-already-in-use'){
          //console.log('Erro de Cadastro');
         this.presentAlert('Erro de Cadastro', 'E-mail já cadastrado')
        }
      }) 
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
