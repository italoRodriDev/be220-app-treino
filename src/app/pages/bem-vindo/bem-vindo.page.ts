import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.page.html',
  styleUrls: ['./bem-vindo.page.scss'],
})
export class BemVindoPage implements OnInit {
  images = [
    'IMG_5619.webp',
    'IMG_5623.webp',
    'IMG_5632.webp',
    'IMG_5633.webp',
    'IMG_5636.webp',
    'IMG_5641.webp',
  ];

  fisiculturismo: Array<{
    name: string;
    text: string;
    img: string;
    site: string;
  }> = [
    {
      name: 'Marizete Oliveira',
      text: 'Campeã JAMPA LEGENDS Categoria Wellness Master',
      img: 'IMG_8530.jpg',
      site: '@marioliveira9502',
    },
    {
      name: 'Isaias Franca',
      text: '2º Lugar Pantera Classic Brasil Categoria Mens Physique Juvenil',
      img: 'IMG_8531.jpeg',
      site: '@isaiasfraa',
    },
    {
      name: 'Isaias Franca',
      text: 'Campeão Mens Physique e Classic Physique Juvenil',
      img: 'IMG_8532.jpeg',
      site: '@isaiasfraa',
    },
    {
      name: 'Isaias Franca',
      text: '3º Lugar estreantes - Campeonato Jampa Fitness - Mens Physique',
      img: 'IMG_8533.jpeg',
      site: '@arthurpb__',
    },
  ];

  bjj: Array<{ name: string; text: string; img: string; site: string }> = [
    {
      name: 'Renata Salles',
      text: 'Campeã Categoria e Absoluto - Copa Romanos',
      img: 'IMG_6270.PNG',
      site: '@renattasallesbjj',
    },
    {
      name: 'Renata Salles',
      text: 'Campeã Gi e No-Gi (categoria) | Campeã Absoluto No-Gi | Vice-campeã Absoluto - Salvador Open International CBJJ',
      img: 'IMG_6269.PNG',
      site: '@renattasallesbjj',
    },
    {
      name: 'Renata Salles',
      text: 'Vice-campeã Categoria e Campeã Absoluto - Salvador Open International CBJJ',
      img: 'IMG_6269.PNG',
      site: '@renattasallesbjj',
    },
    {
      name: 'Renata Salles',
      text: 'Campeã Nacional da CBJJE',
      img: 'IMG_6263.PNG',
      site: '@renattasallesbjj',
    },
    {
      name: 'Lucas Ferreira',
      text: 'Campeão Nacional da CBJJE',
      img: 'IMG_8519.jpg',
      site: '@lucasferreira.bjj',
    },
    {
      name: 'Lucas Ferreira',
      text: 'Campeão do Open Internacional IBJJF/CBJJ - Fortaleza',
      img: 'IMG_3001.jpg',
      site: '@lucasferreira.bjj',
    },
  ];

  voleiPraia: Array<{ name: string; text: string; img: string; site: string }> =
    [
      {
        name: 'Alessandro Franca',
        text: 'Campeão Copa Paraibana Sub-17',
        img: 'IMG_8526.jpeg',
        site: '@sandro1__',
      },
      {
        name: 'Alessandro Franca',
        text: 'Campeão JEPB de Praia',
        img: 'IMG_8527.jpeg',
        site: '@sandro1__',
      },
      {
        name: 'Alessandro Franca',
        text: '1° Lugar Sub-19 - Etapa do Paraibano',
        img: 'IMG_8529.jpeg',
        site: '@sandro1__',
      },
    ];

  corrida: Array<{ name: string; text: string; img: string; site: string }> = [
    {
      name: 'Leonardo Santino',
      text: '1° Lugar Geral Masculino - 5km (MU&1C RUN Etapa Forró)',
      img: 'IMG_8521.jpeg',
      site: '@leonardosantino_santi',
    },
    {
      name: 'Leonardo Santino',
      text: 'Campeão 10km - Extrema Oriental 2025',
      img: 'IMG_8520.jpeg',
      site: '@leonardosantino_santi',
    },
    {
      name: 'Leonardo Santino',
      text: 'Campeão 5km - Corrida Night Run',
      img: 'IMG_8522.jpeg',
      site: '@leonardosantino_santi',
    },
    {
      name: 'Leonardo Santino',
      text: 'Campeão 6km - Corrida dos Parques',
      img: 'IMG_8523.jpeg',
      site: '@leonardosantino_santi',
    },
    {
      name: 'Thiago Fernandes',
      text: 'VIOLETA RUN 1º lugar geral dos 10km',
      img: 'IMG_8534.jpeg',
      site: '@thiagofernandespb',
    },
    {
      name: 'Thiago Fernandes',
      text: '2° Lugar 10km - Circuito Music Run',
      img: 'IMG_8524.jpeg',
      site: '@thiagofernandespb',
    },
    {
      name: 'Thiago Fernandes',
      text: '2° Lugar 10km - Corrida do Fogo',
      img: 'IMG_8525.jpeg',
      site: '@thiagofernandespb',
    },
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  onClickContact() {
    window.open(
      'https://wa.me/5583986409821?text=Ol%C3%A1%20Vanderson%2C%20Peguei%20seu%20contato%20no%20site.',
      '__blank'
    );
  }

  onClickCreateTraining() {
    this.navCtrl.navigateForward('intro');
  }
}
