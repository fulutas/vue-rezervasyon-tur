<template>
      <div class="container mt-5">
           <div class="d-flex justify-content-between">
                <h2>Ödeme Bilgileri</h2>
          </div>   
            <form method="post" action="#" @submit.prevent="odeme_yap" class="mt-5">
                <div class="row">
                    <div class="col-2">
                        <label class="mr-2" for="kk_no">Kart No</label>
                        <input type="text" class="form-control" name="kk_no" id="kk_no">
                    </div>
                    <div class="col-2">
                        <label class="mr-2" for="kk_adsoyad">Ad Soyad</label>
                        <input type="text" class="form-control" name="kk_adsoyad" id="kk_adsoyad">
                    </div>
                    <div class="col-2">
                        <label class="mr-2" for="kk_ccv">CCV</label>
                        <input type="text" class="form-control" name="kk_ccv" id="kk_ccv">
                    </div>
                    <div class="col-3">
                        <label class="mr-2" for="kk_skt_ay">Son Kullanma Tarihi (Ay)</label>
                        <input type="text" class="form-control" name="kk_skt_ay" id="kk_skt_ay">
                    </div>
                    <div class="col-3">
                        <label class="mr-2" for="kk_skt_yil">Son Kullanma Tarihi (Yıl)</label>
                        <input type="text" class="form-control" name="kk_skt_yil" id="kk_skt_yil">
                    </div>
                </div>
                 <div class="d-flex justify-content-between mt-3">
                     <p><b>Toplam Tutar : </b> {{ toplam_tutar }} TL</p>
                      <button class="btn btn-success btn-md">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                            </svg>
                          Ödeme Yap</button>
                </div>
            </form>
        </div>
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
    computed : {
        toplam_tutar(){
            return this.secilen_sefer.bilet_fiyati * this.secilen_koltuklar.length;
        }
    },

    methods : {
      odeme_yap(){
          alert("Ödeme alınmıştır.")
          GlobalData.secilen_sefer = null;
          GlobalData.secilen_koltuklar = null;
          this.$router.push( { name : 'seferara'})
      }
    },
}
</script>

<style scoped>

</style>