<template>
    <section class="how-works-card-section py-4 py-lg-5">
        <b-container>
            <h2 class="title-secondary text-center">{{ $t("title.howWorks") }}</h2>
            <p class="works-description px-5 text-center">{{ $t("home.howWorks.text") }}</p>
            <b-row>
                <b-col md="6"  lg="4" class="mb-4">
                    <div class="works-card text-center">
                        <svg-icon class="lg-icon" name="find" />
                        <h3 class="title-tertiary">{{ $t("title.howWorksStep1") }}</h3>
                        <p class="works-card-text">{{ $t("home.howWorks.howWorksStep1") }}</p>
                    </div>
                </b-col>

                    <b-col md="6"  lg="4" class="mb-4">
                    <div class="works-card text-center">
                        <svg-icon class="lg-icon" name="luggage" />
                        <h3 class="title-tertiary">{{ $t("title.howWorksStep2") }}</h3>
                        <p class="works-card-text">{{ $t("home.howWorks.howWorksStep2") }}</p>
                    </div>
                </b-col>

                    <b-col md="6"  lg="4" class="mb-4">
                    <div class="works-card text-center">
                        <svg-icon class="lg-icon" name="smile" />
                        <h3 class="title-tertiary">{{ $t("title.howWorksStep3") }}</h3>
                        <p class="works-card-text">{{ $t("home.howWorks.howWorksStep3") }}</p>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

