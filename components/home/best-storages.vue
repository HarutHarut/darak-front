<template>
    <section class="best-storages py-4 py-lg-5">
        <b-container>
            <h2 class="title-secondary text-center">{{ $t("title.bestStorages") }}</h2>
            <b-row>
                <b-col>
                    <div class="best-storages-box">
                        <div class="storage-card"  v-for="(bestStorageCard, index) in bestStorageCards" v-bind:key="index">
                            <NuxtLink :to="`/lockers/${bestStorageCard.id}`" class="storage-card-box card-overlay">
                                <img :src="require('@/assets/img/' + bestStorageCard.imgSrc)" alt="" />

                                <span class="storage-card-description">
                                    <span class="title-tertiary d-block">{{bestStorageCard.title}}</span>
                                    <span class="place-address d-flex align-items-center">
                                        <svg-icon class="sm-icon" name="location" />
                                        <span>{{bestStorageCard.address}}</span>
                                    </span>
                                    <span class="place-price d-block">{{bestStorageCard.price}}</span>
                                    <span class="place-rating d-flex align-items-center">
                                        <span class="rating-review">{{bestStorageCard.ratingCount}}</span>
                                        <span class="rating-stars d-flex">
                                            <svg-icon class="sm-icon star-full" name="star-solid" v-for="starFull in bestStorageCard.stars" v-bind:key="starFull.index" />
                                            <svg-icon class="sm-icon star" name="star-regular" v-for="star in 5 - bestStorageCard.stars" v-bind:key="star.index" />
                                        </span>
                                        <span class="rating-text">{{bestStorageCard.ratingText}}</span>
                                    </span>
                                </span>

                                <span class="card-location-text d-flex align-items-center">
                                    <span class="text-uppercase">{{bestStorageCard.location}}</span>
                                </span>
                                
                                <span class="type-box">
                                    <span class="type-box-inner">
                                        <span class="type-box-body type-box-front">
                                            <svg-icon class="md-icon" name="location-find" />
                                        </span>
                                        <span class="type-box-body type-box-back"></span>
                                    </span>
                                </span>
                            </NuxtLink>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
 
  export default {
   
  data: function() {
    return {
        bestStorageCards: [
            {
                id: 1,
                imgSrc: "storage-card/01.jpeg",
                title: "NOTEBOOKMALL",
                address: "9 Tumanyan Street, Yerevan, Armenia",
                price: "0.92 EUR",
                ratingCount: "0/5",
                ratingText: "No reviews yet",
                location: "Erevan",
                stars: 2
            },

            {
                id: 2,
                imgSrc: "storage-card/02.jpeg",
                title: "NOTEBOOKMALL",
                address: "9 Tumanyan Street, Yerevan, Armenia",
                price: "0.92 EUR",
                ratingCount: "0/5",
                ratingText: "No reviews yet",
                location: "Erevan",
                stars: 2
            },

            {
                id: 3,
                imgSrc: "storage-card/03.jpeg",
                title: "NOTEBOOKMALL",
                address: "9 Tumanyan Street, Yerevan, Armenia",
                price: "0.92 EUR",
                ratingCount: "0/5",
                ratingText: "No reviews yet",
                location: "Erevan",
                stars: 2
            },

            {
                id: 4,
                imgSrc: "storage-card/04.jpeg",
                title: "NOTEBOOKMALL",
                address: "9 Tumanyan Street, Yerevan, Armenia",
                price: "0.92 EUR",
                ratingCount: "0/5",
                ratingText: "No reviews yet",
                location: "Erevan",
                stars: 2
            },

            {
                id: 5,
                imgSrc: "storage-card/05.jpeg",
                title: "NOTEBOOKMALL",
                address: "9 Tumanyan Street, Yerevan, Armenia",
                price: "0.92 EUR",
                ratingCount: "0/5",
                ratingText: "No reviews yet",
                location: "Erevan",
                stars: 2
            },
            {
                id: 6,
                imgSrc: "storage-card/06.jpeg",
                title: "NOTEBOOKMALL",
                address: "9 Tumanyan Street, Yerevan, Armenia",
                price: "0.92 EUR",
                ratingCount: "0/5",
                ratingText: "No reviews yet",
                location: "Erevan",
                stars: 2
            },             
         ]
        }
    }
}

</script> 