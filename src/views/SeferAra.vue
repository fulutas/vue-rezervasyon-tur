<template>
  <div class="container mt-5">
          <h2>Hareket Noktaları</h2>
        <form @submit.prevent="sefer_ara">
        <hr>
            <div class="form-row align-items-center">
                <div class="col-sm-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    <label class="ml-1">Kalkış Noktası</label>
                    <select class="form-control" v-model="kalkis_noktasi" id="kalkis">
                        <option value="">Seçiniz</option>
                        <option v-for="item in hareket_noktalari" :value="item.id" v-text="item.aciklama" :key="item.id" ></option>
                    </select>
                </div>
                <div class="col-sm-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg> 
                    <label class="ml-1">Varış Noktası</label>
                    <select class="form-control" v-model="varis_noktasi" id="varis">
                        <option value="">Seçiniz</option>
                        <option v-for="item in hareket_noktalari" :value="item.id" v-text="item.aciklama" :key="item.id" ></option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    <label class="ml-2">Gidiş Tarihi</label>
                    <input type="date" class="form-control" v-model="gidis_tarihi">
                </div>
                <div class="col-auto">
                    <label>&nbsp;</label>
                    <button type="submit" class="btn btn-warning btn-block">
                        Bilet Ara
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                        </button>  
                </div>
            </div>
        </form>

         <div class="message-alert mt-3">
         <div v-if="isLoading">Seferler Yükleniyor...</div>
         <div> {{ mesaj }}</div>
         </div>

          <transition name="fade">
        <div v-if="bulunan_seferler.length">
            <br>
                <h2>Sefer Listesi</h2>
            <p> {{ bulunan_seferler.length }} sonuç bulundu. </p>
            <table class="table table-hover">
                <tr v-for="(item, index) in bulunan_seferler" :key="index">
                    <td>Kalkış Tarihi
                        <h4>{{ getTarih(item.kalkis_tarihi) }}</h4>
                    </td>
                    <td>Kalkış Saati
                        <h4>{{ getSaat(item.kalkis_tarihi) }}</h4>
                    </td>
                    <td>Kalkış Noktası
                        <h4>{{ kalkis_noktasi }}</h4>
                    </td>
                    <td>Varış Noktası
                        <h4>{{ varis_noktasi }}</h4>
                    </td>
                    <td>Bilet Fiyatı
                        <h4>{{ item.bilet_fiyati }} ₺</h4>
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm" @click="sefer_sec(item.id)">Koltuk Seç</button>
                    </td>
                </tr>
            </table>
        </div>
          </transition>

    </div>
</template>

<script>

import db from "../assets/db.json";

export default {
  name: "AramaFormu",
  props: {

  },

  data(){
      return {
          kalkis_noktasi : '',
          varis_noktasi : '',
          gidis_tarihi : '' ,
          hareket_noktalari : [],
          seferler : [],
          bulunan_seferler: [],
          isLoading : false,
          mesaj : '',   
      }

  },

  created(){
      this.hareket_noktalari = db.hareket_noktalari;
      this.seferler = db.seferler;
  },

  methods : {
      sefer_ara(){

          this.isLoading = true;

          // Sefer arama  
          this.bulunan_seferler = this.seferler.filter(x =>
              x.kalkis_noktasi === this.kalkis_noktasi && 
              x.varis_noktasi === this.varis_noktasi &&
              this.getTarih(x.kalkis_tarihi) ===  this.getTarih(this.gidis_tarihi)
              );

            console.log(this.bulunan_seferler)
           // Sefer kaydı yoksa.. 
           if(this.bulunan_seferler.length === 0){
               this.mesaj = "Sonuç bulunamadı."
           } else {
               this.mesaj = ""
           }

           this.isLoading = false;
      },

      getTarih(val){
          var tarihsaat = new Date(val);
          var tarih = tarihsaat.getFullYear() + '-' + 
          ('0' + tarihsaat.getMonth()).slice(-2) + '-' +
          ('0' + tarihsaat.getDate()).slice(-2);

          return tarih;
      },

      getSaat(val){
          var tarihsaat = new Date(val);
          var saat = ('0' + tarihsaat.getHours()).slice(-2) + '-' +
          ('0' + tarihsaat.getMinutes()).slice(-2);
          
          return saat;
      },

      sefer_sec(sefer_id) {
      this.$router.push({ name: "koltuksecimi", params: { sefer_id } });
    },
  },

}

</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
