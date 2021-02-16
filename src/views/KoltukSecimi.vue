<template>
<div>
             <transition name="fade" appear>
      <div class="container mt-5">
        <div class="d-flex justify-content-between">

                <h2>Koltuk Seçimi</h2>

              <transition name="fade">
                <button class="btn btn-success m-0" @click="yolcu_bilgileri_gir" v-if="secilen_koltuklar.length > 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-lines-fill mr-2" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
            </svg>
            <span>Yolcu Bilgilerini Gir</span>
            </button>
             </transition>
          </div>   
              
              <transition name="fade">
             <p v-if="secilen_koltuklar.length > 0">{{ secilen_koltuklar.length }} koltuk seçildi.</p> 
              </transition>
            <br>

             <h6 v-if="getKoltukList('Çiftli', 'Cam Kenarı').length > 0">Çift Koltuklu - Cam Kenarı</h6>
             <div v-else>
                       <h6>Çift Koltuklu - Cam Kenarı</h6>
                       <p class="d-flex justify-content-center">Uygun koltuk bulunamadı.</p>
                  </div>
            <table class="table table-bordered text-center mb-5" style="width: inherit">
                <tr>
                    <td v-for="item in getKoltukList('Çiftli', 'Cam Kenarı')" :key="item.id">
                        <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                                :disabled="item.durum === 1"
                                @click="koltuk_sec(item.id)">
                            {{ item.numara }}
                        </button>
                    </td>
                </tr>
                 </table>


                 <h6 v-if="getKoltukList('Çiftli', 'Koridor').length > 0">Çift Koltuklu - Koridor</h6>
                  <div v-else>
                       <h6>Çift Koltuklu - Koridor</h6>
                       <p class="d-flex justify-content-center">Uygun koltuk bulunamadı.</p>
                  </div>
                <table class="table table-bordered text-center mb-5" style="width: inherit">
                <tr>
                    <td v-for="item in getKoltukList('Çiftli', 'Koridor')" :key="item.id">
                        <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                                :disabled="item.durum === 1"
                                @click="koltuk_sec(item.id)">
                            {{ item.numara }}
                        </button>
                    </td>
                </tr>
                </table>

                <tr>
                    <td colspan="20"></td>
                </tr>
                  <h6 v-if="getKoltukList('Tekli', 'Cam Kenarı').length > 0">Tek Koltuklu - Cam Kenarı</h6> 
                  <div v-else>
                       <h6>Tek Koltuklu - Cam Kenarı</h6>
                       <p class="d-flex justify-content-center">Uygun koltuk bulunamadı.</p>
                  </div>
                <table class="table table-bordered text-center" style="width: inherit">
                <tr>
                    <td v-for="item in getKoltukList('Tekli', 'Cam Kenarı')" :key="item.id">
                        <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                                :disabled="item.durum === 1"
                                @click="koltuk_sec(item.id)">
                            {{ item.numara }}
                        </button>
                    </td>
                </tr>
                </table>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <button class="btn btn-danger" @click="$router.push( {name : 'seferara'} )">İptal Et</button>
                    </div>
                    <div class="d-flex">
                    <img src="../assets/img/koltuk-bos.svg" width="30px" height="30px" alt="">
                    <span class="d-flex align-items-center" style="margin-right: 30px">Uygun</span>
                    <img src="../assets/img/koltuk-dolu.svg" width="30px" height="30px" alt=""> 
                    <span class="d-flex align-items-center" style="margin-left: 5px">Dolu</span>
                    </div>
                    
                </div>
            </div>
             </transition>
            </div>
</template>

<script>

import db from "../assets/db.json";
import { GlobalData } from '../main'

export default {

    data(){
        return {
            seferler : [],
            koltuklar : [],
            bulunan_koltuklar : [],
            secilen_koltuklar : [],
            secilen_sefer : {},
        }
    },

    // Sayfa açıldığında çalışır.
    created(){
        this.seferler = db.seferler;
        this.koltuklar = db.koltuklar;

        this.fetchKoltuklar();
    },

    methods : {
        fetchKoltuklar(){
            let sefer_id;
            if (this.$route.params.sefer_id){
                    sefer_id = parseInt(this.$route.params.sefer_id);
            }
            else if(GlobalData.secilen_sefer != null && GlobalData.secilen_sefer.id)
                sefer_id = parseInt(GlobalData.secilen_sefer.id);
            else 
                this.$router.push( {name : 'seferara'} );
            

           // Route dan gelen id ile seferi bul.  
           this.secilen_sefer = this.seferler.find(x => x.id === sefer_id);

           // Sefer id'ye ait koltukları filtreler
           this.bulunan_koltuklar = this.koltuklar.filter(k => k.sefer_id === sefer_id)
            console.log(this.bulunan_koltuklar);
        },

        // Koltuk tipi ve konumuna göre filtreler
        getKoltukList(tip, konum){
            return this.bulunan_koltuklar.filter(k => k.tip === tip && k.konum === konum);

        },

        koltuk_sec(koltuk_id){

            // Koltuğu bul
            let koltuk = this.bulunan_koltuklar.find(k => k.id === koltuk_id);
            koltuk.durum = koltuk.durum === 0 ? 2 : 0; // koltuk durumu eğer 0 (boş ise) bunu 2 (dolu) yap. 2 ise 0 yap.
            
            if(koltuk.durum === 0 ){
                this.secilen_koltuklar = this.secilen_koltuklar.filter(k => k.id !== koltuk_id) // dizinden koltuk çıkarma (click)
            }
            // Koltuğu seçtiği durum
            else {
                this.secilen_koltuklar.push(koltuk);
            }

        },

        yolcu_bilgileri_gir(){
            GlobalData.secilen_sefer = this.secilen_sefer;
            GlobalData.secilen_koltuklar = this.secilen_koltuklar;
            this.$router.push( {name : 'yolcubilgileri'} );
        }
    },
}
</script>

<style scoped>
.koltuk {
  background: url("../assets/img/koltuk-bos.svg") no-repeat;
  background-size: contain !important;
  display: inline-block;
  width: 56px;
  height: 70px;
  line-height: 70px;
  font-weight: bold;
  text-align: center;
  color: #555;
  border: 0;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 20px;
  padding-right: 5px;
  margin: 5px 5px 5px 3px;
}
.koltuk-rez {
  background: url("../assets/img/koltuk-rez.svg") no-repeat;
  color: #fff !important;
}
.koltuk-dolu {
  background: url("../assets/img/koltuk-dolu.svg") no-repeat;
  color: #fff !important;
  cursor: no-drop;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>