<template>
             <transition name="fade" appear>
      <div class="container mt-5">
                 <div class="d-flex justify-content-between">
                <h2>Yolcu Bilgileri</h2>
                <button class="btn btn-success ml-0" @click="odeme_bilgileri">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                </svg>
                <span class="ml-1">Ödeme Bilgilerini Gir</span>
                </button>
          </div>   
            <form method="post" action="#" @submit.prevent="odeme_bilgileri" class="mt-5">
                <div v-for="item in secilen_koltuklar" :key="item.id" class="form-inline mb-2">
                    <label class="mr-2" for="koltuk">Koltuk Numarası</label>
                    <input type="text" class="form-control col-1 mr-3" v-model="item.numara" id="koltuk" readonly>
                    <label class="mr-2" for="fiyat">Fiyat</label>
                    <input type="text" class="form-control col-1 mr-3" v-model="secilen_sefer.bilet_fiyati" id="fiyat" readonly>
                    <label class="mr-2" for="tck">TCK</label>
                    <input type="text" class="form-control col-2 mr-3" name="tck" id="tck">
                    <label class="mr-2" for="adsoyad">Ad Soyad</label>
                    <input type="text" class="form-control col-1 mr-3" name="adsoyad" id="adsoyad">
                    <label class="mr-2" for="cinsiyet">Cinsiyet</label>
                    <input type="text" class="form-control col-1" name="cinsiyet" id="cinsiyet">
                </div>
            </form>
        </div>
             </transition>
</template>

<script>

import { GlobalData } from '../main'

export default {

    data(){
        return {
           secilen_sefer : {},
           secilen_koltuklar : [],
        }
    },

    // Sayfa açıldığında 
    created(){
        // Sefer yok ise seferara ekranına yönlendir.
       if(GlobalData.secilen_sefer === null){
           this.$router.push( {name : 'seferara'} );
       }

        this.secilen_sefer = GlobalData.secilen_sefer;
        this.secilen_koltuklar = GlobalData.secilen_koltuklar;
    },

    methods : {
      odeme_bilgileri(){
         this.$router.push( {name : 'odemebilgileri'} );
      }
    },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>