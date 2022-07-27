<template>
    <section class="guaranty-section py-lg-5 py-4">
        <b-container>
            <h2 class="title-secondary text-center">{{ $t("title.ourAdvantages") }}</h2>
            <b-row class="align-items-center">
                <b-col md="6">
                    <div class="img-box">
                        <img :src="require('@/assets/img/guaranty/luglocker-girl.png')" alt="" />
                    </div>
                </b-col>
                <b-col  md="6" lg="4">
                    <div class="about">
                        <div class="about-item">
                            <div class="title-box d-flex">
                                <svg-icon class="md-icon mr-3" name="security"></svg-icon>
                                <h4 class="title-quaternary">{{ $t("difference.header.chanceToChoose") }}</h4>
                            </div>
                            <p>{{ $t("difference.text.chanceToChoose") }}</p>
                        </div>

                        <div class="about-item">
                            <div class="title-box d-flex">
                                <svg-icon class="md-icon mr-3" name="dollar"></svg-icon>
                                <h4 class="title-quaternary">{{ $t("difference.header.flexiblePrices") }}</h4>
                            </div>
                            <p>{{ $t("difference.text.flexiblePrices") }}</p>
                        </div>
                        <div class="about-item">
                            <div class="title-box d-flex">
                                <svg-icon class="md-icon mr-3" name="verified"></svg-icon>
                                <h4 class="title-quaternary">{{ $t("difference.header.noPrepayment") }}</h4>
                            </div>
                            <p>{{ $t("difference.text.noPrepayment") }}</p>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>