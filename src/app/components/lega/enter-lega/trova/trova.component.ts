import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Rose, RoseTeam } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';

@Component({
  selector: 'app-trova',
  templateUrl: './trova.component.html',
  styleUrls: ['./trova.component.scss']
})
export class TrovaComponent implements OnInit {

  idLega!: number

  arrayRoma!: RoseTeam[]
  arrayMilan!: RoseTeam[]
  arrayLazio!: RoseTeam[]
  arrayNapoli!: RoseTeam[]
  arrayInter!: RoseTeam[]
  arrayJuve!: RoseTeam[]
  arrayAtalanta!: RoseTeam[]
  arrayFore!: RoseTeam[]
  arraySassuolo!: RoseTeam[]
  arrayUdine!: RoseTeam[]
  arrayTorino!: RoseTeam[]
  arrayBologna!: RoseTeam[]
  arraySale!: RoseTeam[]
  arrayEmpoli!: RoseTeam[]
  arrayMonza!: RoseTeam[]
  arraySpezia!: RoseTeam[]
  arrayCremonese!: RoseTeam[]
  arraySamp!: RoseTeam[]
  arrayVerona!: RoseTeam[]

  vuoto: any[] = []
  utenti: any[] = []
  utente!: string
  array: any[] = []

  arrayVuoto: any[] = []

  serieA = [492, 489, 496, 487, 505, 497, 494, 502, 502, 488]
  options = {
    headers: {
      'X-RapidAPI-Key': '0bdbd40b81mshff3b7e623d1c230p103862jsn8f8e68750807',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }
  path = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=`

  constructor(private route: ActivatedRoute, private authSrv: AuthService, private roseSrv: RoseService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      // this.trova()
      this.allSerieA()
    })
  }

  back() {
    history.back()
  }

  reload() {
    window.location.reload()
  }

  allSerieA() {
    this.serieA.forEach(el => {
      this.roseSrv.fetchAllSquad().subscribe(res => {
        this.vuoto = res
        return this.http.get<Rose>(this.path + el, this.options).subscribe(nap => {
          this.arrayRoma = nap.response[0].players
          this.authSrv.allUser().subscribe(u => {
            this.vuoto.forEach(v => {
              this.arrayRoma.forEach(r => {
                if (v.legaId == this.idLega) {
                  if (r.id == v.playerId) {
                    u.forEach((user: any) => {
                      if (v.userId == user.id) {
                        r.propietario = user.name
                        let c = this.array.push(r)
                      }
                    })

                  }
                }
              })
            })
          })
          
        })
      })
    console.log(this.array);
    })
  }

  // trova() {
  //   this.roseSrv.fetchAllSquad().subscribe(res => {
  //     this.vuoto = res
  //     this.roseSrv.playerNapoli().subscribe(nap => {
  //       this.arrayRoma = nap.response[0].players
  //       this.authSrv.allUser().subscribe(u => {
  //         this.vuoto.forEach(v => {
  //           this.arrayRoma.forEach(r => {
  //             if (v.legaId == this.idLega) {
  //               if (r.id == v.playerId) {
  //                 u.forEach((user: any) => {
  //                   if (v.userId == user.id) {
  //                     r.propietario = user.name
  //                     let c = this.array.push(r)
  //                   }
  //                 })

  //               }
  //             }
  //           })
  //         })
  //         console.log(this.array);
  //       })
  //     })
  //   })
  // }
}
